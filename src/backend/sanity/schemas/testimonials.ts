export default {
  name: 'testimonials',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'role',
      title: 'Role/Position',
      type: 'string'
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Client Image',
      type: 'image',
      options: { hotspot: true }
    }
  ]
}
