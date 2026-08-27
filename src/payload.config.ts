import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sk } from '@payloadcms/translations/languages/sk'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { References } from './collections/References'
import { SiteSettings } from './globals/SiteSettings'
import { Process } from './globals/Process'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const resendEmail = nodemailerAdapter({
  defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
  defaultFromName: process.env.RESEND_FROM_NAME || 'Automaty na podujatia',
  // Surface auth/connection issues at send time instead of blocking server boot.
  skipVerify: true,
  transportOptions: {
    host: process.env.SMTP_HOST || 'smtp.resend.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: {
      user: 'resend',
      pass: process.env.RESEND_API_KEY,
    },
  },
})

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Products, References],
  globals: [SiteSettings, Process],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      max: 5,
      ssl: { rejectUnauthorized: false },
    },
    push: true,
  }),
  email: process.env.RESEND_API_KEY ? resendEmail : undefined,
  i18n: {
    supportedLanguages: { sk },
    fallbackLanguage: 'sk',
  },
  localization: {
    locales: ['sk'],
    fallback: true,
    defaultLocale: 'sk',
  },
  sharp,
  plugins: [
    formBuilderPlugin({
      fields: {
        checkbox: true,
        email: true,
        message: true,
        number: true,
        select: true,
        text: true,
        textarea: true,
        country: false,
        date: false,
        state: false,
        payment: false,
      },
      formOverrides: {
        labels: {
          singular: 'Formulár',
          plural: 'Formuláre',
        },
      },
      formSubmissionOverrides: {
        labels: {
          singular: 'Odoslaný formulár',
          plural: 'Odoslané formuláre',
        },
      },
    }),
  ],
})
