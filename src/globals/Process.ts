import type { GlobalConfig } from 'payload'

export const Process: GlobalConfig = {
  slug: 'process',
  admin: {
    description:
      'Kroky sa zobrazujú v sekcii „Ako to funguje“. Ak sú prázdne, použijú sa predvolené kroky.',
    group: 'Obsah',
  },
  label: 'Ako to funguje',
  fields: [
    {
      name: 'steps',
      label: 'Kroky',
      type: 'array',
      labels: {
        singular: 'Krok',
        plural: 'Kroky',
      },
      fields: [
        {
          name: 'title',
          label: 'Nadpis',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Popis',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
