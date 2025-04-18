"use client";
// ToastContext.tsx
// Fournit un contexte global pour afficher le toast n'importe où dans l'app
// Clean code, ultra commenté
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import Toast, { ToastType } from "@/components/Toast";

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; type: ToastType; show: boolean; duration: number }>({
    message: '',
    type: 'success',
    show: false,
    duration: 3500,
  });

  // Fonction pour afficher un toast
  const showToast = useCallback((message: string, type: ToastType = 'success', duration = 3500) => {
    setToast({ message, type, show: true, duration });
  }, []);

  // Fermer le toast
  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast {...toast} onClose={closeToast} />
    </ToastContext.Provider>
  );
};
