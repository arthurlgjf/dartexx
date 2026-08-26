import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', '_status'],
    group: 'Obsah',
    description:
      'Automaty a zábavné stroje na prenájom. Konkrétny sortiment dopĺňajte postupne podľa reálnej ponuky.',
  },
  labels: {
    singular: 'Automat',
    plural: 'Automaty',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      label: 'Názov',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'URL slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Používa sa pre URL adresy, napr. /automaty/air-hockey',
      },
    },
    {
      name: 'category',
      label: 'Kategória',
      type: 'text',
      admin: {
        description: 'Voliteľné — napr. „Športové automaty“, „Stolové hry“.',
      },
    },
    {
      name: 'excerpt',
      label: 'Krátky popis',
      type: 'textarea',
    },
    {
      name: 'description',
      label: 'Detailný popis',
      type: 'richText',
    },
    {
      name: 'price',
      label: 'Cena',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Základná cena prenájmu (bez DPH, ak je uvedená aj mena).',
      },
    },
    {
      name: 'image',
      label: 'Hlavná fotografia',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      label: 'Galéria (ďalšie fotografie)',
      type: 'array',
      labels: {
        singular: 'Fotografia',
        plural: 'Fotografie',
      },
      fields: [
        {
          name: 'image',
          label: 'Fotografia',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'videoUrl',
      label: 'URL videa',
      type: 'text',
      admin: {
        description: 'Voliteľné — priamy odkaz na video (MP4), zobrazí sa v galérii detailu.',
      },
    },
    {
      type: 'group',
      name: 'specs',
      label: 'Technické parametre',
      fields: [
        {
          name: 'dimensions',
          label: 'Rozmery',
          type: 'text',
        },
        {
          name: 'weight',
          label: 'Hmotnosť',
          type: 'text',
        },
        {
          name: 'power',
          label: 'Napájanie',
          type: 'text',
        },
        {
          name: 'players',
          label: 'Počet hráčov',
          type: 'text',
        },
        {
          name: 'space',
          label: 'Odporúčaný priestor',
          type: 'text',
        },
        {
          name: 'notes',
          label: 'Ďalšie informácie',
          type: 'textarea',
        },
      ],
    },
  ],
}
