import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedButton from '@/components/AnimatedButton';

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] md:h-[90vh] overflow-hidden">
      {/* Background image placeholder - replace with premium editorial photo */}
      <div className="absolute inset-0 bg-black brightness-75" />
      {/* Text overlay */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="text-primary-text font-heading text-5xl md:text-7xl tracking-wider mb-4 drop-shadow-lg">
          SPOGMAI
        </h1>
        <p className="text-primary-text font-body text-xl md:text-2xl mb-6 drop-shadow-lg">
          DEFINED BY SIMPLICITY.
        </p>
        <p className="text-primary-text font-body text-lg md:text-xl mb-8 max-w-2xl">
          A new perspective on everyday essentials.
        </p>
        <div className="flex gap-4">
          <Link href="/shop">
            <AnimatedButton className="bg-accent text-primary-text px-6 py-3">
              EXPLORE COLLECTION
            </AnimatedButton>
          </Link>
          <Link href="/shop">
            <AnimatedButton className="bg-transparent border border-accent text-accent px-6 py-3">
              SHOP NOW
            </AnimatedButton>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
