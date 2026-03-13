import type { GarmentPartElement } from '../types'
import type { GarmentType } from '../types'
import { v4 as uuid } from 'uuid'

// Scale factor from SVG viewBox (200x300) to canvas (600x800)
const SX = 600 / 200
const SY = 800 / 300

// Default part positions in SVG coordinate space (200x300 viewBox)
const DEFAULT_POSITIONS: Record<string, { x: number; y: number }> = {
  body:      { x: 100, y: 150 },
  fit:       { x: 100, y: 150 },
  yoke:      { x: 100, y: 70 },
  hem:       { x: 100, y: 245 },
  placket:   { x: 100, y: 150 },
  neckline:  { x: 100, y: 55 },
  pockets:   { x: 100, y: 140 },
  collar:    { x: 100, y: 48 },
  sleeves:   { x: 100, y: 120 },
  cuffs:     { x: 100, y: 180 },
  waistband: { x: 100, y: 30 },
  rise:      { x: 100, y: 60 },
  'leg-shape': { x: 100, y: 160 },
  fly:       { x: 100, y: 50 },
  bodice:    { x: 100, y: 80 },
  waistline: { x: 100, y: 130 },
  'skirt-length': { x: 100, y: 210 },
  'skirt-shape': { x: 100, y: 200 },
  straps:    { x: 100, y: 40 },
  back:      { x: 100, y: 100 },
  slit:      { x: 100, y: 220 },
  lapels:    { x: 100, y: 70 },
  closure:   { x: 100, y: 130 },
  vents:     { x: 100, y: 240 },
  hood:      { x: 100, y: 30 },
  belt:      { x: 100, y: 140 },
  length:    { x: 100, y: 200 },
  drawstring:{ x: 100, y: 240 },
}

export function createTemplateElements(garmentType: GarmentType): GarmentPartElement[] {
  return garmentType.parts
    .filter(part => {
      const defaultVariant = part.variants.find(v => v.id === part.defaultVariantId)
      return defaultVariant && defaultVariant.svgPath !== ''
    })
    .map((part) => {
      const pos = DEFAULT_POSITIONS[part.id] || { x: 100, y: 150 }
      return {
        id: uuid(),
        type: 'garment-part' as const,
        partId: part.id,
        variantId: part.defaultVariantId,
        garmentTypeId: garmentType.id,
        x: pos.x * SX,
        y: pos.y * SY,
        scaleX: SX,
        scaleY: SY,
        rotation: 0,
        color: '#E63946',
        opacity: 1,
        zIndex: part.layerOrder,
        locked: false,
        visible: true,
      }
    })
}
