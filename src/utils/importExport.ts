import type { Design, ExportEnvelope } from '../types'

export function exportDesigns(designs: Design[]): void {
  const stripped = designs.map(d => ({ ...d, thumbnail: '' }))
  const envelope: ExportEnvelope = { version: 1, designs: stripped }
  const json = JSON.stringify(envelope, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const date = new Date().toISOString().slice(0, 10)
  a.href = url
  a.download = `soul-lab-export-${date}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export async function parseImportFile(file: File): Promise<Design[]> {
  const text = await file.text()
  const data = JSON.parse(text)
  if (!data || typeof data !== 'object' || !Array.isArray(data.designs))
    throw new Error('Invalid export file format')
  const valid = data.designs.filter(
    (d: unknown): d is Design =>
      typeof d === 'object' && d !== null &&
      'id' in d && 'garmentTypeId' in d && 'elements' in d
  )
  if (valid.length === 0) throw new Error('No valid designs found in file')
  return valid
}
