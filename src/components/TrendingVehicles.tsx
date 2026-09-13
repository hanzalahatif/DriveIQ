import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Fuel, Settings, Sparkles, TrendingUp } from 'lucide-react';
import { supabase, type Car } from '@/supabaseClient';

export default function TrendingVehicles() {
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('is_trending', true)
        .order('match_score', { ascending: false });
      if (!error && data) setVehicles(data);
      setLoading(false);
    };
    fetchVehicles();
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

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
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs font-semibold text-accent uppercase tracking-wider mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              Trending Now
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-text">
              Hot Picks This Week
            </h2>
          </motion.div>

          {/* Arrow buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 glass rounded-xl text-textSecondary hover:text-text hover:bg-card/80 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 glass rounded-xl text-textSecondary hover:text-text hover:bg-card/80 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        >
          {vehicles.map((vehicle, idx) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="flex-shrink-0 w-72 sm:w-80 snap-start group cursor-pointer"
            >
              <div className="glass rounded-2xl overflow-hidden">
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={vehicle.image_url}
                    alt={vehicle.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute top-3 left-3 glass-strong rounded-full px-3 py-1 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <span className="text-xs font-bold text-text">{vehicle.match_score}% match</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading font-bold text-lg text-text mb-1">
                    {vehicle.name}
                  </h3>
                  <p className="text-lg font-heading font-bold text-accent mb-4">
                    {vehicle.price}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-textSecondary">
                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-4 h-4" />
                      <span>{vehicle.fuel_type}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Settings className="w-4 h-4" />
                      <span>{vehicle.transmission}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {vehicles.length === 0 && (
            <div className="w-full text-center py-12 text-textSecondary">
              No trending vehicles yet. Add some in the Admin Dashboard.
            </div>
          )}
        </div>

        {/* Mobile arrows */}
        <div className="flex sm:hidden items-center justify-center gap-3 mt-6">
          <button
            onClick={() => scroll('left')}
            className="p-2.5 glass rounded-xl text-textSecondary hover:text-text transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2.5 glass rounded-xl text-textSecondary hover:text-text transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
