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
  upload: {
    staticDir: process.env.VERCEL ? '/tmp/media' : 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 600,
        height: 400,
        position: 'centre',
      },
    ],
  },
}
