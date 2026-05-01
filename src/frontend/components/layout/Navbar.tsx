import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../lib/LanguageContext';
import logoBlack from '../../assets/Photo/logo-black.webp';
import logoWhite from '../../assets/Photo/logo-white.webp';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const isHomePage = location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin');

  const navLinks = [
    { nameKey: 'nav_home', href: '/' },
    { nameKey: 'nav_portfolio', href: '/portfolio' },
    { nameKey: 'nav_services', href: '/pricing' },
    { nameKey: 'nav_location', href: '/location' },
    { nameKey: 'nav_booking', href: '/booking' },
    { nameKey: 'nav_photobooth', href: '/photobooth' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdminPage) return null;

  // Use scrolled style (white bg, black text) for all other pages
  const navStyle = isHomePage && !isScrolled ? 'transparent' : 'scrolled';


  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500',
        (navStyle === 'scrolled' || isMobileMenuOpen)
          ? 'bg-white py-4 border-b border-border-gray/50' 
          : 'bg-transparent py-6'
      )}
    >
      <div className="container-custom flex justify-between items-center relative z-50">
        {/* Logo */}
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
          <img 
            src={(navStyle === 'scrolled' || isMobileMenuOpen) ? logoBlack : logoWhite} 
            alt="3NT STUDIO" 
            className="h-10 w-auto transition-all duration-300"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.nameKey}
              to={link.href}
              className={({ isActive }) => cn(
                'text-sm uppercase tracking-widest font-medium transition-colors duration-300 hover:text-medium-gray',
                navStyle === 'scrolled' ? 'text-primary-black' : 'text-pure-white',
                isActive && (navStyle === 'scrolled' ? 'border-b border-primary-black' : 'border-b border-pure-white')
              )}
            >
              {t(link.nameKey)}
            </NavLink>
          ))}



          <Link to="/booking">
            <button className={cn(
              'px-6 py-2 border transition-all duration-300 uppercase tracking-widest text-xs font-semibold cursor-pointer',
              navStyle === 'scrolled' 
                ? 'border-primary-black bg-primary-black text-pure-white hover:bg-transparent hover:text-primary-black'
                : 'border-pure-white bg-pure-white text-primary-black hover:bg-transparent hover:text-pure-white'
            )}>
              {t('nav_book_now')}
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden transition-colors duration-300",
            (navStyle === 'scrolled' || isMobileMenuOpen) ? 'text-primary-black' : 'text-pure-white'
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[45] md:hidden flex flex-col items-center justify-center pt-20"
          >
            <div className="flex flex-col items-center gap-8 py-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.nameKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NavLink
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => cn(
                      "text-3xl uppercase tracking-[0.2em] font-heading text-primary-black hover:text-medium-gray transition-colors",
                      isActive && "italic font-bold"
                    )}
                  >
                    {t(link.nameKey)}
                  </NavLink>
                </motion.div>
              ))}
              


              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-4"
              >
                <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="px-12 py-4 bg-primary-black text-pure-white uppercase tracking-[0.2em] text-xs font-bold shadow-lg">
                    {t('nav_book_now')}
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
