export default {
  name: 'pricing',
  title: 'Pricing',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Package Title',
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
      name: 'subtitle',
      title: 'Subtitle',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Photobooth', value: 'Photobooth' },
          { title: 'Multicam', value: 'Multicam' },
          { title: 'Matrix', value: 'Matrix' },
          { title: 'Broadcast', value: 'Broadcast' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'prices',
      title: 'Prices',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'price', title: 'Price', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number'
    }
  ],
  preview: {
    select: {
      title: 'title.0.children.0.text',
      subtitle: 'category'
    }
  }
}
