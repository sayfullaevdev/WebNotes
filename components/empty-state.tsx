
"use client";

import { motion } from "framer-motion";
import { Sparkles, PenTool } from "lucide-react";
import { Button } from "./ui/button";

interface EmptyStateProps {
  message: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export default function EmptyState({ message, buttonText, onButtonClick }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center h-full min-h-[500px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 max-w-md"
      >
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl rounded-full" />
          <div className="relative bg-gradient-to-br from-background to-primary/5 border border-primary/10 rounded-2xl p-8 backdrop-blur-sm">
            <PenTool className="w-16 h-16 mx-auto text-primary mb-4" />
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <motion.h3
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          className="text-2xl font-bold mb-3 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
        >
          Empty Space
        </motion.h3>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          {message}
        </p>

        {buttonText && (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onButtonClick}
              className="relative overflow-hidden group bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-6 rounded-xl text-lg font-semibold border-0 shadow-lg shadow-primary/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              {buttonText}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}