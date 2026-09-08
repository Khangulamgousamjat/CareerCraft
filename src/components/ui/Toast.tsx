"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", duration = 3000) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => {
          const typeStyles = {
            success:
              "bg-white dark:bg-slate-900 border-emerald-500/40 text-emerald-800 dark:text-emerald-300",
            error:
              "bg-white dark:bg-slate-900 border-red-500/40 text-red-800 dark:text-red-300",
            warning:
              "bg-white dark:bg-slate-900 border-amber-500/40 text-amber-800 dark:text-amber-300",
            info: "bg-white dark:bg-slate-900 border-blue-500/40 text-blue-800 dark:text-blue-300",
          };

          const icons = {
            success: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
            error: <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />,
            warning: <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />,
            info: <Info className="w-4 h-4 text-blue-500 shrink-0" />,
          };

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-lg border shadow-lg transition-all animate-in slide-in-from-bottom-3 duration-200 ${typeStyles[toast.type || "info"]}`}
            >
              <div className="flex items-center gap-2.5">
                {icons[toast.type || "info"]}
                <span className="text-xs font-medium text-slate-900 dark:text-slate-100">
                  {toast.message}
                </span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors ml-2"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
