import { useEffect, useState } from 'react';
import { client } from '../../backend/sanity/client';

// ─── Types ─────────────────────────────────────────────────────

export interface PriceItem  { label: string; price: string }
export interface PackageGroup { title: string; items: PriceItem[] }
export interface FeatureGroup { title: string; items: string[] }
export interface AddOnItem   { label: string; price: string }

export interface PricingService {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  startingPrice?: string;
  order?: number;
  isActive: boolean;
  imageUrl?: string;
  packageGroups: PackageGroup[];
  features: FeatureGroup[];
  addOns: AddOnItem[];
}

// ─── Hook ──────────────────────────────────────────────────────

const QUERY = `*[_type == "pricingService" && isActive == true] | order(order asc) {
  _id, name, slug, description, startingPrice, order, isActive,
  "imageUrl": image.asset->url,
  packageGroups[]{ title, items[]{ label, price } },
  features[]{ title, items },
  addOns[]{ label, price }
}`;

export function usePricingServices() {
  const [data, setData] = useState<PricingService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await client.fetch(QUERY);
        if (!cancelled) setData(result || []);
      } catch (err: any) {
        if (!cancelled) setError(err?.message || 'Failed to fetch pricing');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

/**
 * Fetch a single pricing service by slug.
 * Returns null while loading or if not found.
 */
export function usePricingServiceBySlug(slug: string) {
  const [data, setData] = useState<PricingService | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await client.fetch(
          `*[_type == "pricingService" && slug == $slug][0] {
            _id, name, slug, description, startingPrice, order, isActive,
            "imageUrl": image.asset->url,
            packageGroups[]{ title, items[]{ label, price } },
            features[]{ title, items },
            addOns[]{ label, price }
          }`,
          { slug }
        );
        if (!cancelled) setData(result || null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  return { data, loading };
}
