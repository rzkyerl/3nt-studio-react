/**
 * pricingData.ts
 * ─────────────────────────────────────────────────────────────
 * Single source of truth for ALL pricing data.
 * Used by:
 *   - Services.tsx  (accordion overview on /pricing)
 *   - services/Photobooth.tsx, EventProduction.tsx, etc. (detail pages)
 *
 * When you update a price here, it updates in BOTH places automatically.
 */

// ─── Shared Types ─────────────────────────────────────────────

export type PriceItem = { label: string; price: string; duration?: string };
export type IncludeGroup = { title: string; items: string[] };
export type PackageGroup = { title: string; items: PriceItem[] };
export type AddOnItem = { label: string; price: string };

// ─── PHOTOBOOTH ───────────────────────────────────────────────

export const photoboothStartingPrice = 'Rp 3.300.000';

export const photoboothClassicUnlimited: PriceItem[] = [
  { label: '2 Hours', price: 'Rp 3.500.000' },
  { label: '3 Hours', price: 'Rp 4.500.000' },
  { label: '4 Hours', price: 'Rp 5.500.000' },
  { label: '6 Hours', price: 'Rp 6.500.000' },
  { label: '8 Hours', price: 'Rp 7.500.000' },
  { label: '10 Hours', price: 'Rp 8.500.000' },
];

export const photoboothClassicLimited: PriceItem[] = [
  { label: '100 Prints', price: 'Rp 3.300.000' },
  { label: '200 Prints', price: 'Rp 3.800.000' },
  { label: '300 Prints', price: 'Rp 4.300.000' },
  { label: '400 Prints', price: 'Rp 4.800.000' },
  { label: '500 Prints', price: 'Rp 5.300.000' },
  { label: '600 Prints', price: 'Rp 5.800.000' },
  { label: '700 Prints', price: 'Rp 6.300.000' },
  { label: '1000 Prints', price: 'Rp 8.800.000' },
];

export const photoboothClassicAddOns: AddOnItem[] = [
  { label: 'Greenscreen Setup', price: 'Rp 2.500.000' },
];

export const photoboothClassicIncludes: IncludeGroup[] = [
  { title: 'Man Power', items: ['1 Director Photography', '1 Crew Runner'] },
  { title: 'Equipment', items: ['Monitor 24 inch Touchscreen', 'Props Photobooth', 'Lighting Godox SL200'] },
  { title: 'Device', items: ['Canon Camera', 'Laptop', 'Sharing Station'] },
  { title: 'Output', items: ['Animated GIF', 'Photo Print', 'Overlay Template', 'Frame Photo Standard'] },
];

export const photoboothKeliling: PriceItem[] = [
  { label: '2 Hours', price: 'Rp 6.000.000' },
  { label: '3 Hours', price: 'Rp 6.500.000' },
  { label: '4 Hours', price: 'Rp 7.000.000' },
  { label: '6 Hours', price: 'Rp 8.000.000' },
  { label: '8 Hours', price: 'Rp 9.000.000' },
  { label: '10 Hours', price: 'Rp 10.000.000' },
];

export const photoboothKelilingIncludes: IncludeGroup[] = [
  { title: 'Man Power', items: ['1 Professional Photographer', '2 Crew Runner'] },
  { title: 'Device', items: ['Laptop Legion', 'Sharing Station'] },
  { title: 'Equipment', items: ['Sony A7 Mark IV', 'Wireless Router', 'Flash External'] },
  { title: 'Output', items: ['Photo Print Hires', 'Overlay / Template', 'Frame Photo Standard'] },
];

export const photobooth360: PriceItem[] = [
  { label: '2 Hours', price: 'Rp 4.500.000' },
  { label: '3 Hours', price: 'Rp 5.500.000' },
  { label: '4 Hours', price: 'Rp 6.500.000' },
  { label: '6 Hours', price: 'Rp 7.500.000' },
  { label: '8 Hours', price: 'Rp 8.500.000' },
  { label: '10 Hours', price: 'Rp 9.500.000' },
];

export const photobooth360AddOns: AddOnItem[] = [
  { label: 'Greenscreen Setup', price: 'Rp 2.500.000' },
  { label: 'Greenscreen Content Template', price: 'Rp 1.000.000' },
  { label: 'Greenscreen Content Custom by KV', price: 'Custom' },
];

export const photobooth360Includes: IncludeGroup[] = [
  { title: 'Man Power', items: ['1 Director Photography', '1 Crew Runner', '1 Crew Sharing Station'] },
  { title: 'Equipment', items: ['TV 43 Preview', 'Props Photobooth', 'Lighting Godox SL200 / TL120', 'Spin Diameter 90cm / 100cm / 120cm'] },
  { title: 'Device', items: ['GoPro Camera', 'Laptop Legion RTX 3060', 'Sharing Station'] },
];

export const photoboothMatrix180: PriceItem[] = [
  { label: '8 Cameras', price: 'Rp 8.500.000' },
  { label: '10 Cameras', price: 'Rp 10.500.000' },
  { label: '12 Cameras', price: 'Rp 12.000.000' },
  { label: '16 Cameras', price: 'Rp 14.000.000' },
];

export const photoboothMatrix180AddOns: AddOnItem[] = [
  { label: 'Unlimited Photo 4R Print', price: 'Rp 3.500.000' },
];

export const photoboothMatrix180Includes: IncludeGroup[] = [
  { title: 'Man Power', items: ['1 Director Photography', '2 Crew Runner'] },
  { title: 'Equipment', items: ['Tripod Camera', 'Lighting Godox SL200', 'TV Preview 43 inch'] },
  { title: 'Device', items: ['Canon Camera', 'Laptop Legion RTX 3060', 'Sharing Station'] },
  { title: 'Output', items: ['Video Matrix / Boomerang', 'Overlay / Template'] },
];

/** Summary packages for accordion overview in Services.tsx */
export const photoboothPackageGroups: PackageGroup[] = [
  {
    title: 'Classic Unlimited',
    items: [
      { label: '2 Hours', price: 'Rp 3.500.000' },
      { label: '3 Hours', price: 'Rp 4.500.000' },
      { label: '4 Hours', price: 'Rp 5.500.000' },
    ],
  },
  {
    title: 'Classic Limited Print',
    items: [
      { label: '100 Prints', price: 'Rp 3.300.000' },
      { label: '200 Prints', price: 'Rp 3.800.000' },
    ],
  },
  {
    title: '360 Videobooth',
    items: [
      { label: '2 Hours', price: 'Rp 4.500.000' },
      { label: '4 Hours', price: 'Rp 6.500.000' },
    ],
  },
  {
    title: 'Matrix 180',
    items: [
      { label: '8 Cameras', price: 'Rp 8.500.000' },
      { label: '12 Cameras', price: 'Rp 12.000.000' },
    ],
  },
];

// ─── MULTICAM / EVENT PRODUCTION ──────────────────────────────

export const multicamStartingPrice = 'Rp 3.500.000';

export const multicamFX6: PriceItem[] = [
  { label: '1 Camera', price: 'Rp 5.000.000' },
  { label: '2 Cameras', price: 'Rp 10.000.000' },
  { label: '3 Cameras', price: 'Rp 15.000.000' },
  { label: '4 Cameras', price: 'Rp 20.000.000' },
];

export const multicamFX6Equipment: string[] = [
  'Sony FX6 Cinema 4K',
  'Blackmagic ATEM Switcher',
  'Television Studio Pro 4K',
  'Blackmagic Recorder',
  'Audio Mixer',
  'Tripod Camera',
  'Clearcom Wireless',
  'Cabling System',
];

export const multicamZ190: PriceItem[] = [
  { label: '1 Camera', price: 'Rp 3.500.000' },
  { label: '2 Cameras', price: 'Rp 6.500.000' },
  { label: '3 Cameras', price: 'Rp 10.000.000' },
  { label: '4 Cameras', price: 'Rp 12.000.000' },
];

export const multicamZ190Equipment: string[] = [
  'Sony PXW Z190',
  'Blackmagic ATEM Studio',
  'Blackmagic Hyperdeck 4K',
  'Audio Mixer',
  'Tripod Camera',
  'Clearcom Wireless',
  'Cabling System',
];

export const multicamNX5R: PriceItem[] = [
  { label: '1 Camera', price: 'Rp 3.500.000' },
  { label: '2 Cameras', price: 'Rp 6.500.000' },
  { label: '3 Cameras', price: 'Rp 10.000.000' },
  { label: '4 Cameras', price: 'Rp 12.000.000' },
];

export const multicamNX5REquipment: string[] = [
  'Sony NX5R',
  'Data Video Switcher',
  'Blackmagic Recorder',
  'Audio Mixer',
  'Tripod Camera',
  'Clearcom Wireless',
  'Cabling System',
];

export const multicamPackageGroups: PackageGroup[] = [
  { title: 'FX6 Cinema 4K', items: multicamFX6.slice(0, 3) },
  { title: 'Sony Z190', items: multicamZ190.slice(0, 2) },
  { title: 'Sony NX5R', items: multicamNX5R.slice(0, 2) },
];

// ─── DRONE / AERIAL ───────────────────────────────────────────

export const droneStartingPrice = 'Rp 850.000';

export type DroneCategoryData = { title: string; drone: string; items: PriceItem[] };

export const droneCategories: DroneCategoryData[] = [
  {
    title: 'Drone Basic',
    drone: 'DJI Mavic Pro / DJI Mini 3',
    items: [
      { label: 'Basic 1', price: 'Rp 1.200.000', duration: 'Max 3 Jam' },
      { label: 'Basic 2', price: 'Rp 1.700.000', duration: 'Max 6 Jam' },
      { label: 'Basic Full', price: 'Rp 2.700.000', duration: '12 Jam' },
    ],
  },
  {
    title: 'Drone Gold',
    drone: 'DJI Mavic 2 Pro / Zoom',
    items: [
      { label: 'Gold 1', price: 'Rp 850.000', duration: '1 Jam' },
      { label: 'Gold 2', price: 'Rp 1.250.000', duration: '3 Jam' },
      { label: 'Gold 3', price: 'Rp 1.900.000', duration: '6 Jam' },
      { label: 'Gold Full', price: 'Rp 2.500.000', duration: '1 Hari' },
    ],
  },
  {
    title: 'Drone Platinum',
    drone: 'DJI Mavic 3',
    items: [
      { label: 'Platinum 1', price: 'Rp 1.500.000', duration: '1 Jam' },
      { label: 'Platinum 2', price: 'Rp 2.500.000', duration: '3 Jam' },
      { label: 'Platinum 3', price: 'Rp 3.500.000', duration: '6 Jam' },
      { label: 'Platinum Full', price: 'Rp 4.500.000', duration: '1 Hari' },
    ],
  },
  {
    title: 'Drone Premium',
    drone: 'DJI Mavic 4 Pro',
    items: [{ label: 'Platinum Premium Full', price: 'Rp 5.500.000' }],
  },
  {
    title: 'Drone Live Cam',
    drone: '-',
    items: [
      { label: 'Drone Live Cam 1', price: 'Rp 3.700.000' },
      { label: 'Drone Live Cam 2', price: 'Rp 5.000.000' },
    ],
  },
  {
    title: 'Drone FPV',
    drone: '-',
    items: [
      { label: 'Drone FPV', price: 'Rp 2.500.000' },
      { label: 'Drone FPV Live Cam', price: 'Rp 3.500.000' },
    ],
  },
];

export const dronePackageGroups: PackageGroup[] = [
  {
    title: 'Drone Packages',
    items: [
      { label: 'Drone Basic', price: 'Rp 1.200.000' },
      { label: 'Drone Gold', price: 'Rp 850.000' },
      { label: 'Drone Platinum', price: 'Rp 1.500.000' },
      { label: 'Drone Premium', price: 'Rp 5.500.000' },
      { label: 'Drone FPV', price: 'Rp 2.500.000' },
    ],
  },
];

// ─── DOCUMENTATION ────────────────────────────────────────────

export const documentationStartingPrice = 'Rp 2.500.000';

export const documentationPhoto: PriceItem[] = [
  { label: '1 Photographer', price: 'Rp 2.500.000' },
  { label: '2 Photographer', price: 'Rp 4.500.000' },
];

export const documentationVideo: PriceItem[] = [
  { label: '1 Videographer', price: 'Rp 4.500.000' },
  { label: '2 Videographer', price: 'Rp 6.500.000' },
];

export const documentationGear: string[] = [
  'Sony A7 Mark IV',
  'Camera Lens',
  'Flash / External Lighting',
];

export const documentationPackageGroups: PackageGroup[] = [
  { title: 'Photo Documentation', items: documentationPhoto },
  { title: 'Video Documentation', items: documentationVideo },
];

// ─── BROADCAST & STREAMING ────────────────────────────────────

export const broadcastStartingPrice = 'Rp 2.500.000';

export const broadcastPackages: PriceItem[] = [
  { label: 'VMIX + VJ', price: 'Rp 2.500.000' },
  { label: 'Laptop Resolume + VJ', price: 'Rp 3.500.000' },
  { label: 'PC Resolume + VJ', price: 'Rp 5.500.000' },
  { label: 'Hybrid System', price: 'Rp 8.500.000' },
  { label: 'Streaming Social Media', price: 'Rp 5.500.000' },
];

export const broadcastPackageGroups: PackageGroup[] = [
  { title: 'Streaming Systems', items: broadcastPackages },
];

// ─── TELEPROMPTER ─────────────────────────────────────────────

export const teleprompterStartingPrice = 'Rp 1.500.000';

export const teleprompterPackages: PriceItem[] = [
  { label: 'Teleprompter 6 Jam', price: 'Rp 1.500.000' },
  { label: 'Teleprompter 1 Hari', price: 'Rp 2.500.000' },
];

export const teleprompterIncludes: string[] = ['Laptop', 'Prompter Kit', 'HDMI Cable', 'Operator'];

export const teleprompterPackageGroups: PackageGroup[] = [
  { title: 'Rental Packages', items: teleprompterPackages },
];
