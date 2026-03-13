import type { GarmentPartElement } from '../types'
import type { GarmentType } from '../types'
import { v4 as uuid } from 'uuid'

// Scale factor from SVG coordinate space (200x300) to canvas (600x800)
const SX = 600 / 200
const SY = 800 / 300

export function createTemplateElements(garmentType: GarmentType): GarmentPartElement[] {
  return garmentType.parts
    .filter(part => {
      const defaultVariant = part.variants.find(v => v.id === part.defaultVariantId)
      return defaultVariant && defaultVariant.svgPath !== ''
    })
    .map((part) => ({
      id: uuid(),
      type: 'garment-part' as const,
      partId: part.id,
      variantId: part.defaultVariantId,
      garmentTypeId: garmentType.id,
      x: 0,
      y: 0,
      scaleX: SX,
      scaleY: SY,
      rotation: 0,
      color: '#E63946',
      opacity: 1,
      zIndex: part.layerOrder,
      locked: false,
      visible: true,
      groupId: null,
    }))
}
