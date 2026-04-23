import PortfolioMediaArrayInput from '../../components/PortfolioMediaArrayInput'

export default {
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'mediaItems',
      title: 'Upload Images or Videos',
      type: 'array',
      components: {
        input: PortfolioMediaArrayInput
      },
      of: [
        {
          type: 'file',
          options: { accept: 'image/*,video/*' },
          preview: {
            select: {
              fileName: 'asset.originalFilename',
              mimeType: 'asset.mimeType'
            },
            prepare({ fileName, mimeType }: any) {
              const isVideo = typeof mimeType === 'string' && mimeType.startsWith('video/')
              return {
                title: fileName || (isVideo ? 'Video file' : 'Image file'),
                subtitle: isVideo ? 'Video' : 'Image'
              }
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.required().min(1)
    }
  ],
  preview: {
    select: {
      title: 'title',
      mediaFromItems: 'mediaItems.0'
    },
    prepare({ title, mediaFromItems }: any) {
      return {
        title,
        media: mediaFromItems
      }
    }
  }
}
