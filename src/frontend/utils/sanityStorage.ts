import { client } from '../../backend/sanity/client';

export const uploadBookingPDFToSanity = async (pdfBlob: Blob, fileName: string): Promise<string> => {
  try {
    // 1. Upload the PDF as a 'file' asset to Sanity
    const asset = await client.assets.upload('file', pdfBlob, {
      filename: fileName,
      contentType: 'application/pdf',
    });

    // 2. Return the asset URL
    // Sanity asset objects have a 'url' property after upload
    return asset.url;
  } catch (error) {
    console.error('Error uploading PDF to Sanity:', error);
    throw error;
  }
};
