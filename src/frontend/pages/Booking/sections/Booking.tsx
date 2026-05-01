import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { generateBookingPDF } from '../../../utils/pdfGenerator';
import { uploadBookingPDFToSanity } from '../../../utils/sanityStorage';
import { client } from '../../../../backend/sanity/client';
import { useLanguage } from '../../../lib/LanguageContext';

// --- Toast Component ---
type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-4 px-6 py-4 shadow-2xl min-w-[300px] max-w-sm"
      style={{ background: type === 'success' ? '#111' : '#fff', color: type === 'success' ? '#fff' : '#111', border: type === 'error' ? '1px solid #111' : 'none' }}
    >
      {type === 'success'
        ? <CheckCircle2 size={20} className="shrink-0 text-white" />
        : <XCircle size={20} className="shrink-0 text-primary-black" />
      }
      <span className="text-sm font-bold uppercase tracking-widest flex-1">{message}</span>
      <button onClick={onClose} className="opacity-40 hover:opacity-100 transition-opacity text-lg leading-none">✕</button>
    </motion.div>
  );
};

export const LocationSection = () => {
  const { t } = useLanguage();
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
            <span className="text-xs uppercase tracking-[0.4em] text-medium-gray font-bold">{t('booking_contact_label')}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight">
              {t('booking_visit_title')} <br />
              <span className="italic font-light">{t('booking_visit_subtitle')}</span>
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
                <MapPin size={18} /> {t('booking_address')}
              </h4>
              <p className="text-medium-gray text-lg leading-relaxed italic">
                Gg. Arim 2, RT.003/RW.009, Paninggilan Utara<br />
                Kec. Ciledug, Kota Tangerang, Banten 15153
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-widest font-bold flex items-center gap-3">
                <Clock size={18} /> {t('booking_hours')}
              </h4>
              <p className="text-medium-gray text-lg leading-relaxed italic">
                Mon - Fri: 09:00 - 18:00<br />
                Sat: 10:00 - 15:00
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-widest font-bold flex items-center gap-3">
                <Phone size={18} /> {t('booking_phone')}
              </h4>
              <p className="text-medium-gray text-lg leading-relaxed italic">
                +62 856-9722-9466
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-widest font-bold flex items-center gap-3">
                <Mail size={18} /> {t('booking_email')}
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
            className="relative w-full aspect-video bg-light-gray overflow-hidden lg:grayscale border border-border-gray shadow-xl group"
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
              className="lg:opacity-80 transition-opacity duration-500 group-hover:opacity-100"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// All available packages with prices
const PACKAGES = [
  // Photobooth - Unlimited
  { group: 'Photobooth — Unlimited', value: 'photobooth_unlimited_2h', label: '2 Hours', price: 'Rp 3.500.000' },
  { group: 'Photobooth — Unlimited', value: 'photobooth_unlimited_3h', label: '3 Hours', price: 'Rp 4.500.000' },
  { group: 'Photobooth — Unlimited', value: 'photobooth_unlimited_4h', label: '4 Hours', price: 'Rp 5.500.000' },
  // Photobooth - Limited
  { group: 'Photobooth — Limited', value: 'photobooth_limited_100', label: '100 Prints', price: 'Rp 3.300.000' },
  { group: 'Photobooth — Limited', value: 'photobooth_limited_200', label: '200 Prints', price: 'Rp 3.800.000' },
  // Multicam - FX6
  { group: 'Multicam — FX6 Cinema 4K', value: 'multicam_fx6_1cam', label: '1 Camera', price: 'Rp 5.000.000' },
  { group: 'Multicam — FX6 Cinema 4K', value: 'multicam_fx6_2cam', label: '2 Camera', price: 'Rp 10.000.000' },
  { group: 'Multicam — FX6 Cinema 4K', value: 'multicam_fx6_3cam', label: '3 Camera', price: 'Rp 15.000.000' },
  // Multicam - Sony Z190
  { group: 'Multicam — Sony Z190', value: 'multicam_z190_1cam', label: '1 Camera', price: 'Rp 3.500.000' },
  { group: 'Multicam — Sony Z190', value: 'multicam_z190_2cam', label: '2 Camera', price: 'Rp 6.500.000' },
  // Multicam - Sony NX5R
  { group: 'Multicam — Sony NX5R', value: 'multicam_nx5r_1cam', label: '1 Camera', price: 'Rp 3.500.000' },
  { group: 'Multicam — Sony NX5R', value: 'multicam_nx5r_2cam', label: '2 Camera', price: 'Rp 6.500.000' },
  // Drone
  { group: 'Aerial Drone', value: 'drone_basic', label: 'Drone Basic', price: 'Rp 2.500.000' },
  { group: 'Aerial Drone', value: 'drone_gold', label: 'Drone Gold', price: 'Rp 4.500.000' },
  { group: 'Aerial Drone', value: 'drone_platinum', label: 'Drone Platinum', price: 'Rp 7.500.000' },
  { group: 'Aerial Drone', value: 'drone_fpv', label: 'Drone FPV', price: 'Rp 5.500.000' },
  // Documentation - Photo
  { group: 'Documentation — Photo', value: 'doc_photo_1', label: '1 Photographer', price: 'Rp 2.500.000' },
  { group: 'Documentation — Photo', value: 'doc_photo_2', label: '2 Photographer', price: 'Rp 4.500.000' },
  // Documentation - Video
  { group: 'Documentation — Video', value: 'doc_video_1', label: '1 Videographer', price: 'Rp 4.500.000' },
  { group: 'Documentation — Video', value: 'doc_video_2', label: '2 Videographer', price: 'Rp 6.500.000' },
  // Broadcast & Streaming
  { group: 'Broadcast & Streaming', value: 'stream_vmix', label: 'VMIX + VJ', price: 'Rp 2.500.000' },
  { group: 'Broadcast & Streaming', value: 'stream_resolume', label: 'Resolume + VJ', price: 'Rp 3.500.000' },
  { group: 'Broadcast & Streaming', value: 'stream_hybrid', label: 'Hybrid System', price: 'Rp 8.500.000' },
  { group: 'Broadcast & Streaming', value: 'stream_social', label: 'Social Media Stream', price: 'Rp 5.500.000' },
  // Teleprompter
  { group: 'Teleprompter', value: 'teleprompter_6h', label: 'Teleprompter 6 Jam', price: 'Rp 1.500.000' },
  { group: 'Teleprompter', value: 'teleprompter_1d', label: 'Teleprompter 1 Hari', price: 'Rp 2.500.000' },
  // Custom
  { group: 'Custom Production', value: 'custom', label: 'Custom / Konsultasi', price: 'Hubungi Kami' },
];

// Abbreviation map for booking ID — BKG-{CODE}-{4-digit random}
const PACKAGE_CODE: Record<string, string> = {
  photobooth_unlimited_2h:  'PBTU2',
  photobooth_unlimited_3h:  'PBTU3',
  photobooth_unlimited_4h:  'PBTU4',
  photobooth_limited_100:   'PBTL1',
  photobooth_limited_200:   'PBTL2',
  multicam_fx6_1cam:        'FX61C',
  multicam_fx6_2cam:        'FX62C',
  multicam_fx6_3cam:        'FX63C',
  multicam_z190_1cam:       'Z1901',
  multicam_z190_2cam:       'Z1902',
  multicam_nx5r_1cam:       'NX5R1',
  multicam_nx5r_2cam:       'NX5R2',
  drone_basic:              'DRNBS',
  drone_gold:               'DRNGD',
  drone_platinum:           'DRNPL',
  drone_fpv:                'DRNFP',
  doc_photo_1:              'DCPH1',
  doc_photo_2:              'DCPH2',
  doc_video_1:              'DCVD1',
  doc_video_2:              'DCVD2',
  stream_vmix:              'STVMX',
  stream_resolume:          'STRSM',
  stream_hybrid:            'STHYB',
  stream_social:            'STSOC',
  teleprompter_6h:          'TPMT6',
  teleprompter_1d:          'TPMT1',
  custom:                   'CSTM',
};

const generateBookingId = (packageValue: string): string => {
  const code = PACKAGE_CODE[packageValue] ?? 'PKG';
  const rand = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  return `BKG-${code}-${rand}`;
};

export const BookingSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    package: '',
    notes: ''
  });

  // Pre-fill package from URL query param (e.g. /booking?package=photobooth_unlimited_2h)
  useEffect(() => {
    const pkgParam = searchParams.get('package');
    if (pkgParam && PACKAGES.some((p) => p.value === pkgParam)) {
      setFormData((prev) => ({ ...prev, package: pkgParam }));
      // Scroll to booking form smoothly
      setTimeout(() => {
        document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [searchParams]);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const selectedPackage = PACKAGES.find(p => p.value === formData.package);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Generate PDF
      const pdfBlob = generateBookingPDF(formData);
      
      // 2. Upload to Sanity Storage
      const fileName = `booking_${Date.now()}_${formData.name.replace(/\s+/g, '_')}.pdf`;
      const pdfUrl = await uploadBookingPDFToSanity(pdfBlob, fileName);

      // 3. Save to Sanity for Dashboard
      const bookingId = generateBookingId(formData.package);
      const selectedPkg = PACKAGES.find(p => p.value === formData.package);
      // Parse numeric price from string like "Rp 3.500.000" → 3500000
      const priceNumeric = selectedPkg?.price
        ? parseInt(selectedPkg.price.replace(/[^0-9]/g, ''), 10) || 0
        : 0;
      await client.create({
        _type: 'booking',
        bookingId,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        date: formData.date,
        package: formData.package,
        packageLabel: selectedPkg ? `${selectedPkg.group} — ${selectedPkg.label}` : formData.package,
        price: priceNumeric,
        notes: formData.notes,
        pdfUrl: pdfUrl,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });

      // 4. Construct WhatsApp message template
      const adminPhoneNumber = "6285697229466";
      const packageLabel = selectedPkg
        ? `${selectedPkg.group} — ${selectedPkg.label} (${selectedPkg.price})`
        : 'Custom Request';
      const message = `*NEW BOOKING RESERVATION - 3NT STUDIO*
----------------------------------------
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Address:* ${formData.address || '-'}
*Date:* ${formData.date}
*Package:* ${packageLabel}
----------------------------------------
*Booking PDF:* ${pdfUrl}
----------------------------------------
*Notes:* 
${formData.notes || '-'}
----------------------------------------
Sent from 3ntstudio.com`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      showToast(t('booking_success'), 'success');
      setFormData({ name: '', phone: '', address: '', date: '', package: '', notes: '' });
    } catch (error) {
      console.error('Error submitting booking:', error);
      showToast(t('booking_error'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking-section" className="section-padding bg-pure-white overflow-hidden">
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
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
              <h3 className="text-3xl font-heading font-bold mb-4 uppercase tracking-tighter">{t('booking_reserve_title')}</h3>
              <p className="text-medium-gray text-sm uppercase tracking-widest">{t('booking_reserve_subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-medium-gray">{t('booking_full_name')}</label>
                <input 
                  type="text"
                  placeholder={t('booking_name_placeholder')} 
                  className="w-full bg-transparent border-b border-border-gray py-3 px-1 focus:outline-none focus:border-primary-black transition-colors duration-300 text-primary-black font-body text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-medium-gray">{t('booking_phone_number')}</label>
                <input 
                  type="text"
                  placeholder={t('booking_phone_placeholder')} 
                  className="w-full bg-transparent border-b border-border-gray py-3 px-1 focus:outline-none focus:border-primary-black transition-colors duration-300 text-primary-black font-body text-sm"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-medium-gray">{t('booking_address')}</label>
                <textarea 
                  placeholder={t('booking_address_placeholder')} 
                  className="w-full bg-transparent border-b border-border-gray py-3 px-1 focus:outline-none focus:border-primary-black transition-colors duration-300 text-primary-black font-body text-sm min-h-[80px] resize-none"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-medium-gray">{t('booking_preferred_date')}</label>
                <input 
                  type="date" 
                  className="w-full bg-transparent border-b border-border-gray py-3 px-1 focus:outline-none focus:border-primary-black transition-colors duration-300 text-primary-black font-body text-sm"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-medium-gray">{t('booking_select_package')}</label>
                <div className="relative">
                  <select 
                    className="w-full bg-transparent border-b border-border-gray py-3 px-1 focus:outline-none focus:border-primary-black transition-colors duration-300 text-primary-black font-body text-sm appearance-none pr-6"
                    value={formData.package}
                    onChange={(e) => setFormData({...formData, package: e.target.value})}
                    required
                  >
                    <option value="" disabled>{t('booking_choose_package')}</option>
                    {/* Group packages by category */}
                    {Array.from(new Set(PACKAGES.map(p => p.group))).map(group => (
                      <optgroup key={group} label={group}>
                        {PACKAGES.filter(p => p.group === group).map(pkg => (
                          <option key={pkg.value} value={pkg.value}>
                            {pkg.label} — {pkg.price}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-medium-gray">
                    ▾
                  </span>
                </div>

                {/* Price display when a package is selected */}
                {selectedPackage && (
                  <motion.div
                    key={selectedPackage.value}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 flex items-center justify-between bg-primary-black text-pure-white px-5 py-3"
                  >
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">
                      {selectedPackage.group} · {selectedPackage.label}
                    </span>
                    <span className="text-sm font-bold italic">
                      {selectedPackage.price}
                    </span>
                  </motion.div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-medium-gray">{t('booking_notes')}</label>
                <textarea 
                  placeholder={t('booking_notes_placeholder')} 
                  className="w-full bg-transparent border-b border-border-gray py-3 px-1 focus:outline-none focus:border-primary-black transition-colors duration-300 text-primary-black font-body text-sm min-h-[100px] resize-none"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary-black text-pure-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-medium-gray transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      {t('booking_processing')}
                    </>
                  ) : (
                    t('booking_reserve_btn')
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
