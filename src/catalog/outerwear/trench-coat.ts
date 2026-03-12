import type { GarmentType } from '../../types'

export const trenchCoat: GarmentType = {
  id: 'trench-coat',
  categoryId: 'outerwear',
  nameKey: 'garments.outerwear.trench-coat.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'mid',
      variants: [
        { id: 'short', nameKey: 'parts.length.variants.short', svgPath: '' },
        { id: 'mid', nameKey: 'parts.length.variants.mid', svgPath: '' },
        { id: 'long', nameKey: 'parts.length.variants.long', svgPath: '' },
        { id: 'ankle', nameKey: 'parts.length.variants.ankle', svgPath: '' },
      ],
    },
    {
      id: 'belt',
      nameKey: 'parts.belt.name',
      required: false,
      layerOrder: 2,
      defaultVariantId: 'self-tie',
      variants: [
        { id: 'self-tie', nameKey: 'parts.belt.variants.self-tie', svgPath: '' },
        { id: 'buckle', nameKey: 'parts.belt.variants.buckle', svgPath: '' },
        { id: 'none', nameKey: 'parts.belt.variants.none', svgPath: '' },
      ],
    },
    {
      id: 'closure',
      nameKey: 'parts.closure.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'double-breasted',
      variants: [
        { id: 'double-breasted', nameKey: 'parts.closure.variants.double-breasted', svgPath: '' },
        { id: 'single-button', nameKey: 'parts.closure.variants.single-button', svgPath: '' },
        { id: 'hidden', nameKey: 'parts.closure.variants.hidden', svgPath: '' },
      ],
    },
    {
      id: 'pockets',
      nameKey: 'parts.pockets.name',
      required: false,
      layerOrder: 3,
      defaultVariantId: 'flap',
      variants: [
        { id: 'flap', nameKey: 'parts.pockets.variants.flap', svgPath: '' },
        { id: 'welt', nameKey: 'parts.pockets.variants.welt', svgPath: '' },
        { id: 'slash', nameKey: 'parts.pockets.variants.slash', svgPath: '' },
      ],
    },
    {
      id: 'lapels',
      nameKey: 'parts.lapels.name',
      required: true,
      layerOrder: 4,
      defaultVariantId: 'notch',
      variants: [
        { id: 'notch', nameKey: 'parts.lapels.variants.notch', svgPath: '' },
        { id: 'peak', nameKey: 'parts.lapels.variants.peak', svgPath: '' },
        { id: 'gun-flap', nameKey: 'parts.lapels.variants.gun-flap', svgPath: '' },
      ],
    },
    {
      id: 'collar',
      nameKey: 'parts.collar.name',
      required: true,
      layerOrder: 4,
      defaultVariantId: 'classic',
      variants: [
        { id: 'classic', nameKey: 'parts.collar.variants.classic', svgPath: '' },
        { id: 'stand', nameKey: 'parts.collar.variants.stand', svgPath: '' },
        { id: 'storm', nameKey: 'parts.collar.variants.storm', svgPath: '' },
      ],
    },
    {
      id: 'sleeves',
      nameKey: 'parts.sleeves.name',
      required: true,
      layerOrder: 5,
      defaultVariantId: 'long',
      variants: [
        { id: 'long', nameKey: 'parts.sleeves.variants.long', svgPath: '' },
        { id: 'raglan', nameKey: 'parts.sleeves.variants.raglan', svgPath: '' },
      ],
    },
  ],
}
