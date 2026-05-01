import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { useState, useEffect, useCallback } from 'react';
import * as adminService from '../../../services/adminService';
import { urlFor } from '../../../../backend/sanity/client';

// Import New Portfolio Photos (Keep as static fallback if needed)
import mld1 from '../../../assets/Photo/mldspot/1.webp';
import mld2 from '../../../assets/Photo/mldspot/2.webp';
import mld3 from '../../../assets/Photo/mldspot/3.webp';
import mld4 from '../../../assets/Photo/mldspot/4.webp';
import mld5 from '../../../assets/Photo/mldspot/5.webp';
import mld6 from '../../../assets/Photo/mldspot/6.webp';

// BPH MIGAS
import bph1 from '../../../assets/Photo/bph-migas/1.webp';
import bph2 from '../../../assets/Photo/bph-migas/2.webp';
import bph3 from '../../../assets/Photo/bph-migas/3.webp';
import bph4 from '../../../assets/Photo/bph-migas/4.webp';
import bph5 from '../../../assets/Photo/bph-migas/5.webp';
import bph6 from '../../../assets/Photo/bph-migas/6.webp';

// FIFA
import fifa1 from '../../../assets/Photo/fifa/1.webp';
import fifa2 from '../../../assets/Photo/fifa/2.webp';
import fifa3 from '../../../assets/Photo/fifa/3.webp';
import fifa4 from '../../../assets/Photo/fifa/4.webp';
import fifa5 from '../../../assets/Photo/fifa/5.webp';
import fifa6 from '../../../assets/Photo/fifa/6.webp';

// GOLF
import golf1 from '../../../assets/Photo/golf-freindly-tournament/1.webp';
import golf2 from '../../../assets/Photo/golf-freindly-tournament/2.webp';
import golf3 from '../../../assets/Photo/golf-freindly-tournament/3.webp';
import golf4 from '../../../assets/Photo/golf-freindly-tournament/4.webp';
import golf5 from '../../../assets/Photo/golf-freindly-tournament/5.webp';
import golf6 from '../../../assets/Photo/golf-freindly-tournament/6.webp';

// ASDP
import asdp1 from '../../../assets/Photo/asdp/1.webp';
import asdp2 from '../../../assets/Photo/asdp/2.webp';
import asdp3 from '../../../assets/Photo/asdp/3.webp';
import asdp4 from '../../../assets/Photo/asdp/4.webp';
import asdp5 from '../../../assets/Photo/asdp/5.webp';
import asdp6 from '../../../assets/Photo/asdp/6.webp';

interface PortfolioItem {
  id: string | number;
  image?: string;
  url?: string; // from firebase
  video?: string;
  type?: 'image' | 'video';
  className: string;
}

interface ProjectGroup {
  title: string;
  items: PortfolioItem[];
}

const getSanityImageUrl = (imageField: any) => {
  if (!imageField?.asset) return undefined;
  try {
    return urlFor(imageField).url();
  } catch {
    return undefined;
  }
};

const staticPortfolioGroups: ProjectGroup[] = [
  {
    title: "MLDSPOT SBJT",
    items: [
      { id: 1, image: mld1, className: "md:col-span-2 md:row-span-2" },
      { id: 2, image: mld2, className: "md:col-span-1 md:row-span-1" },
      { id: 3, image: mld3, className: "md:col-span-1 md:row-span-1" },
      { id: 4, image: mld4, className: "md:col-span-1 md:row-span-1" },
      { id: 5, image: mld5, className: "md:col-span-1 md:row-span-1" },
      { id: 6, image: mld6, className: "md:col-span-1 md:row-span-1" },
    ]
  },
  {
    title: "BPH MIGAS",
    items: [
      { id: 7, image: bph1, className: "md:col-span-1 md:row-span-2" },
      { id: 8, image: bph2, className: "md:col-span-1 md:row-span-1" },
      { id: 9, image: bph3, className: "md:col-span-1 md:row-span-1" },
      { id: 10, image: bph4, className: "md:col-span-1 md:row-span-1" },
      { id: 11, image: bph5, className: "md:col-span-1 md:row-span-1" },
      { id: 12, image: bph6, className: "md:col-span-1 md:row-span-1" },
    ]
  },
  {
    title: "FIFA Office Grand Opening",
    items: [
      { id: 13, image: fifa1, className: "md:col-span-2 md:row-span-1" },
      { id: 14, image: fifa2, className: "md:col-span-1 md:row-span-1" },
      { id: 15, image: fifa3, className: "md:col-span-1 md:row-span-1" },
      { id: 16, image: fifa4, className: "md:col-span-1 md:row-span-1" },
      { id: 17, image: fifa5, className: "md:col-span-1 md:row-span-1" },
      { id: 18, image: fifa6, className: "md:col-span-1 md:row-span-1" },
    ]
  },
  {
    title: "Golf Friendly Tournament",
    items: [
      { id: 19, image: golf1, className: "md:col-span-1 md:row-span-2" },
      { id: 20, image: golf2, className: "md:col-span-2 md:row-span-1" },
      { id: 21, image: golf3, className: "md:col-span-1 md:row-span-1" },
      { id: 22, image: golf4, className: "md:col-span-1 md:row-span-1" },
      { id: 23, image: golf5, className: "md:col-span-1 md:row-span-1" },
      { id: 24, image: golf6, className: "md:col-span-1 md:row-span-1" },
    ]
  },
  {
    title: "ASDP Indonesia Ferry",
    items: [
      { id: 25, image: asdp1, className: "md:col-span-2 md:row-span-2" },
      { id: 26, image: asdp2, className: "md:col-span-1 md:row-span-1" },
      { id: 27, image: asdp3, className: "md:col-span-1 md:row-span-1" },
      { id: 28, image: asdp4, className: "md:col-span-1 md:row-span-1" },
      { id: 29, image: asdp5, className: "md:col-span-1 md:row-span-1" },
      { id: 30, image: asdp6, className: "md:col-span-1 md:row-span-1" },
    ]
  }
];

interface LightboxState {
  groupTitle: string;
  items: PortfolioItem[];
  index: number;
}

// ─── Lightbox Component ───────────────────────────────────────────────────────
const Lightbox = ({
  state,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: {
  state: LightboxState;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}) => {
  const item = state.items[state.index];
  const total = state.items.length;
  const src = item.url || item.image;

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 border border-pure-white/30 text-pure-white hover:bg-pure-white hover:text-primary-black transition-colors"
        aria-label="Close"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Counter + title */}
      <div className="absolute top-5 left-5 z-10 flex items-center gap-4">
        <span className="text-xs font-bold tracking-[0.3em] text-pure-white/60 uppercase">
          {state.groupTitle}
        </span>
        <span className="text-xs font-bold tracking-[0.3em] text-pure-white/40">
          {String(state.index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Prev button */}
      {total > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 z-10 flex items-center justify-center w-10 h-10 border border-pure-white/30 text-pure-white hover:bg-pure-white hover:text-primary-black transition-colors"
          aria-label="Previous"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Media */}
      <motion.div
        key={`${state.index}`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === 'video' && item.video ? (
          <video
            src={item.video}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            controls
            autoPlay
            playsInline
          />
        ) : (
          <img
            src={src}
            alt={`${state.groupTitle} ${state.index + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain select-none"
            draggable={false}
          />
        )}
      </motion.div>

      {/* Next button */}
      {total > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 z-10 flex items-center justify-center w-10 h-10 border border-pure-white/30 text-pure-white hover:bg-pure-white hover:text-primary-black transition-colors"
          aria-label="Next"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Thumbnail strip */}
      {total > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-2">
          {state.items.map((thumb, i) => {
            const thumbSrc = thumb.url || thumb.image;
            return (
              <button
                key={thumb.id}
                type="button"
                onClick={(e) => { e.stopPropagation(); onGoTo(i); }}
                className={cn(
                  "flex-shrink-0 w-12 h-12 overflow-hidden border-2 transition-all",
                  i === state.index ? "border-pure-white opacity-100" : "border-transparent opacity-40 hover:opacity-70"
                )}
                aria-label={`Go to image ${i + 1}`}
              >
                {thumb.type === 'video' ? (
                  <div className="w-full h-full bg-pure-white/10 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="text-pure-white">
                      <path d="M3 2L10 6L3 10V2Z"/>
                    </svg>
                  </div>
                ) : (
                  <img src={thumbSrc} alt="" className="w-full h-full object-cover" draggable={false} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

// ─── Main Portfolio Component ─────────────────────────────────────────────────
export const Portfolio = () => {
  const [dynamicGroups, setDynamicGroups] = useState<ProjectGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const groupsPerPage = 5;

  const openLightbox = useCallback((group: ProjectGroup, index: number) => {
    setLightbox({ groupTitle: group.title, items: group.items, index });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prevItem = useCallback(() => {
    setLightbox((prev) =>
      prev ? { ...prev, index: (prev.index - 1 + prev.items.length) % prev.items.length } : null
    );
  }, []);

  const nextItem = useCallback(() => {
    setLightbox((prev) =>
      prev ? { ...prev, index: (prev.index + 1) % prev.items.length } : null
    );
  }, []);

  const goToItem = useCallback((index: number) => {
    setLightbox((prev) => prev ? { ...prev, index } : null);
  }, []);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await adminService.fetchCollection('portfolio', 'createdAt');
        
        if (!data || data.length === 0) {
          setLoading(false);
          return;
        }

        const groups = data
          .map((item: any) => {
            const normalizedTitle =
              typeof item.title === 'string'
                ? item.title
                : item.title?.[0]?.children?.[0]?.text || item.category || 'Untitled Portfolio';

            const mediaItems: PortfolioItem[] = Array.isArray(item.mediaItems)
              ? item.mediaItems
                  .map((media: any, index: number) => {
                    const mimeType = typeof media?.mimeType === 'string' ? media.mimeType : '';
                    const isVideoByMime = mimeType.startsWith('video/');
                    const isVideoByLegacy =
                      media?.mediaType === 'video' || Boolean(media?.videoUrl || media?.video?.asset?.url);
                    const mediaType = isVideoByMime || isVideoByLegacy ? 'video' : 'image';
                    const mediaUrl =
                      media?.url || media?.imageUrl || media?.image?.asset?.url || getSanityImageUrl(media?.image);
                    const videoUrl = media?.url || media?.videoUrl || media?.video?.asset?.url;
                    return {
                      id: `${item.id}-${index}`,
                      url: mediaType === 'image' ? mediaUrl : undefined,
                      video: mediaType === 'video' ? videoUrl : undefined,
                      type: mediaType,
                      className: "md:col-span-1 md:row-span-1"
                    } as PortfolioItem;
                  })
                  .filter((media: PortfolioItem) => media.url || media.video)
              : [];

            const fallbackItems: PortfolioItem[] = mediaItems.length
              ? mediaItems
              : [
                  {
                    id: `${item.id}-legacy`,
                    url: item.url || item.imageUrl,
                    video: item.videoUrl || item.video?.asset?.url || item.video,
                    type: item.videoUrl || item.video ? ('video' as const) : ('image' as const),
                    className: "md:col-span-1 md:row-span-1"
                  }
                ].filter((media) => media.url || media.video);

            return {
              title: normalizedTitle,
              items: fallbackItems
            };
          })
          .filter((group: ProjectGroup) => group.items.length > 0);

        setDynamicGroups(groups);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const displayGroups = dynamicGroups.length > 0 ? dynamicGroups : staticPortfolioGroups;
  const totalPages = Math.max(1, Math.ceil(displayGroups.length / groupsPerPage));
  const paginatedGroups = displayGroups.slice(
    (currentPage - 1) * groupsPerPage,
    currentPage * groupsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [displayGroups.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-pure-white flex items-center justify-center">
        <div className="animate-pulse font-heading font-bold uppercase tracking-widest text-medium-gray">
          Loading Portfolio...
        </div>
      </div>
    );
  }

  return (
    <section id="portfolio" className="bg-pure-white py-32 overflow-hidden">
      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            state={lightbox}
            onClose={closeLightbox}
            onPrev={prevItem}
            onNext={nextItem}
            onGoTo={goToItem}
          />
        )}
      </AnimatePresence>
      <div className="container-custom">
        <div className="flex flex-col mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-7xl md:text-9xl font-heading font-bold uppercase tracking-tighter leading-none text-primary-black">
              Featured<br />Work
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="self-end mt-8 max-w-md text-right"
          >
            <p className="text-medium-gray uppercase tracking-widest text-xs font-bold leading-relaxed">
              Capturing moments across Indonesia. From premium weddings to corporate events and creative production.
            </p>
          </motion.div>
        </div>

        <div className="space-y-40">
          {paginatedGroups.map((group, groupIndex) => (
            <div key={`${group.title}-${groupIndex}`} className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6"
              >
                <span className="text-xs font-bold tracking-[0.5em] text-medium-gray">
                  {String((currentPage - 1) * groupsPerPage + groupIndex + 1).padStart(2, '0')}
                </span>
                <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tighter">{group.title}</h3>
                <div className="h-[1px] flex-grow bg-border-gray/50" />
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
                {group.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => openLightbox(group, index)}
                    className={cn(
                      "group relative bg-light-gray overflow-hidden cursor-pointer",
                      item.className
                    )}
                  >
                    {item.type === 'video' && item.video ? (
                      <video
                        src={item.video}
                        className="w-full h-full object-cover lg:grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-110"
                        muted
                        loop
                        playsInline
                        autoPlay
                      />
                    ) : (
                      <img
                        src={item.url || item.image}
                        alt={`${group.title} ${index + 1}`}
                        className="w-full h-full object-cover lg:grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-primary-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Expand icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-10 h-10 border border-pure-white flex items-center justify-center">
                        {item.type === 'video' ? (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="text-pure-white">
                            <path d="M3 2L12 7L3 12V2Z"/>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-pure-white">
                            <path d="M1 5V1H5M9 1H13V5M13 9V13H9M5 13H1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 border border-border-gray text-xs uppercase tracking-[0.2em] font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-black hover:text-pure-white transition-colors"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-10 h-10 text-xs font-bold border transition-colors",
                    page === currentPage
                      ? "bg-primary-black text-pure-white border-primary-black"
                      : "border-border-gray hover:bg-primary-black hover:text-pure-white"
                  )}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-5 py-2 border border-border-gray text-xs uppercase tracking-[0.2em] font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-black hover:text-pure-white transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
