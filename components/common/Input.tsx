import React from "react";
import { LucideIcon } from "lucide-react";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  codePrefix?: string;
  error?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  labelClassName?: string;
  onChange?: (val: string) => void;
  as?: "input" | "textarea";
  rows?: number;
  /** Solo con as="input". In React 19 `ref` è una prop normale, ma non è in
   *  InputHTMLAttributes: va dichiarata per farla passare i type check. */
  ref?: React.Ref<HTMLInputElement>;
}

interface LabelProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

// Componente condiviso: prima ogni form ripeteva questa stessa stringa di
// classi inline. Estratta qui perché è lo standard label usato ovunque
// (Input stesso, Select, filtri, form admin) — un solo posto da aggiornare.
export const Label: React.FC<LabelProps> = ({ children, icon: Icon, className = "" }) => {
  return (
    <label className={`text-[10px] text-bluegray-800 dark:text-redgray-200 uppercase tracking-wider flex items-center gap-1.5 mb-2 font-bold ${className}`}>
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </label>
  );
};

export const Input: React.FC<InputProps> = ({
  label,
  codePrefix,
  error,
  className = "",
  type = "text",
  leftIcon,
  rightIcon,
  labelClassName = "",
  onChange,
  as = "input",
  rows = 4,
  ref,
  ...props
}) => {
  const fieldClassName = `w-full bg-bluegray-100 dark:bg-bluegray-900/50 border border-bluegray-200 dark:border-redgray-800 hover:border-bluegray-400 dark:hover:border-redgray-600 focus:border-blue dark:focus:border-red rounded-md px-3 py-2 font-x-typewriter font-bold text-foreground outline-none transition-colors ${
    error ? "border-red-500 focus:border-red-500 dark:focus:border-red-500" : ""
  } ${leftIcon ? "pl-10" : ""} ${rightIcon ? "pr-10" : ""} ${className}`;

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <div className={`flex justify-between items-center select-none mb-0 ${labelClassName}`}>
          <Label className="mb-0">
            {codePrefix && <span className="text-black dark:text-white mr-1">{codePrefix}</span>}
            {label}
          </Label>
        </div>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-bluegray-800 dark:text-redgray-200">
            {leftIcon}
          </div>
        )}
        {as === "textarea" ? (
          <textarea
            rows={rows}
            className={`resize-y ${fieldClassName}`}
            onChange={(e) => onChange?.(e.target.value)}
            {...(props as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref}
            type={type}
            className={fieldClassName}
            onChange={(e) => onChange?.(e.target.value)}
            {...props}
          />
        )}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-bluegray-800 dark:text-redgray-200 z-10">
            {rightIcon}
          </div>
        )}
      </div>

      {error && <span className="text-[10px] text-red-500 block">{error}</span>}
    </div>
  );
};
