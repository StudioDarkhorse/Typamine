"use client";

import { signIn } from "next-auth/react";
import { adminPreCheck } from "@/lib/actions/auth";
import { Lock, Mail, AlertCircle, KeyRound, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import DynamicLogo from "@/components/layout/DynamicLogo";

export default function LoginForm() {
  const [step, setStep] = useState<'credentials' | 'mfa'>('credentials');
  const [formData, setFormData] = useState({ email: '', password: '', mfaCode: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePreCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      console.log('[LoginForm] Pre-check start for:', formData.email);
      const data = await adminPreCheck({ email: formData.email, password: formData.password });
      console.log('[LoginForm] Pre-check result:', data);
      
      if (data.isValid) {
        setStep('mfa');
        console.log('[LoginForm] Step changed to MFA');
      } else {
        setErrorMessage('Invalid credentials.');
        console.log('[LoginForm] Pre-check failed - invalid credentials');
      }
    } catch (err: any) {
      console.error('[LoginForm] Pre-check error:', err);
      setErrorMessage(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const executeFinalSignIn = async (code: string) => {
    console.log('[LoginForm] executeFinalSignIn called with code:', code);
    
    if (code.length !== 6) {
      console.log('[LoginForm] Invalid code length:', code.length);
      setErrorMessage("MFA Code must be 6 digits.");
      return;
    }
    
    setErrorMessage('');
    setIsLoading(true);

    try {
      console.log('[LoginForm] Attempting signIn with:', {
        email: formData.email,
        mfaCode: code
      });

      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        mfaCode: code,
        redirect: false,
      });

      console.log('[LoginForm] Full signIn result:', JSON.stringify(result, null, 2));

      // Verifica se il login è riuscito
      // In NextAuth v4, se non c'è errore, il login è riuscito
      if (result && !result.error) {
        console.log('[LoginForm] Login successful! Redirecting to /admin');
        // Usa window.location.replace per un redirect pulito
        window.location.replace("/admin");
      } else if (result?.error) {
        console.error('[LoginForm] SignIn error:', result.error);
        setErrorMessage("Invalid MFA code or credentials.");
        setFormData(prev => ({ ...prev, mfaCode: '' }));
        setIsLoading(false);
      } else {
        console.error('[LoginForm] Unexpected result:', result);
        setErrorMessage("An unexpected error occurred.");
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('[LoginForm] Login error:', err);
      console.log('[LoginForm] Error type:', err?.type);
      console.log('[LoginForm] Error message:', err?.message);
      console.log('[LoginForm] Full error:', err);
      
      // Se l'errore è NEXT_REDIRECT, significa che il login è riuscito
      if (err?.message === "NEXT_REDIRECT") {
        console.log('[LoginForm] NEXT_REDIRECT detected - login successful!');
        window.location.replace("/admin");
        return;
      }
      
      if (err?.type === "CredentialsSignin") {
        setErrorMessage("Invalid MFA code or credentials.");
      } else {
        setErrorMessage("An error occurred during login.");
      }
      setFormData(prev => ({ ...prev, mfaCode: '' }));
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="min-w-xl">
        <div className="mb-8 text-center flex flex-col items-center justify-center scale-125">
          <DynamicLogo height={200} className="select-none" />
        </div>

        <div className="mb-4">
          <form
            onSubmit={step === 'credentials' ? handlePreCheck : (e) => { e.preventDefault(); if (formData.mfaCode.length === 6) executeFinalSignIn(formData.mfaCode); }}
            className="w-full p-8 sm:p-10 space-y-8 relative z-10"
          >
            {step === 'credentials' ? (
            <div className="space-y-6">
              <Input
                id="email"
                name="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={(val) => setFormData(prev => ({ ...prev, email: val }))}
                placeholder="admin@typamine.com"
                required
                autoComplete="new-email"
                spellCheck="false"
                leftIcon={<Mail className="h-5 w-5" />}
              />

              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                value={formData.password}
                onChange={(val) => setFormData(prev => ({ ...prev, password: val }))}
                placeholder="••••••••"
                required
                autoComplete="new-password"
                spellCheck="false"
                leftIcon={<Lock className="h-5 w-5" />}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <Input
                id="mfaCode"
                name="mfaCode"
                type="text"
                maxLength={6}
                label="2FA Authenticator Code"
                labelClassName="justify-center mr-1"
                value={formData.mfaCode}
                onChange={(val) => {
                  const cleanVal = val.replace(/\D/g, '');
                  setFormData(prev => ({ ...prev, mfaCode: cleanVal }));
                  if (cleanVal.length === 6) {
                    executeFinalSignIn(cleanVal);
                  }
                }}
                placeholder="000000"
                required
                autoComplete="one-time-code"
                autoFocus
                leftIcon={<KeyRound className="h-5 w-5" />}
                className="text-center tracking-[0.5em] placeholder:tracking-normal"
              />
            </div>
          )}

          <div className="pt-2">
            {step === 'credentials' && (
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                roundness="none"
                isLoading={isLoading}
              >
                Continue
              </Button>
            )}

            {step === 'mfa' && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => setStep('credentials')}
                fullWidth
                size="lg"
                roundness="none"
              >
                Back
              </Button>
            )}
          </div>

          {errorMessage && (
            <div className="flex items-center gap-3 p-5 bg-red/10 border border-red/20 text-red text-sm font-bold">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}
        </form>
        </div>
      </div>

      {isLoading && step === 'mfa' && mounted && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-500/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
            <Loader2 className="h-12 w-12 text-blue animate-spin" />
            <p className="font-bold font-groote text-blue tracking-widest uppercase text-sm">Authenticating</p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}