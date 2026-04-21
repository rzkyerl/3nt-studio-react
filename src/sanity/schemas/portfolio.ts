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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'MLDSPOT', value: 'MLDSPOT' },
          { title: 'BPH MIGAS', value: 'BPH MIGAS' },
          { title: 'FIFA', value: 'FIFA' },
          { title: 'GOLF', value: 'GOLF' },
          { title: 'ASDP', value: 'ASDP' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ]
}
