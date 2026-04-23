export default {
  name: 'services',
  title: 'Services Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: '3NT Studio Production Services',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Production for Wedding, Corporate, Concert & Live Streaming',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Desc',
      type: 'text',
      rows: 3,
      initialValue:
        'Flexible production solutions for events of all sizes — from intimate weddings to large-scale productions.',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'trustedFor',
      title: 'Trusted For',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'productionEcosystemCards',
      title: 'Production Ecosystem Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'productionEcosystemCard',
          title: 'Card',
          fields: [
            {
              name: 'title',
              title: 'Title Card',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Desc Card',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'image',
              title: 'Images Card',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image'
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'featureList',
      title: 'FeatureList',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'serviceFeatureItem',
          title: 'Feature Item',
          fields: [
            {
              name: 'title',
              title: 'Title FeatureList',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Desc FeatureList',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'startingFrom',
              title: 'Starting From',
              type: 'string'
            },
            {
              name: 'package',
              title: 'Package',
              type: 'string'
            },
            {
              name: 'price',
              title: 'Price',
              type: 'string'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'price'
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle'
    }
  }
}
