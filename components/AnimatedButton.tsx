import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function AnimatedButton({ children, className }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, backgroundColor: '#D6D0C4' }}
      whileTap={{ scale: 0.96 }}
      className={`transition-colors ${className}`}
    >
      {children}
    </motion.button>
  );
}
