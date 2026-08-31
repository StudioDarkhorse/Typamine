const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DB_NAME = 'typamine-db';
const DUMP_FILE = path.join(__dirname, 'remote-dump.sql');
const LOCAL_DB_FILE = path.join(__dirname, 'dev.db');

async function main() {
  console.log('🔄 Starting remote D1 database synchronization...');

  try {
    // Step 1: Export remote D1 database
    console.log(`📥 Exporting remote database '${DB_NAME}' to ${DUMP_FILE}...`);
    execSync(`npx wrangler d1 export ${DB_NAME} --remote --output="${DUMP_FILE}"`, {
      stdio: 'inherit',
      shell: true
    });

    // Step 2: Drop all existing tables to prevent conflicts (without unlinking the file to avoid EBUSY locks)
    if (fs.existsSync(LOCAL_DB_FILE)) {
      console.log('🧹 Clearing local database tables...');
      try {
        const { PrismaClient } = require('typamine-prisma-client');
        const prisma = new PrismaClient();
        
        // Query all user tables in SQLite
        const tables = await prisma.$queryRawUnsafe(
          "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
        );
        
        await prisma.$executeRawUnsafe('PRAGMA foreign_keys = OFF');
        for (const table of tables) {
          await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "${table.name}"`);
        }
        await prisma.$executeRawUnsafe('PRAGMA foreign_keys = ON');
        await prisma.$disconnect();
        console.log('✅ Local tables cleared.');
      } catch (err) {
        console.log('⚠️ Could not clear tables via Prisma:', err.message);
      }
    }

    // Step 3: Apply the SQL dump to the local dev.db
    try {
      // If sqlite3 is available, use it (standard on Mac/Linux, optional on Windows)
      console.log('Attempting import using sqlite3 CLI...');
      execSync(`sqlite3 "${LOCAL_DB_FILE}" < "${DUMP_FILE}"`, { stdio: 'inherit', shell: true });
      console.log('✅ Synchronized successfully using sqlite3 CLI.');
    } catch (err) {
      console.log('⚠️ sqlite3 CLI not available. Running fallback import via Prisma...');
      
      const { PrismaClient } = require('typamine-prisma-client');
      const prisma = new PrismaClient();
      
      console.log('📖 Reading SQL dump...');
      const sqlContent = fs.readFileSync(DUMP_FILE, 'utf8');
      
      // Parse SQL statements and split schema creation from data inserts
      const lines = sqlContent.split(/\r?\n/);
      let currentStatement = '';
      const createStatements = [];
      const otherStatements = [];
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('--')) continue;
        
        currentStatement += line + '\n';
        if (trimmed.endsWith(';')) {
          const stmt = currentStatement.trim();
          if (stmt.startsWith('CREATE TABLE') || stmt.startsWith('CREATE UNIQUE INDEX') || stmt.startsWith('CREATE INDEX')) {
            createStatements.push(stmt);
          } else {
            otherStatements.push(stmt);
          }
          currentStatement = '';
        }
      }
      
      console.log(`🏗️ Recreating all ${createStatements.length} tables and indexes...`);
      for (const stmt of createStatements) {
        try {
          await prisma.$executeRawUnsafe(stmt);
        } catch (schemaError) {
          console.warn(`⚠️ Warning creating schema element: ${schemaError.message}`);
        }
      }
      
      console.log(`⚡ Executing ${otherStatements.length} other SQL statements (inserts/pragmas)...`);
      
      // Execute in a transaction to enforce atomicity and defer foreign keys correctly
      await prisma.$transaction(async (tx) => {
        for (let i = 0; i < otherStatements.length; i++) {
          const stmt = otherStatements[i];
          try {
            await tx.$executeRawUnsafe(stmt);
          } catch (stmtError) {
            // Ignore migrations table insert duplicates or PRAGMA errors, but log others
            if (!stmt.includes('d1_migrations') && !stmt.includes('PRAGMA')) {
              console.warn(`⚠️ Warning executing statement: ${stmtError.message}`);
            }
          }
        }
      }, {
        timeout: 240000 // 4 minutes timeout for large datasets
      });
      
      await prisma.$disconnect();
      console.log('✅ Synchronized successfully using Prisma transaction fallback.');
    }

  } catch (error) {
    console.error('❌ Error during synchronization:', error.message);
    process.exit(1);
  }
}

main();
