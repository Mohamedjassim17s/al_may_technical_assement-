'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  onUndo?: () => void;
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (
    title: string,
    options?: ToastType | { type?: ToastType; message?: string; onUndo?: () => void; duration?: number }
  ) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback(
    (
      title: string,
      options?: ToastType | { type?: ToastType; message?: string; onUndo?: () => void; duration?: number }
    ) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const opts = typeof options === 'string' ? { type: options } : options;
      const type = opts?.type || 'info';
      const duration = opts?.duration || 4500;

      const newToast: ToastMessage = {
        id,
        type,
        title,
        message: opts?.message,
        onUndo: opts?.onUndo,
      };

      setToasts(prev => [newToast, ...prev.slice(0, 4)]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none"
      >
        {toasts.map(toast => {
          const bgColors = {
            success: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200',
            error: 'bg-rose-950/90 border-rose-500/50 text-rose-200',
            warning: 'bg-amber-950/90 border-amber-500/50 text-amber-200',
            info: 'bg-slate-900/90 border-indigo-500/50 text-indigo-200',
          };

          const IconComponent = {
            success: CheckCircle,
            error: AlertCircle,
            warning: AlertTriangle,
            info: Info,
          }[toast.type];

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start p-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 animate-slide-up ${bgColors[toast.type]}`}
            >
              <IconComponent className="w-5 h-5 shrink-0 mt-0.5 mr-3" />
              <div className="flex-1 text-sm">
                <p className="font-semibold">{toast.title}</p>
                {toast.message && <p className="text-xs opacity-90 mt-1">{toast.message}</p>}
                {toast.onUndo && (
                  <button
                    onClick={() => {
                      toast.onUndo?.();
                      removeToast(toast.id);
                    }}
                    className="mt-2 text-xs font-bold underline hover:opacity-80 focus:outline-none"
                  >
                    Undo Action
                  </button>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg hover:bg-white/10 opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
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
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
