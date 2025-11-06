'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface SectorCardProps {
  icon: ReactNode;
  title: string;
  change: number;
  description: string;
  href: string;
  delay?: number;
}

export function SectorCard({ icon, title, change, description, href, delay = 0 }: SectorCardProps) {
  const isPositive = change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-border"
    >
      <div className="flex items-center justify-between mb-4">
        {/* Icon */}
        <div className="p-3 bg-primary/10 rounded-xl">
          {icon}
        </div>

        {/* Change Percentage */}
        <div className={`flex items-center gap-1 ${isPositive ? 'text-positive' : 'text-negative'}`}>
          {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          <span className="font-semibold">{isPositive ? '+' : ''}{change.toFixed(1)}%</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-card-foreground mb-2">{title}</h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

      {/* Explore Button */}
      <Link
        href={href}
        className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition group"
      >
        <span>Explore Sector</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
