import type { CollectionConfig } from 'payload'

export const References: CollectionConfig = {
  slug: 'references',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'event', '_status'],
    group: 'Obsah',
  },
  labels: {
    singular: 'Referencia',
    plural: 'Referencie',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'quote',
      label: 'Citácia',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      label: 'Autor / firma',
      type: 'text',
      required: true,
    },
    {
      name: 'event',
      label: 'Typ podujatia alebo pozícia',
      type: 'text',
      admin: {
        description: 'Napr. „firemná párty“ alebo „HR manažérka, XYZ s.r.o.“ — vyplňte len to, čo môžeme zverejniť.',
      },
    },
    {
      name: 'photo',
      label: 'Fotografia z podujatia',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
