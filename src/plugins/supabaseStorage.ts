import type { Plugin } from 'payload'
import path from 'path'
import { v4 as uuid } from 'crypto'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wviiitawbfhidbqnenaa.supabase.co'
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || ''
const BUCKET = 'media'

async function uploadToSupabase(file: File | Buffer, filename: string): Promise<string> {
  const ext = path.extname(filename)
  const storagePath = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`

  const formData = new FormData()
  formData.append('file', new Blob([file instanceof Buffer ? new Uint8Array(file) : file]), filename)

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${storagePath}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: formData,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase upload failed: ${res.status} ${text}`)
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`
}

export function supabaseStoragePlugin(): Plugin {
  return (config) => ({
    ...config,
    collections: (config.collections || []).map((collection) => {
      if (collection.slug !== 'media') return collection

      return {
        ...collection,
        hooks: {
          ...collection.hooks,
          afterChange: [
            ...(collection.hooks?.afterChange || []),
            async ({ doc, operation, req }) => {
              if (operation !== 'create' && operation !== 'update') return doc
              return doc
            },
          ],
        },
      }
    }),
  })
}
