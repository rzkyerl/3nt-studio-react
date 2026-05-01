/**
 * Sanity CMS service for admin CRUD operations.
 * Uses the authenticated Sanity client (with token) for all reads and writes.
 */
import { client, urlFor } from '../../sanity/client';

// ─── Asset Upload ─────────────────────────────────────────────────────────────

/** Upload an image file and return the Sanity asset reference object */
export const uploadImage = async (file: File) => {
  const asset = await client.assets.upload('image', file, { filename: file.name });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
};

/** Upload a video/file and return the download URL */
export const uploadFile = async (file: File): Promise<{ url: string; assetId: string }> => {
  const asset = await client.assets.upload('file', file, { filename: file.name });
  return { url: asset.url, assetId: asset._id };
};

/** Resolve a Sanity image reference to a URL */
export const imageUrl = (source: any): string => {
  if (!source) return '';
  if (typeof source === 'string') return source;
  try { return urlFor(source).url(); } catch { return ''; }
};

// ─── Generic document helpers ─────────────────────────────────────────────────

export const fetchCollection = async (type: string): Promise<any[]> => {
  const query = `*[_type == "${type}"] | order(_createdAt desc) {
    ...,
    "imageUrl": image.asset->url,
    "logoUrl": logo.asset->url,
    "videoUrl": video.asset->url
  }`;
  const docs = await client.fetch(query);
  return docs.map((d: any) => ({ ...d, id: d._id }));
};

export const fetchSingletonDoc = async (type: string): Promise<any | null> => {
  const query = `*[_type == "${type}"][0]`;
  const doc = await client.fetch(query);
  return doc ? { ...doc, id: doc._id } : null;
};

export const createDoc = async (type: string, data: Record<string, any>): Promise<string> => {
  const doc = await client.create({ _type: type, ...data });
  return doc._id;
};

export const updateDoc = async (id: string, data: Record<string, any>): Promise<void> => {
  await client.patch(id).set(data).commit();
};

export const deleteDoc = async (id: string): Promise<void> => {
  await client.delete(id);
};

export const upsertSingleton = async (type: string, id: string, data: Record<string, any>): Promise<void> => {
  await client.createOrReplace({ _type: type, _id: id, ...data });
};

// ─── Media collection helpers ─────────────────────────────────────────────────

/** Fetch all media items from a collection, resolving asset URLs */
export const fetchMediaCollection = async (type: string): Promise<any[]> => {
  const query = `*[_type == "${type}"] | order(_createdAt desc) {
    _id,
    name,
    mediaType,
    "url": coalesce(image.asset->url, file.asset->url)
  }`;
  const docs = await client.fetch(query);
  return docs.map((d: any) => ({ ...d, id: d._id }));
};

/** Add an image media item */
export const addImageMedia = async (
  type: string,
  file: File
): Promise<{ id: string; url: string; name: string; mediaType: string }> => {
  const asset = await client.assets.upload('image', file, { filename: file.name });
  const doc = await client.create({
    _type: type,
    name: file.name,
    mediaType: 'image',
    image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
  });
  return { id: doc._id, url: asset.url, name: file.name, mediaType: 'image' };
};

/** Add a video/file media item */
export const addFileMedia = async (
  type: string,
  file: File
): Promise<{ id: string; url: string; name: string; mediaType: string }> => {
  const asset = await client.assets.upload('file', file, { filename: file.name });
  const doc = await client.create({
    _type: type,
    name: file.name,
    mediaType: 'video',
    file: { _type: 'file', asset: { _type: 'reference', _ref: asset._id } },
  });
  return { id: doc._id, url: asset.url, name: file.name, mediaType: 'video' };
};
