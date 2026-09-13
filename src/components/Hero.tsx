import { motion } from 'framer-motion';
import { Search, Sparkles, GitCompare, TrendingUp, Car, Award } from 'lucide-react';
import { heroImage } from '@/data';

const stats = [
  { icon: Car, value: '500+', label: 'Vehicles' },
  { icon: Award, value: '50+', label: 'Brands' },
  { icon: GitCompare, value: '1000+', label: 'Comparisons' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={heroImage}
          alt="Luxury car"
          className="w-full h-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/60 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-bg/40" />
      </div>

      {/* Floating accent orbs */}
      <motion.div
        className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl"
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        animate={{ y: [0, 40, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass rounded-full"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-textSecondary">
            AI-Powered Automotive Discovery
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-7xl text-text leading-tight text-balance"
        >
          Find the Perfect Car for
          <br />
          Your <span className="gradient-text">Lifestyle</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-textSecondary max-w-2xl mx-auto"
        >
          Explore, compare, and discover vehicles with the power of AI.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <div className="glass-strong rounded-2xl p-2 flex items-center gap-2 accent-glow">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="w-5 h-5 text-textSecondary flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by brand, model, or budget..."
                className="flex-1 bg-transparent text-text placeholder:text-textSecondary outline-none py-3 text-sm sm:text-base"
              />
            </div>
            <button className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-accent hover:bg-accentHover text-white font-semibold rounded-xl transition-colors text-sm sm:text-base whitespace-nowrap">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="flex items-center gap-2 px-6 py-3 glass rounded-xl text-text font-semibold hover:bg-card/80 transition-all hover:scale-105">
            <GitCompare className="w-5 h-5 text-accent" />
            Compare Cars
          </button>
          <button className="flex items-center gap-2 px-6 py-3 glass rounded-xl text-text font-semibold hover:bg-card/80 transition-all hover:scale-105">
            <Sparkles className="w-5 h-5 text-accent" />
            Ask AI Advisor
          </button>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="glass rounded-2xl p-4 sm:p-6"
            >
              <stat.icon className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="font-heading font-bold text-2xl sm:text-3xl text-text">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-textSecondary mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-textSecondary">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
