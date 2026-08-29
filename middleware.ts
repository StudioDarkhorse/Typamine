import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Funzione per confrontare stringhe in modo sicuro (protezione da timing attacks).
// Implementazione pura JS: `crypto.timingSafeEqual` di node:crypto non esiste
// nell'Edge Runtime, in cui gira questo file.
function secureCompare(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);
  if (aBytes.length !== bBytes.length) return false;
  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) {
    diff |= aBytes[i] ^ bBytes[i];
  }
  return diff === 0;
}

// Espone il pathname corrente ai Server Component (letto via `headers()` da
// next/headers) — serve a (public)/layout.tsx per decidere se mostrare la
// marquee "Homepage Top" solo su "/" senza dover fare quel check lato client.
function withPathname(req: NextRequest): NextResponse {
  const res = NextResponse.next();
  res.headers.set('x-pathname', req.nextUrl.pathname);
  return res;
}

// NOTA: questo file resta `middleware.ts` (Edge Runtime) e non `proxy.ts`:
// in Next 16 il proxy gira solo su runtime Node, che @opennextjs/cloudflare
// non supporta ("Node.js middleware is not currently supported"). Docs Next 16:
// per continuare a usare l'edge runtime va mantenuto `middleware.ts`.
export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  console.log('[Middleware] ===== START =====');
  console.log('[Middleware] Path:', pathname);
  console.log('[Middleware] SearchParams:', searchParams.toString());

  // 1. ANTILOOP: Se siamo già sul 404, non toccare nulla
  if (pathname.includes('/404')) {
    console.log('[Middleware] 404 page - allowing access');
    return withPathname(req);
  }

  // 2. Gestione contatore cookie per /distributors
  const isDistributorsPage = pathname === '/distributors' || pathname.endsWith('/distributors');
  if (isDistributorsPage) {
    const cookie = req.cookies.get('distributor_submissions');
    if (!cookie) {
      console.log('[Middleware] Initializing distributor_submissions cookie to 0');
      const res = NextResponse.next();
      res.cookies.set('distributor_submissions', '0', {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60, // 1 week
        path: '/',
      });
      return res;
    }
  }

  // 3. Check API auth routes - devono sempre passare
  const isApiAuthRoute = pathname.includes('/api/auth');
  if (isApiAuthRoute) {
    console.log('[Middleware] API auth route - allowing access');
    return withPathname(req);
  }

  // 4. Check se è una richiesta per risorse statiche
  if (pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|json)$/)) {
    console.log('[Middleware] Static resource - allowing access');
    return withPathname(req);
  }

  // 5. Ottieni il token per verificare l'autenticazione
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;

  console.log('[Middleware] Is logged in:', isLoggedIn);
  console.log('[Middleware] Token exists:', !!token);

  // 6. Definisci i tipi di route
  // Essendo in inglese e senza i18n, consideriamo le rotte pubbliche tutto ciò che non è admin, login o api
  const isWebsiteRoute = !pathname.startsWith('/admin') && !pathname.startsWith('/login') && !pathname.startsWith('/api');
  const isLoginRoute = pathname === '/login' || pathname.includes('/login');
  const isAdminRoute = pathname === '/admin' || pathname.includes('/admin');

  // NOTA: maintenance mode / IP allowlist / session timeout (vedi
  // /admin/settings, tab General e Security & Access) sono persistiti su DB e
  // pienamente editabili in admin, ma NON enforced qui — farlo richiederebbe
  // una lettura di AdminSettings su ogni singola richiesta, e in questo
  // ambiente dev quella lettura riattiva ensureD1SchemaUpdated ad ogni
  // request (isMigrated non sopravvive agli hot-reload di Turbopack),
  // producendo spam di "duplicate column" e, peggio, disconnessioni admin
  // spurie. Da riattivare solo dopo aver reso ensureD1SchemaUpdated
  // realmente idempotente tra le richieste (o spostando l'enforcement in un
  // punto che non giri su ogni pagina).
  const salt = process.env.ADMIN_LOGIN_ROUTE_SALT;
  const isSecretLoginRoute = salt ? pathname.includes(`/admin/${salt}`) : false;
  
  // Verifica se il salt è corretto (protezione timing attacks)
  let isSaltCorrect = false;
  if (salt && isSecretLoginRoute) {
    // Estrai il salt dall'URL
    const saltMatch = pathname.match(/\/admin\/([^\/]+)/);
    if (saltMatch) {
      const urlSalt = saltMatch[1];
      isSaltCorrect = secureCompare(urlSalt, salt);
      console.log('[Middleware] Salt comparison:', isSaltCorrect ? '✅ CORRECT' : '❌ INCORRECT');
    }
  }

  // 7. SCENARIO: UTENTE LOGGATO
  if (isLoggedIn) {
    console.log('[Middleware] 🟢 User IS logged in');
    
    // Se è loggato e va su /login o rotta segreta → redirect a /admin
    if (isLoginRoute || isSecretLoginRoute) {
      console.log('[Middleware] Logged in user on login/secret route - redirect to admin');
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = `/admin`;
      redirectUrl.searchParams.delete('bypass');
      redirectUrl.searchParams.delete('error');
      
      console.log('[Middleware] Redirecting to:', redirectUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
    
    // Se è loggato e su /admin → lascia passare
    if (isAdminRoute) {
      console.log('[Middleware] ✅ Logged in user on admin route - allowing access');
      return withPathname(req);
    }
    
    // Se è loggato su route pubbliche → lascia passare
    if (isWebsiteRoute || pathname === '/') {
      console.log('[Middleware] Logged in user on public route - allowing access');
      return withPathname(req);
    }
    
    // Per tutte le altre route, lascia passare
    console.log('[Middleware] Logged in user on other route - allowing access');
    return withPathname(req);
  }

  // 8. SCENARIO: UTENTE NON LOGGATO
  if (!isLoggedIn) {
    console.log('[Middleware] 🔴 User NOT logged in');
    
    // Se è su /admin/salt CORRETTO → mostra login
    if (isSecretLoginRoute && isSaltCorrect) {
      console.log('[Middleware] 🔐 Secret login route with CORRECT salt - showing login');
      const rewriteUrl = req.nextUrl.clone();
      rewriteUrl.pathname = `/login`;
      if (salt) {
        rewriteUrl.searchParams.set('bypass', salt);
      }
      return NextResponse.rewrite(rewriteUrl);
    }
    
    // /login e /admin (e /admin/salt_sbagliato) → 404
    if (isLoginRoute || isAdminRoute) {
      console.log('[Middleware] ❌ User not logged in on protected route - redirect to 404 for:', pathname);
      const url = req.nextUrl.clone();
      url.pathname = `/404`;
      return NextResponse.redirect(url);
    }

    // Tutte le route pubbliche (/, /about, ecc.) → lascia passare
    console.log('[Middleware] ✅ Public route - allowing access');
    return withPathname(req);
  }

  // 9. Fallback: lascia passare
  console.log('[Middleware] Fallback - allowing access');
  return withPathname(req);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|images|svg|fonts|proxy|.*\\..*).*)'
  ]
};