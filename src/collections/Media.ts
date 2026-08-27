import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Obsah',
  },
  labels: {
    singular: 'Médium',
    plural: 'Médiá',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      label: 'Alternatívny popis',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
