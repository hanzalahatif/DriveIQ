import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Search, Menu, X, Palette, Check, Settings } from 'lucide-react';
import { useTheme } from '@/ThemeContext';
import { themes } from '@/themes';

const navLinks = ['Cars', 'Compare', 'Categories', 'AI Advisor'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { currentTheme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center accent-glow">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-text">
              Drive<span className="gradient-text">AI</span>
            </span>
          </div>

          {/* Center nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="px-4 py-2 text-sm font-medium text-textSecondary hover:text-text transition-colors rounded-lg hover:bg-card/50"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme switcher */}
            <div className="relative">
              <button
                onClick={() => setThemeOpen(!themeOpen)}
                className="p-2 rounded-lg text-textSecondary hover:text-text hover:bg-card/50 transition-colors"
                aria-label="Switch theme"
              >
                <Palette className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {themeOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setThemeOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 glass-strong rounded-xl shadow-2xl p-2 z-50"
                    >
                      <p className="px-3 py-2 text-xs font-semibold text-textSecondary uppercase tracking-wider">
                        Theme
                      </p>
                      {themes.map((t) => (
                        <button
                          key={t.name}
                          onClick={() => {
                            setTheme(t.name);
                            setThemeOpen(false);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-card transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-lg border border-border"
                              style={{
                                background: `linear-gradient(135deg, rgb(${t.vars['--color-bg']}), rgb(${t.vars['--color-accent']}))`,
                              }}
                            />
                            <div className="text-left">
                              <p className="text-sm font-medium text-text">{t.label}</p>
                              <p className="text-xs text-textSecondary">{t.description}</p>
                            </div>
                          </div>
                          {currentTheme.name === t.name && (
                            <Check className="w-4 h-4 text-accent" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Search button */}
            <button
              className="p-2 rounded-lg text-textSecondary hover:text-text hover:bg-card/50 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Admin button */}
            <a
              href="/admin"
              className="p-2 rounded-lg text-textSecondary hover:text-text hover:bg-card/50 transition-colors"
              aria-label="Admin dashboard"
              title="Admin Dashboard"
            >
              <Settings className="w-5 h-5" />
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-textSecondary hover:text-text hover:bg-card/50 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="glass-strong rounded-xl mb-4 p-2">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block px-4 py-3 text-sm font-medium text-textSecondary hover:text-text hover:bg-card/50 rounded-lg transition-colors"
                  >
                    {link}
                  </a>
                ))}
                <a
                  href="/admin"
                  className="block px-4 py-3 text-sm font-medium text-accent hover:bg-card/50 rounded-lg transition-colors"
                >
                  Admin Dashboard
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
