import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage, type Language } from '../../lib/LanguageContext';
import { cn } from '../../lib/utils';
import logoWhite from '../../assets/Photo/logo-white.webp';

export const Footer = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const { lang, setLang, t } = useLanguage();

  if (isAdminPage) return null;

  return (
    <footer className="bg-primary-black text-pure-white py-20 lg:py-32">
      <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20">
        {/* Logo and About */}
        <div className="md:col-span-2">
          <Link to="/" className="mb-8 inline-block">
            <img 
              src={logoWhite} 
              alt="3NT STUDIO" 
              className="h-10 w-auto"
            />
          </Link>
          <p className="text-medium-gray max-w-sm leading-relaxed mb-8">
            {t('footer_tagline')}
          </p>
          <div className="flex gap-6">
            <a href="https://instagram.com/3nt_studio" className="text-pure-white hover:text-medium-gray transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm uppercase tracking-widest font-bold mb-8">{t('footer_quick_links')}</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="text-medium-gray hover:text-pure-white transition-colors">{t('nav_home')}</Link></li>
            <li><Link to="/portfolio" className="text-medium-gray hover:text-pure-white transition-colors">{t('nav_portfolio')}</Link></li>
            <li><Link to="/pricing" className="text-medium-gray hover:text-pure-white transition-colors">{t('nav_services')}</Link></li>
            <li><Link to="/location" className="text-medium-gray hover:text-pure-white transition-colors">{t('nav_location')}</Link></li>
            <li><Link to="/booking" className="text-medium-gray hover:text-pure-white transition-colors">{t('nav_booking')}</Link></li>
            <li><Link to="/photobooth" className="text-medium-gray hover:text-pure-white transition-colors">{t('nav_photobooth')}</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-sm uppercase tracking-widest font-bold mb-8">{t('footer_get_in_touch')}</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <MapPin size={22} className="mt-1 text-medium-gray shrink-0" />
              <span className="text-medium-gray leading-relaxed">
                Gg. Arim 2, RT.003/RW.009, <br /> Paninggilan Utara
                Kec. Ciledug, <br /> Kota Tangerang, Banten 15153
              </span>
            </li>
            <li className="flex items-center gap-4">
              <Phone size={22} className="text-medium-gray shrink-0" />
              <span className="text-medium-gray">+62 856-9722-9466</span> 
            </li>
            <li className="flex items-center gap-4">
              <Mail size={22} className="text-medium-gray shrink-0" />
              <span className="text-medium-gray">3nteamprod@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright + Language Switcher */}
      <div className="container-custom mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-[0.2em] text-medium-gray">
        <p>{t('footer_copyright')}</p>

        {/* Language Switcher */}
        <div className="flex items-center gap-3">
          {(['en', 'id'] as Language[]).map((code, idx) => (
            <>
              {idx > 0 && (
                <span key={`sep-${code}`} className="text-medium-gray/40 select-none">·</span>
              )}
              <button
                key={code}
                onClick={() => setLang(code)}
                className={cn(
                  'text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300',
                  lang === code
                    ? 'text-pure-white border-b border-pure-white pb-0.5'
                    : 'text-medium-gray hover:text-pure-white/70'
                )}
              >
                {code.toUpperCase()}
              </button>
            </>
          ))}
        </div>
      </div>
    </footer>
  );
};
