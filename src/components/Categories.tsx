import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { supabase, type Category } from '@/supabaseClient';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data) setCategories(data);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

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
            Browse by Type
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text">
            Explore Vehicle Categories
          </h2>
          <p className="mt-4 text-textSecondary text-lg max-w-2xl mx-auto">
            From compact city cars to rugged pickups, find the type that fits your life.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl glass cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cat.image_url}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute top-3 right-3 glass-strong rounded-full px-3 py-1">
                  <span className="text-xs font-semibold text-text">{cat.vehicle_count} cars</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-5">
                <h3 className="font-heading font-bold text-lg text-text mb-1">
                  {cat.name}
                </h3>
                <p className="text-sm text-textSecondary mb-4 leading-relaxed">
                  {cat.description}
                </p>
                <button className="flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl ring-1 ring-accent/30" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
