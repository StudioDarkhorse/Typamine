// Import via `default` e non la cartella: un import relativo alla directory
// salta la mappa `exports` del client generato e prende `main` (index.js),
// cioe' l'engine Rust nativo, che nel Worker non esiste. `default.js` fa
// `require('#main-entry-point')`, che passa dalla mappa condizionale: index.js
// su Node in dev, wasm.js sotto la condizione `workerd` con cui OpenNext
// bundla il server.
import { PrismaClient } from '../prisma/generated-client/default'
import { PrismaD1 } from '@prisma/adapter-d1'

let prismaInstance: PrismaClient | null = null;

const getPrismaInstance = (): PrismaClient => {
  if (prismaInstance) return prismaInstance;

  let dbBinding: any = null;
  let contextErrored = false;
  try {
    // Retrieve the binding dynamically from the Cloudflare request context
    const context = require("@opennextjs/cloudflare").getCloudflareContext();
    const envKeys = context?.env ? Object.keys(context.env) : [];
    console.log('[Prisma] Cloudflare env keys available:', envKeys);
    dbBinding = context?.env?.TYPAMINE_DB;
  } catch (e) {
    // In dev questo è quasi sempre initOpenNextCloudflareForDev() non ancora
    // pronto sulle primissime richieste dopo l'avvio (race condition), non una
    // vera assenza del binding — non va messo in cache, va ritentato.
    contextErrored = true;
    console.warn("[Prisma] Error reading Cloudflare context:", e);
  }

  console.log('[Prisma] Initializing client... TYPAMINE_DB is present:', !!dbBinding);

  if (dbBinding) {
    console.log('[Prisma] Using Cloudflare D1 adapter');
    const adapter = new PrismaD1(dbBinding);
    prismaInstance = new PrismaClient({ adapter });
    return prismaInstance;
  }

  if (contextErrored && process.env.NODE_ENV !== 'production') {
    // Non mettere in cache: la prossima chiamata ritenterà il contesto Cloudflare
    // invece di restare bloccata su sqlite locale per tutta la vita del processo.
    console.log('[Prisma] Context unavailable (likely startup race) — using uncached local SQLite for this call only');
    return new PrismaClient();
  }

  console.log('[Prisma] Falling back to Local SQLite');
  prismaInstance = new PrismaClient();
  return prismaInstance;
}

// Use a Proxy to lazily delegate queries to the Prisma instance when they are actually called
const prisma = new Proxy({} as PrismaClient, {
  get(target, prop, receiver) {
    const instance = getPrismaInstance();
    const value = Reflect.get(instance, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  }
});

export const getDatabaseSource = () => {
  let dbBinding: any = null;
  try {
    const { env } = require("@opennextjs/cloudflare").getCloudflareContext();
    dbBinding = env?.TYPAMINE_DB;
  } catch (e) {}

  console.log('[Prisma] getDatabaseSource called. TYPAMINE_DB is present:', !!dbBinding);
  if (dbBinding) {
    return "Cloudflare D1 (Production/Remote)"
  }
  return "Local SQLite (dev.db)"
}

export default prisma

if (process.env.NODE_ENV !== 'production') {
  // We can't assign proxy directly to global because global is expected to be PrismaClient, but it works
  (globalThis as any).prisma = prisma;
}
