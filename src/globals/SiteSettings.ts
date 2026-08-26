import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Nastavenia',
  },
  label: 'Nastavenie webu',
  fields: [
    {
      name: 'siteName',
      label: 'Názov webu / firmy',
      type: 'text',
      admin: {
        description: 'Zobrazuje sa v hlavičke a pätičke. Skutočné logo nahradíme, keď bude dodané.',
      },
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Kontakt',
          fields: [
            {
              name: 'phone',
              label: 'Telefón',
              type: 'text',
            },
            {
              name: 'email',
              label: 'E-mail',
              type: 'email',
            },
            {
              name: 'address',
              label: 'Adresa',
              type: 'text',
            },
          ],
        },
        {
          label: 'Firma & sociálne siete',
          fields: [
            {
              name: 'companyName',
              label: 'Oficiálny názov firmy',
              type: 'text',
            },
            {
              name: 'ico',
              label: 'IČO',
              type: 'text',
            },
            {
              name: 'facebook',
              label: 'Facebook',
              type: 'text',
            },
            {
              name: 'instagram',
              label: 'Instagram',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
