export default {
  name: 'clients',
  title: 'Client Logo',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      validation: (Rule: any) => Rule.required()
    }
  ]
}
