import { motion } from 'framer-motion';
import { Brain, GitCompare, BadgeCheck, Compass } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Recommendations',
    description: 'Our intelligent engine learns your preferences and suggests vehicles that truly fit your lifestyle and budget.',
  },
  {
    icon: GitCompare,
    title: 'Visual Comparisons',
    description: 'Side-by-side animated comparisons make it effortless to see which car wins on the metrics that matter to you.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Specifications',
    description: 'Every spec is sourced from manufacturers and verified by our team, so you can trust the numbers you see.',
  },
  {
    icon: Compass,
    title: 'Smart Vehicle Discovery',
    description: 'Explore by category, budget, fuel type, or lifestyle. Find cars you did not even know you wanted.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 glass rounded-full text-xs font-semibold text-accent uppercase tracking-wider mb-4">
            Why DriveAI
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text">
            Built for Smarter Decisions
          </h2>
          <p className="mt-4 text-textSecondary text-lg max-w-2xl mx-auto">
            We combine AI, verified data, and beautiful design to make car discovery effortless.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group glass rounded-2xl p-6 hover:bg-card/80 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all">
                <f.icon className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading font-bold text-lg text-text mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-textSecondary leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
