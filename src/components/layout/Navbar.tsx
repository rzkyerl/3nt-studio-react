import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import logoBlack from '../../assets/Photo/logo-black.png';
import logoWhite from '../../assets/Photo/logo-white.png';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Portofolio', href: '/portfolio' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Location', href: '/location' },
  { name: 'Photobooth', href: '/photobooth' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use scrolled style (white bg, black text) for all other pages
  const navStyle = isHomePage && !isScrolled ? 'transparent' : 'scrolled';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6',
        (navStyle === 'scrolled' || isMobileMenuOpen)
          ? 'bg-pure-white backdrop-blur-md border-b border-border-gray/50 py-4' 
          : 'bg-transparent'
      )}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="z-50">
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
              key={link.name}
              to={link.href}
              className={({ isActive }) => cn(
                'text-sm uppercase tracking-widest font-medium transition-colors duration-300 hover:text-medium-gray',
                navStyle === 'scrolled' ? 'text-primary-black' : 'text-pure-white',
                isActive && (navStyle === 'scrolled' ? 'border-b border-primary-black' : 'border-b border-pure-white')
              )}
            >
              {link.name}
            </NavLink>
          ))}
          <Link to="/location">
            <button className={cn(
              'px-6 py-2 border transition-all duration-300 uppercase tracking-widest text-xs font-semibold cursor-pointer',
              navStyle === 'scrolled' 
                ? 'border-primary-black bg-primary-black text-pure-white hover:bg-transparent hover:text-primary-black'
                : 'border-pure-white bg-pure-white text-primary-black hover:bg-transparent hover:text-pure-white'
            )}>
              Book Now
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden transition-colors duration-300 z-50",
            (navStyle === 'scrolled' || isMobileMenuOpen) ? 'text-primary-black' : 'text-pure-white'
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[72px] bg-pure-white z-40 md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => cn(
                  "text-2xl uppercase tracking-widest font-heading text-primary-black hover:text-medium-gray",
                  isActive && "italic"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
