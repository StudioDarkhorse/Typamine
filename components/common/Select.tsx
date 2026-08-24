"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Label } from "@/components/common/Input";

export interface SelectOption {
  label: string;
  value: string;
}

interface BaseSelectProps {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

interface SimpleSelectProps extends BaseSelectProps {
  mode?: "simple";
  value: string;
  onChange: (value: string) => void;
}

interface MultiSelectProps extends BaseSelectProps {
  mode: "multiselect";
  value: string[];
  onChange: (value: string[]) => void;
}

export type SelectProps = SimpleSelectProps | MultiSelectProps;

export const Select: React.FC<SelectProps> = (props) => {
  const {
    label,
    options,
    placeholder = "Select...",
    className = "",
    mode = "simple",
  } = props;

  const value = props.value;
  const onChange = props.onChange;

  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 180 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const isMultiselect = mode === "multiselect";
  const selectedValues = isMultiselect ? (value as string[] || []) : [value as string];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const width = Math.max(rect.width, 180);
    setPosition({ top: rect.bottom + 8, left: rect.right - width, width });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        (!listRef.current || !listRef.current.contains(target))
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectOption = (optionValue: string) => {
    if (isMultiselect) {
      const isSelected = selectedValues.includes(optionValue);
      let newValues: string[];
      if (isSelected) {
        newValues = selectedValues.filter((v) => v !== optionValue);
      } else {
        newValues = [...selectedValues, optionValue];
      }
      (onChange as (val: string[]) => void)(newValues);
    } else {
      (onChange as (val: string) => void)(optionValue);
      setIsOpen(false);
    }
  };

  const getDisplayText = () => {
    if (isMultiselect) {
      if (selectedValues.length === 0) return placeholder;
      const selectedLabels = options
        .filter((opt) => selectedValues.includes(opt.value))
        .map((opt) => opt.label);
      if (selectedLabels.length <= 2) {
        return selectedLabels.join(", ");
      }
      return `${selectedLabels.length} items selected`;
    } else {
      const selectedOption = options.find((opt) => opt.value === value);
      return selectedOption ? selectedOption.label : placeholder;
    }
  };

  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center select-none mb-0">
          <Label className="mb-0 select-none">{label}</Label>
        </div>
      )}

      <div className="relative" ref={triggerRef}>
        <div
          className={`
            flex items-center justify-between w-full
            bg-bluegray-100 dark:bg-redgray-900/50
            border rounded-md px-3 py-2 transition-all duration-200
            cursor-pointer font-x-typewriter font-bold
            ${isOpen
              ? "border-blue dark:border-red"
              : "border-bluegray-200 dark:border-redgray-800 hover:border-bluegray-400 dark:hover:border-redgray-600"
            }
          `}
          onClick={() => setIsOpen(!isOpen)}
        >
          <button
            type="button"
            className="flex items-center justify-between w-full bg-transparent text-bluegray-900 dark:text-redgray-200 outline-none cursor-pointer text-left font-x-typewriter font-normal"
          >
            <span className="truncate">{getDisplayText()}</span>
            <svg
              className={`w-3 h-3 ml-2 transition-transform duration-200 shrink-0 ${
                isOpen ? "rotate-180 text-blue dark:text-red" : "text-bluegray-900 dark:text-redgray-200"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && isMounted && createPortal(
        <ul
          ref={listRef}
          style={{ position: "fixed", top: position.top, left: position.left, width: position.width }}
          className="z-[9999] bg-bluegray-100 dark:bg-redgray-900 border border-bluegray-200 dark:border-redgray-800 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        >
          {options.map((option) => {
            const isSelected = isMultiselect
              ? selectedValues.includes(option.value)
              : value === option.value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  className={`w-full text-left px-4 py-2.5 text-xs font-haas transition-colors flex items-center justify-between ${
                    isSelected
                      ? "bg-blue/20 dark:bg-red/10 text-black dark:text-red font-bold"
                      : "text-bluegray-800 dark:text-redgray-200 hover:bg-blue/10 dark:hover:bg-red/5 hover:text-black dark:hover:text-white"
                  }`}
                  onClick={() => handleSelectOption(option.value)}
                >
                  <span className="truncate pr-2">{option.label}</span>
                  {isSelected && (
                    <span className="text-blue dark:text-red text-[10px] tracking-widest shrink-0">[✓]</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>,
        document.body
      )}
    </div>
  );
};

export default Select;
