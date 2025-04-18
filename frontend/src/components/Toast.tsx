// Toast.tsx
// Composant Toast global animé pour feedback utilisateur (succès/erreur/info)
// Utilise Framer Motion + Tailwind CSS v3
// Clean code, ultra commenté, design unique Zénith
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  show: boolean;
  onClose: () => void;
  duration?: number; // ms
}

/**
 * Composant Toast animé pour feedback utilisateur
 * @param message    Message à afficher
 * @param type       Type de toast (success, error, info)
 * @param show       Affiche ou non le toast
 * @param onClose    Callback fermeture
 * @param duration   Durée d'affichage en ms (défaut 3500ms)
 */
const Toast: React.FC<ToastProps> = ({ message, type = "success", show, onClose, duration = 3500 }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  // Couleurs et icônes selon le type
  const style = {
    success: "bg-gradient-to-r from-green-400 to-green-600 border-green-500",
    error: "bg-gradient-to-r from-red-400 to-red-600 border-red-500",
    info: "bg-gradient-to-r from-blue-400 to-blue-600 border-blue-500",
  }[type];
  const icon = {
    success: "✔️",
    error: "❌",
    info: "ℹ️",
  }[type];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-xl shadow-2xl border-l-8 text-white font-bold flex items-center gap-3 ${style}`}
          role="alert"
        >
          <span className="text-2xl">{icon}</span>
          <span className="text-base md:text-lg">{message}</span>
          <button
            onClick={onClose}
            className="ml-4 text-white/80 hover:text-white text-xl font-bold focus:outline-none"
            aria-label="Fermer le toast"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
