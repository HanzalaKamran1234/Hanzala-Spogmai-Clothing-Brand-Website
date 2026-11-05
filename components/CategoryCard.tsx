import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type CategoryCardProps = {
  title: string;
  imageUrl: string;
  href: string;
};

export default function CategoryCard({ title, imageUrl, href }: CategoryCardProps) {
  return (
    <Link href={href} className="relative block overflow-hidden rounded-lg shadow-lg">
      <Image src={imageUrl} alt={title} width={500} height={600} className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity"
      >
        <h3 className="text-primary-text font-heading text-2xl tracking-wider drop-shadow-md">
          {title}
        </h3>
      </motion.div>
    </Link>
  );
}
