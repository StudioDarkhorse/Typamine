import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
// bcryptjs, non bcrypt: quest'ultimo e' un addon nativo (.node) e su
// Cloudflare Workers non esiste dlopen, quindi il modulo esplodeva in
// produzione mentre in locale su Node funzionava. Stessa API, stesso
// formato di hash ($2b$): nessuna password da rigenerare.
import bcrypt from "bcryptjs";
import { z } from "zod";
import { TOTP } from 'otpauth';
import type { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roles: string[];
      permissions: string[];
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }

  interface User {
    id: string;
    roles: string[];
    permissions: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    roles: string[];
    permissions: string[];
  }
}

console.log('[Auth] Configuring NextAuth...');

// Esporta la configurazione per usarla con getServerSession
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        mfaCode: { label: "MFA Code", type: "text" }
      },
      async authorize(credentials) {
        console.log('[Auth] authorize called');
        
        try {
          const parsedCredentials = z
            .object({ 
              email: z.string().email(), 
              password: z.string().min(6),
              mfaCode: z.string().length(6)
            })
            .safeParse(credentials);

          if (!parsedCredentials.success) {
            console.log('[Auth] Invalid credentials format');
            return null;
          }

          const { email, password, mfaCode } = parsedCredentials.data;
          
          const adminLoginSecret = process.env.ADMIN_LOGIN_SECRET;
          if (!adminLoginSecret) {
            console.error('[Auth] ADMIN_LOGIN_SECRET is not set');
            return null;
          }

          const totp = new TOTP({ secret: adminLoginSecret });
          const isValidMFA = totp.validate({ token: mfaCode, window: 1 }) !== null;
          if (!isValidMFA) {
            console.log('[Auth] MFA mismatch');
            return null;
          }
          
          console.log('[Auth] Attempting login for:', email);
          
          const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            include: {
              roles: {
                include: {
                  permissions: true,
                },
              },
            },
          });

          if (!user) {
            console.log('[Auth] User not found');
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log('[Auth] Password match:', passwordsMatch);

          if (!passwordsMatch) {
            console.log('[Auth] Password mismatch');
            return null;
          }

          const permissions = user.roles.flatMap((role: any) =>
            role.permissions.map((p: any) => p.name)
          );
          
          console.log('[Auth] Login successful for:', email);
          
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.imageUrl || (user.image ? `data:image/jpeg;base64,${Buffer.from(user.image as any).toString('base64')}` : null),
            roles: user.roles.map((r: any) => r.name),
            permissions: Array.from(new Set(permissions)),
          };
        } catch (error) {
          console.error('[Auth] Error in authorize:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles;
        token.permissions = user.permissions;
        token.picture = (user as any).image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.roles = token.roles || [];
        session.user.permissions = token.permissions || [];
        session.user.image = token.picture || null;
      }
      return session;
    },
  },
};

export const getServerAuthSession = () => {
  // Utility for server-side auth retrieval if needed elsewhere
  return import("next-auth").then(m => m.getServerSession(authOptions));
};