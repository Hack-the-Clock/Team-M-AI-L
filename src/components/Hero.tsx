'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  const scrollToChatbot = () => {
    window.location.href = '/chatbot';
  };

  return (
    <section className="gradient-hero text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Explore Smarter, Invest Better 📈
          </h1>

          {/* Subtext */}
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Get stock insights, sector trends, and AI-powered recommendations — all in one place.
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToChatbot}
            className="inline-flex items-center space-x-2 bg-primary hover:bg-opacity-90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-lg"
          >
            <span>Start Exploring</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mt-16"
          >
            <div className="text-center">
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-gray-300">Companies</div>
            </div>
            <div className="w-px bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-gray-300">Sectors</div>
            </div>
            <div className="w-px bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold">Real-time</div>
              <div className="text-gray-300">AI Insights</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
