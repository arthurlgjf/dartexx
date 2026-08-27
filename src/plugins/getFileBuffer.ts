import { readFile } from 'fs/promises'

export async function getFileBuffer(tempFilePath: string): Promise<Buffer> {
  return await readFile(tempFilePath)
}
