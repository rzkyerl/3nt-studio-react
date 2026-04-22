export default {
  name: 'services',
  title: 'Service Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title.0.children.0.text',
      media: 'image'
    }
  }
}
