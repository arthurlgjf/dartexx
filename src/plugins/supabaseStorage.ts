import type { Plugin } from 'payload'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { getFileBuffer } from './getFileBuffer'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wviiitawbfhidbqnenaa.supabase.co'
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || ''
const BUCKET = 'media'

export const supabaseStorage = (): Plugin => {
  return (incomingConfig) => {
    const adapter = ({ prefix = '' }: { prefix?: string }) => ({
      name: 'supabase',
      generateURL: ({ filename, prefix: urlPrefix = '' }: { filename: string; prefix?: string }) => {
        const path = `${prefix}${urlPrefix}${filename}`
        return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`
      },
      handleDelete: async ({ doc, filename }: { doc: { prefix?: string }; filename: string }) => {
        const path = `${doc.prefix || ''}${filename}`
        await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        })
      },
      handleUpload: async ({ data, file }: { data: { prefix?: string }; file: any }) => {
        const path = `${data.prefix || ''}${file.filename}`
        const buffer = file.buffer || (file.tempFilePath ? await getFileBuffer(file.tempFilePath) : null)
        if (!buffer) throw new Error('No file buffer available for upload')

        const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': file.mimeType || 'application/octet-stream',
            'x-upsert': 'true',
          },
          body: buffer,
        })

        if (!res.ok) {
          const text = await res.text()
          throw new Error(`Supabase upload failed: ${res.status} ${text}`)
        }
        return data
      },
    })

    return cloudStoragePlugin({
      collections: {
        media: {
          adapter: adapter as any,
        },
      },
      enabled: Boolean(SUPABASE_ANON_KEY),
    })(incomingConfig)
  }
}
