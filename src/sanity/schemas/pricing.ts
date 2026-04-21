export default {
  name: 'pricing',
  title: 'Pricing',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Package Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
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
  ]
}
