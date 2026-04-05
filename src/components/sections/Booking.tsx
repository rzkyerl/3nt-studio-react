import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const LocationSection = () => {
  return (
    <section id="location-section" className="section-padding bg-pure-white overflow-hidden">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 text-center"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-medium-gray font-bold">Contact</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight">
              Visit Our <br />
              <span className="italic font-light">Creative Space</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8"
          >
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-widest font-bold flex items-center gap-3">
                <MapPin size={18} /> Address
              </h4>
              <p className="text-medium-gray text-lg leading-relaxed italic">
                Gg. Arim 2, RT.003/RW.009, Paninggilan Utara<br />
                Kec. Ciledug, Kota Tangerang, Banten 15153
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-widest font-bold flex items-center gap-3">
                <Clock size={18} /> Hours
              </h4>
              <p className="text-medium-gray text-lg leading-relaxed italic">
                Mon - Fri: 09:00 - 18:00<br />
                Sat: 10:00 - 15:00
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-widest font-bold flex items-center gap-3">
                <Phone size={18} /> Phone
              </h4>
              <p className="text-medium-gray text-lg leading-relaxed italic">
                +62 812 12345678
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-widest font-bold flex items-center gap-3">
                <Mail size={18} /> Email
              </h4>
              <p className="text-medium-gray text-lg leading-relaxed italic">
                3nteamprod@gmail.com
              </p>
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full aspect-video bg-light-gray overflow-hidden grayscale border border-border-gray shadow-xl group"
          >
            <iframe
              title="Studio Location"
              src="https://www.google.com/maps?q=Gg.%20Arim%202%2C%20RT.003%2FRW.009%2C%20Paninggilan%20Utara%2C%20Kec.%20Ciledug%2C%20Kota%20Tangerang%2C%20Banten%2015153&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="opacity-80 transition-opacity duration-500 group-hover:opacity-100"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    package: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message template
    const adminPhoneNumber = "6281212345678"; // Using the number from LocationSection
    const message = `*NEW BOOKING RESERVATION - 3NT STUDIO*
----------------------------------------
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Date:* ${formData.date}
*Package:* ${formData.package || 'Custom Request'}
----------------------------------------
*Notes:* 
${formData.notes || '-'}
----------------------------------------
Sent from 3ntstudio.com`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    alert('Redirecting to WhatsApp to complete your reservation...');
    setFormData({ name: '', phone: '', date: '', package: '', notes: '' });
  };

  return (
    <section id="booking-section" className="section-padding bg-pure-white overflow-hidden">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-light-gray p-12 lg:p-20 shadow-2xl relative"
          >
            <div className="mb-12 text-center">
              <h3 className="text-3xl font-heading font-bold mb-4 uppercase tracking-tighter">Reserve Your Session</h3>
              <p className="text-medium-gray text-sm uppercase tracking-widest">Complete the form below and we'll reach out to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-medium-gray">Full Name</label>
                <input 
                  type="text"
                  placeholder="Your Name" 
                  className="w-full bg-transparent border-b border-border-gray py-3 px-1 focus:outline-none focus:border-primary-black transition-colors duration-300 text-primary-black font-body text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-medium-gray">Phone Number</label>
                <input 
                  type="text"
                  placeholder="Your Phone Number" 
                  className="w-full bg-transparent border-b border-border-gray py-3 px-1 focus:outline-none focus:border-primary-black transition-colors duration-300 text-primary-black font-body text-sm"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-medium-gray">Preferred Date</label>
                  <input 
                    type="date" 
                    className="w-full bg-transparent border-b border-border-gray py-3 px-1 focus:outline-none focus:border-primary-black transition-colors duration-300 text-primary-black font-body text-sm"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-medium-gray">Select Package</label>
                  <select 
                    className="w-full bg-transparent border-b border-border-gray py-3 px-1 focus:outline-none focus:border-primary-black transition-colors duration-300 text-primary-black font-body text-sm uppercase tracking-widest appearance-none"
                    value={formData.package}
                    onChange={(e) => setFormData({...formData, package: e.target.value})}
                    required
                  >
                    <option value="" disabled>Choose Package</option>
                    <option value="classic">Classic Session</option>
                    <option value="wedding">Premium Wedding</option>
                    <option value="commercial">Commercial Studio</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-medium-gray">Notes (Optional)</label>
                <textarea 
                  placeholder="Tell us about your vision..." 
                  className="w-full bg-transparent border-b border-border-gray py-3 px-1 focus:outline-none focus:border-primary-black transition-colors duration-300 text-primary-black font-body text-sm min-h-[100px] resize-none"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-primary-black text-pure-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-medium-gray transition-colors duration-300"
                >
                  Reserve Now
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
