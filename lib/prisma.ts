import type { PrismaClient } from 'typamine-prisma-client'
import * as prismaNodeClient from 'typamine-prisma-client'
// `/wasm.js` e non `/wasm`: la mappa `exports` punta il subpath `./wasm` a un
// `wasm.mjs` che il generatore Prisma non produce, quindi l'import ESM non
// risolve. Il file reale e' CJS e passa dalla voce wildcard `"./*": "./*"`.
import * as prismaWasmClient from 'typamine-prisma-client/wasm.js'
import { PrismaD1 } from '@prisma/adapter-d1'

// Prisma genera due build del client: index.js usa l'engine Rust nativo,
// wasm.js quello WebAssembly — e su workerd gira solo il secondo. La scelta va
// fatta a mano: la mappa condizionale del client (`#main-entry-point`) elenca
// "node" prima di "workerd", ed esbuild bundla il server con `platform: node`,
// quindi soddisfa sempre "node" e qualunque import condizionale ricade su
// index.js. Senza questo ogni query nel Worker muore con 'could not locate the
// Query Engine for runtime "debian-openssl-1.1.x"'.
//
// Entrambe importate staticamente, e non con un require() dentro la funzione:
// wasm.js carica l'engine via `import('#wasm-engine-loader')` e da li' un
// `import()` del .wasm, e quella catena la deve vedere il bundler in fase di
// build (esbuild la marca external e la passa a wrangler). Con un require()
// risolto a runtime il modulo wasm arriva vuoto e Prisma muore con 'The loaded
// wasm module was unexpectedly `undefined` or `null`'.
const isWorkerd =
  typeof navigator !== 'undefined' && navigator.userAgent === 'Cloudflare-Workers';

function loadPrismaCtor(): typeof PrismaClient {
  if (isWorkerd) {
    console.log('[Prisma] Using WebAssembly client (workerd)');
    return prismaWasmClient.PrismaClient as unknown as typeof PrismaClient;
  }
  console.log('[Prisma] Using native client (Node)');
  return prismaNodeClient.PrismaClient;
}

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
    prismaInstance = new (loadPrismaCtor())({ adapter });
    return prismaInstance;
  }

  if (contextErrored && process.env.NODE_ENV !== 'production') {
    // Non mettere in cache: la prossima chiamata ritenterà il contesto Cloudflare
    // invece di restare bloccata su sqlite locale per tutta la vita del processo.
    console.log('[Prisma] Context unavailable (likely startup race) — using uncached local SQLite for this call only');
    return new (loadPrismaCtor())();
  }

  console.log('[Prisma] Falling back to Local SQLite');
  prismaInstance = new (loadPrismaCtor())();
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
