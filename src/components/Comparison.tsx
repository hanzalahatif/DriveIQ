import { motion } from 'framer-motion';
import { GitCompare, Crown, Check } from 'lucide-react';
import { comparisonMetrics } from '@/data';

const car1 = { name: 'Toyota Corolla', image: 'https://images.pexels.com/photos/15194849/pexels-photo-15194849.jpeg?auto=compress&cs=tinysrgb&w=600' };
const car2 = { name: 'Honda Civic', image: 'https://images.pexels.com/photos/27138933/pexels-photo-27138933.jpeg?auto=compress&cs=tinysrgb&w=600' };

export default function Comparison() {
  const car1Wins = comparisonMetrics.filter((m) => m.winner === 'car1').length;
  const car2Wins = comparisonMetrics.filter((m) => m.winner === 'car2').length;
  const overallWinner = car1Wins > car2Wins ? 'car1' : 'car2';

  return (
    <section className="relative py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs font-semibold text-accent uppercase tracking-wider mb-4">
            <GitCompare className="w-3.5 h-3.5" />
            Featured Comparison
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text">
            Head-to-Head Showdown
          </h2>
          <p className="mt-4 text-textSecondary text-lg max-w-2xl mx-auto">
            See how the top contenders stack up across every metric that matters.
          </p>
        </motion.div>

        {/* Comparison card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl p-4 sm:p-6 lg:p-8"
        >
          {/* Car headers */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8">
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-3 text-center sm:text-left">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img src={car1.image} alt={car1.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-text">{car1.name}</h3>
                {overallWinner === 'car1' && (
                  <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold px-2 py-1 rounded-full bg-accent/20 text-accent">
                    <Crown className="w-3 h-3" /> Overall Winner
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center sm:flex-row-reverse sm:items-center gap-3 text-center sm:text-right">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img src={car2.image} alt={car2.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-text">{car2.name}</h3>
                {overallWinner === 'car2' && (
                  <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold px-2 py-1 rounded-full bg-accent/20 text-accent">
                    <Crown className="w-3 h-3" /> Overall Winner
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-6">
            {comparisonMetrics.map((metric, idx) => {
              const total = metric.car1Value + metric.car2Value;
              const car1Pct = (metric.car1Value / total) * 100;
              const car2Pct = (metric.car2Value / total) * 100;

              return (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-text">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      {metric.winner === 'car1' && (
                        <Check className="w-3.5 h-3.5 text-accent" />
                      )}
                    </div>
                  </div>

                  {/* Bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-textSecondary w-16 sm:w-20 text-right truncate">
                      {metric.car1Label}
                    </span>
                    <div className="flex-1 flex h-7 rounded-lg overflow-hidden bg-card/50">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${car1Pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                        className={`flex items-center justify-end pr-2 ${
                          metric.winner === 'car1' ? 'bg-accent' : 'bg-accent/40'
                        }`}
                      />
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${car2Pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 + 0.1, ease: 'easeOut' }}
                        className={`flex items-center justify-start pl-2 ${
                          metric.winner === 'car2' ? 'bg-accent' : 'bg-accent/40'
                        }`}
                      />
                    </div>
                    <span className="text-xs text-textSecondary w-16 sm:w-20 truncate">
                      {metric.car2Label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <button className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accentHover text-white font-semibold rounded-xl transition-colors">
              <GitCompare className="w-5 h-5" />
              Start Your Own Comparison
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
