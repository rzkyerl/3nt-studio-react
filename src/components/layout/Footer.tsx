import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-primary-black text-pure-white py-20 lg:py-32">
      <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20">
        {/* Logo and About */}
        <div className="md:col-span-2">
          <Link to="/" className="text-3xl font-heading font-bold tracking-tighter mb-8 inline-block">
            3NT <span className="font-light italic">STUDIO</span>
          </Link>
          <p className="text-medium-gray max-w-sm leading-relaxed mb-8">
            Capturing the essence of every moment through a minimalist lens. Based in the heart of the city, we provide premium photography services for weddings, portraits, and commercial projects.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-pure-white hover:text-medium-gray transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-pure-white hover:text-medium-gray transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-pure-white hover:text-medium-gray transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm uppercase tracking-widest font-bold mb-8">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="text-medium-gray hover:text-pure-white transition-colors">Home</Link></li>
            <li><Link to="/portfolio" className="text-medium-gray hover:text-pure-white transition-colors">Portfolio</Link></li>
            <li><Link to="/pricing" className="text-medium-gray hover:text-pure-white transition-colors">Pricing</Link></li>
            <li><Link to="/location" className="text-medium-gray hover:text-pure-white transition-colors">Location</Link></li>
            <li><Link to="/photobooth" className="text-medium-gray hover:text-pure-white transition-colors">Photobooth</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-sm uppercase tracking-widest font-bold mb-8">Get In Touch</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <MapPin size={18} className="mt-1 text-medium-gray" />
              <span className="text-medium-gray leading-relaxed">
                Gg. Arim 2, RT.003/RW.009, Paninggilan Utara<br />
                Kec. Ciledug, Kota Tangerang, Banten 15153
              </span>
            </li>
            <li className="flex items-center gap-4">
              <Phone size={18} className="text-medium-gray" />
              <span className="text-medium-gray">+62 812 12345678</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail size={18} className="text-medium-gray" />
              <span className="text-medium-gray">hello@3ntstudio.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="container-custom mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-[0.2em] text-medium-gray">
        <p>&copy; 2026 3NT STUDIO. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-pure-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-pure-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
