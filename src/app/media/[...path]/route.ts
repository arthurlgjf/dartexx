import type { NextRequest } from 'next/server'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wviiitawbfhidbqnenaa.supabase.co'
const BUCKET = 'media'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params
  const key = path.map((segment) => encodeURIComponent(segment)).join('/')

  if (key.includes('..') || key.startsWith('/') || key.length === 0) {
    return new Response('Not found', { status: 404 })
  }

  const upstream = await fetch(`${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${key}`)
  if (!upstream.ok || !upstream.body) {
    return new Response('Not found', { status: 404 })
  }

  const contentType = upstream.headers.get('content-type') || 'application/octet-stream'
  const headers = new Headers()
  headers.set('Content-Type', contentType)
  headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  if (contentType === 'image/svg+xml') {
    headers.set('Content-Security-Policy', "script-src 'none'")
  }

  return new Response(upstream.body, { status: 200, headers })
}
