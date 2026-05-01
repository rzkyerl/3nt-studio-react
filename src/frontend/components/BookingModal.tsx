import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export type BookingPackageOption = {
  value: string;
  label: string;
  price: string;
  group: string;
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packages: BookingPackageOption[];
  serviceTitle: string;
}

export const BookingModal = ({ isOpen, onClose, packages, serviceTitle }: BookingModalProps) => {
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  const selectedPkg = packages.find((p) => p.value === selected);

  const handleProceed = () => {
    if (!selected) return;
    onClose();
    navigate(`/booking?package=${encodeURIComponent(selected)}`);
  };

  // Group packages by their group label
  const groups = Array.from(new Set(packages.map((p) => p.group)));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-primary-black/60 backdrop-blur-sm z-[9990]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-[9991] flex items-center justify-center px-4"
          >
            <div className="bg-pure-white w-full max-w-lg shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-border-gray">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-medium-gray mb-1">
                    Book Now
                  </p>
                  <h3 className="text-xl font-heading font-bold uppercase tracking-tight">
                    {serviceTitle}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center border border-border-gray hover:bg-primary-black hover:text-pure-white transition-all"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="px-8 py-8 space-y-6">
                <p className="text-sm text-medium-gray leading-relaxed">
                  Pilih paket yang ingin kamu booking. Kamu bisa mengubahnya lagi di halaman booking.
                </p>

                {/* Package Select */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-medium-gray">
                    Pilih Paket
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-light-gray border border-border-gray py-3 px-4 pr-10 focus:outline-none focus:border-primary-black transition-colors text-primary-black font-body text-sm appearance-none"
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                    >
                      <option value="" disabled>
                        — Pilih paket —
                      </option>
                      {groups.map((group) => (
                        <optgroup key={group} label={group}>
                          {packages
                            .filter((p) => p.group === group)
                            .map((pkg) => (
                              <option key={pkg.value} value={pkg.value}>
                                {pkg.label} — {pkg.price}
                              </option>
                            ))}
                        </optgroup>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-medium-gray">
                      <ChevronDown size={16} />
                    </span>
                  </div>
                </div>

                {/* Selected package preview */}
                <AnimatePresence mode="wait">
                  {selectedPkg && (
                    <motion.div
                      key={selectedPkg.value}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center justify-between bg-primary-black text-pure-white px-5 py-4"
                    >
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">
                        {selectedPkg.group} · {selectedPkg.label}
                      </span>
                      <span className="text-sm font-bold italic">{selectedPkg.price}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="px-8 pb-8 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 border border-border-gray py-3 text-xs uppercase tracking-[0.2em] font-bold hover:border-primary-black transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleProceed}
                  disabled={!selected}
                  className="flex-1 bg-primary-black text-pure-white py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-medium-gray transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Lanjut ke Booking →
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
