import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  /** Pass the trigger button ref to auto-position below it */
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  triggerRef,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);

  // Position below the trigger button
  useEffect(() => {
    if (!isOpen || !triggerRef?.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const dropdownWidth = Math.min(361, window.innerWidth - 24);
    // Align right edge of dropdown with right edge of trigger, then clamp to viewport
    let left = rect.right - dropdownWidth;
    if (left < 12) left = 12;
    if (left + dropdownWidth > window.innerWidth - 12) left = window.innerWidth - dropdownWidth - 12;
    setPos({
      top: rect.bottom + 8,
      right: window.innerWidth - left - dropdownWidth,
    });
  }, [isOpen, triggerRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".dropdown-toggle")
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  if (triggerRef) {
    const dropdownWidth = Math.min(361, window.innerWidth - 24);
    const leftPos = pos ? window.innerWidth - pos.right - dropdownWidth : 12;

    return createPortal(
      <div
        ref={dropdownRef}
        style={
          pos
            ? { position: "fixed", top: pos.top, left: leftPos, width: dropdownWidth, zIndex: 99999 }
            : { position: "fixed", top: 64, right: 12, zIndex: 99999 }
        }
        className={`rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`}
      >
        {children}
      </div>,
      document.body
    );
  }

  // Fallback: original absolute positioning (for other dropdowns)
  return (
    <div
      ref={dropdownRef}
      className={`absolute z-40 right-0 mt-2 rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`}
    >
      {children}
    </div>
  );
};
