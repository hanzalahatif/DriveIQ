import { Car, Twitter, Instagram, Youtube, Facebook, Palette } from 'lucide-react';
import { useTheme } from '@/ThemeContext';
import { themes } from '@/themes';

const quickLinks = ['Cars', 'Compare', 'Categories', 'AI Advisor'];
const socialLinks = [
  { icon: Twitter, label: 'Twitter' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Facebook, label: 'Facebook' },
];

export default function Footer() {
  const { currentTheme, setTheme } = useTheme();

  return (
    <footer className="relative border-t border-border/50 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-text">
                Drive<span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-sm text-textSecondary leading-relaxed max-w-xs">
              The AI-powered automotive discovery platform that helps you find the perfect vehicle.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-semibold text-text mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-textSecondary hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold text-text mb-4">Follow Us</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-textSecondary hover:text-accent hover:bg-card/80 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Theme settings */}
          <div>
            <h4 className="font-heading font-semibold text-text mb-4 flex items-center gap-2">
              <Palette className="w-4 h-4 text-accent" />
              Theme Settings
            </h4>
            <div className="flex flex-wrap gap-2">
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTheme(t.name)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${
                    currentTheme.name === t.name
                      ? 'border-accent scale-110'
                      : 'border-border hover:border-textSecondary'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, rgb(${t.vars['--color-bg']}), rgb(${t.vars['--color-accent']}))`,
                  }}
                  aria-label={t.label}
                  title={t.label}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-textSecondary">
            © 2026 DriveAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-textSecondary hover:text-accent transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-textSecondary hover:text-accent transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-textSecondary hover:text-accent transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
