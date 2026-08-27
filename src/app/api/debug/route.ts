import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    tokenPrefix: process.env.BLOB_READ_WRITE_TOKEN?.substring(0, 15) || null,
    nodeEnv: process.env.NODE_ENV,
  })
}
