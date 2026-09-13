import { motion } from 'framer-motion';
import { Sparkles, User, CheckCircle2, TrendingUp } from 'lucide-react';
import { recommendations } from '@/data';

export default function AIAdvisor() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs font-semibold text-accent uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            AI Advisor
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text">
            Your Personal Car Consultant
          </h2>
          <p className="mt-4 text-textSecondary text-lg max-w-2xl mx-auto">
            Tell us your needs and budget. Our AI finds the perfect matches in seconds.
          </p>
        </motion.div>

        {/* Chat interface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl p-4 sm:p-6 lg:p-8 accent-glow"
        >
          {/* User message */}
          <div className="flex gap-3 mb-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full glass flex items-center justify-center">
              <User className="w-5 h-5 text-textSecondary" />
            </div>
            <div className="glass rounded-2xl rounded-tl-none px-5 py-3 max-w-lg">
              <p className="text-text text-sm sm:text-base">
                "I have a budget of 60 lakh and need a family car."
              </p>
            </div>
          </div>

          {/* AI message */}
          <div className="flex gap-3 mb-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="glass rounded-2xl rounded-tl-none px-5 py-4 mb-4">
                <p className="text-text text-sm sm:text-base mb-2">
                  Based on your needs, I recommend:
                </p>
                <div className="flex flex-wrap gap-2">
                  {recommendations.map((r) => (
                    <span
                      key={r.name}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-accent/15 text-accent"
                    >
                      {r.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommendation cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recommendations.map((rec, idx) => (
                  <motion.div
                    key={rec.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.15 }}
                    className="glass rounded-2xl p-4 hover:bg-card/80 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-heading font-bold text-text text-sm">
                        {rec.name}
                      </h4>
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-accent/15 text-accent">
                        {rec.matchPercent}% match
                      </span>
                    </div>
                    <p className="text-xs text-textSecondary mb-2">{rec.price}</p>
                    <p className="text-xs text-textSecondary leading-relaxed">
                      {rec.reason}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-accent font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Recommended for you</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div className="glass rounded-2xl p-2 flex items-center gap-2 mt-6">
            <input
              type="text"
              placeholder="Ask about fuel type, budget, family size..."
              className="flex-1 bg-transparent text-text placeholder:text-textSecondary outline-none px-4 py-3 text-sm"
            />
            <button className="flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accentHover text-white font-semibold rounded-xl transition-colors text-sm whitespace-nowrap">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-textSecondary"
        >
          <TrendingUp className="w-4 h-4 text-accent" />
          <span>Powered by 50,000+ data points and real owner reviews</span>
        </motion.div>
      </div>
    </section>
  );
}
