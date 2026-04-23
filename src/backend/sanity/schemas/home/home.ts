export default {
  name: 'homeContent',
  title: 'Home Content',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ]
          }
        }
      ]
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
            annotations: []
          }
        }
      ]
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'heroVideoUrl',
      title: 'Hero Video URL',
      type: 'url'
    },
    {
      name: 'aboutTitle',
      title: 'About Title',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ]
          }
        }
      ]
    },
    {
      name: 'aboutText1',
      title: 'About Description 1',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'aboutText2',
      title: 'About Description 2',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'aboutImage',
      title: 'About Image',
      type: 'image',
      options: { hotspot: true }
    }
  ],
  preview: {
    select: {
      title: 'heroSubtitle',
      media: 'heroImage'
    }
  }
}
