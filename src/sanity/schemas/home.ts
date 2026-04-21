export default {
  name: 'homeContent',
  title: 'Home Content',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'text',
      rows: 3
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string'
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
      type: 'string'
    },
    {
      name: 'aboutText1',
      title: 'About Description 1',
      type: 'text',
      rows: 5
    },
    {
      name: 'aboutText2',
      title: 'About Description 2',
      type: 'text',
      rows: 5
    },
    {
      name: 'aboutImage',
      title: 'About Image',
      type: 'image',
      options: { hotspot: true }
    }
  ]
}
