import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const modalVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 20, display: "none" },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={modalVariants}
      transition={{ duration: 0.2 }}
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Settings</h2>
        <p className="text-gray-700 dark:text-gray-300">
          More settings options will be added here in the future.
        </p>
      </motion.div>
    </motion.div>
  );
}
