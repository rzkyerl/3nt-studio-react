import { client, urlFor } from '../../backend/sanity/client'

// Use Sanity's GROQ for fetching
export const fetchCollection = async (type: string, sortField: string = '_createdAt') => {
  // Mapping Firebase collection names to Sanity types if they differ
  const typeMap: Record<string, string> = {
    'portfolio': 'portfolio',
    'team': 'team',
    'services': 'services',
    'clients': 'clients',
    'testimonials': 'testimonials',
    'pricing': 'pricing'
  };

  const sanityType = typeMap[type] || type;
  const order = sortField === 'createdAt' ? '_createdAt' : sortField;
  
  const query = `*[_type == "${sanityType}"] | order(${order} desc) {
    ...,
    "videoUrl": video.asset->url,
    "fileUrl": file.asset->url,
    "mediaItems": mediaItems[]{
      ...,
      "url": asset->url,
      "mimeType": asset->mimeType,
      "imageUrl": image.asset->url,
      "videoUrl": video.asset->url
    },
    "productionEcosystemCards": productionEcosystemCards[]{
      ...,
      "imageUrl": image.asset->url
    }
  }`;
  const data = await client.fetch(query);
  
  // Transform Sanity image references to URLs
  return data.map((item: any) => ({
    ...item,
    id: item._id,
    // Try to auto-resolve images if they exist
    url: item.image ? urlFor(item.image).url() : item.url,
    imageUrl: item.image ? urlFor(item.image).url() : item.imageUrl,
    logoUrl: item.logo ? urlFor(item.logo).url() : item.logoUrl
  }));
};

export const getDocument = async (type: string, docId: string) => {
  // Specifically for content/home mapping
  if (type === 'content' && docId === 'home') {
    const query = `*[_type == "homeContent"][0]`;
    const data = await client.fetch(query);
    if (!data) return null;
    
    return {
      ...data,
      id: data._id,
      heroImageUrl: data.heroImage ? urlFor(data.heroImage).url() : '',
      aboutImageUrl: data.aboutImage ? urlFor(data.aboutImage).url() : ''
    };
  }

  const query = `*[_id == "${docId}"][0]`;
  const data = await client.fetch(query);
  return data ? { ...data, id: data._id } : null;
};

// These are no longer needed for writing since Sanity Studio handles it, 
// but keeping empty stubs to avoid breaking imports if they exist elsewhere
export const uploadToCloudinary = async (_file: File) => { return { url: '', publicId: '' } };
export const updateDocument = async (_colName: string, _id: string, _data: any) => {};
export const addDocument = async (_colName: string, _data: any) => {};
export const deleteDocument = async (_colName: string, _id: string) => {};
export const setDocument = async (_colName: string, _docId: string, _data: any) => {};
