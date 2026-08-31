"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
  className?: string;
}

export default function BaseModal({
  isOpen,
  onClose,
  children,
  size = "md",
  className,
}: BaseModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isMounted || !isOpen) return null;

  // Le max-width partono da `sm`: sotto quel breakpoint il modale e' a tutto
  // schermo, quindi qualunque limite di larghezza lascerebbe solo bordi vuoti
  // (su un telefono da 430px un size="sm" avrebbe gia' i suoi gutter).
  const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "3xl": "sm:max-w-3xl",
    "4xl": "sm:max-w-4xl",
    "5xl": "sm:max-w-5xl",
    "6xl": "sm:max-w-6xl",
    "7xl": "sm:max-w-7xl",
    "8xl": "sm:max-w-8xl",
    "9xl": "sm:max-w-9xl",
  };

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-0 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ocragray-900/50 dark:bg-ocragray-100/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={cn(
          // Mobile: foglio a tutto schermo (niente gutter, niente raggio, niente
          // bordo che disegnerebbe una cornice contro i lati dello schermo).
          // Da `sm`: la card centrata di sempre, alta al massimo quanto il
          // viewport meno il padding del wrapper.
          "relative w-full h-full max-h-none rounded-none border-0",
          "sm:h-auto sm:max-h-[calc(100dvh-3rem)] sm:rounded-2xl sm:border sm:border-black/20 sm:dark:border-white/20",
          "bg-ocragray-100/50 dark:bg-ocragray-900/50 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300",
          sizeClasses[size],
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

// Structured Sub-components
BaseModal.Header = function BaseModalHeader({ children, onClose, className }: { children: ReactNode, onClose?: () => void, className?: string }) {
  return (
    // I titoli dei modali sono tutti font-crenzo: imposto la regola qui una
    // volta invece di ripetere la classe su ogni <h*> dei ~30 call site (e di
    // doverla ricordare sui prossimi).
    <div className={cn("shrink-0 flex items-center justify-between bg-ocragray-100/50 dark:bg-ocragray-800/50 px-4 py-4 sm:p-8 border-b border-black/50 dark:border-white/50 [&_h1]:font-crenzo [&_h2]:font-crenzo [&_h3]:font-crenzo [&_h4]:font-crenzo", className)}>
      <div className="flex-1">
        {typeof children === "string" ? (
          <h3 className="text-2xl font-crenzo text-black dark:text-white">
            {children}
          </h3>
        ) : (
          children
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-2 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

BaseModal.Body = function BaseModalBody({ children, className }: { children: ReactNode, className?: string }) {
  return (
    // Il corpo prende l'altezza che resta e scrolla solo lui (min-h-0, senza
    // il flex item non si comprime). Il tetto non e' piu' un max-h fisso qui
    // ma il max-h del contenitore: con 70vh sul body, header e footer sopra,
    // il totale poteva sforare il viewport.
    <div className={cn("flex-1 min-h-0 px-4 py-5 sm:p-8 overflow-y-auto", className)}>
      {children}
    </div>
  );
};

BaseModal.Footer = function BaseModalFooter({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div
      className={cn(
        // pb con safe-area: a tutto schermo il footer arriva fino al bordo
        // inferiore, dove su iOS c'e' la home indicator.
        "shrink-0 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-8 border-t bg-ocragray-100/50 dark:bg-ocragray-800/50 border-black/50 dark:border-white/50",
        className,
      )}
    >
      {children}
    </div>
  );
};