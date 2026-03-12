import type { GarmentType } from '../../types'

export const blazer: GarmentType = {
  id: 'blazer',
  categoryId: 'outerwear',
  nameKey: 'garments.outerwear.blazer.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'fit',
      nameKey: 'parts.fit.name',
      required: true,
      layerOrder: 0,
      defaultVariantId: 'regular',
      variants: [
        { id: 'slim', nameKey: 'parts.fit.variants.slim', svgPath: '' },
        { id: 'regular', nameKey: 'parts.fit.variants.regular', svgPath: '' },
        { id: 'oversized', nameKey: 'parts.fit.variants.oversized', svgPath: '' },
      ],
    },
    {
      id: 'vents',
      nameKey: 'parts.vents.name',
      required: false,
      layerOrder: 1,
      defaultVariantId: 'none',
      variants: [
        { id: 'none', nameKey: 'parts.vents.variants.none', svgPath: '' },
        { id: 'center', nameKey: 'parts.vents.variants.center', svgPath: '' },
        { id: 'side', nameKey: 'parts.vents.variants.side', svgPath: '' },
      ],
    },
    {
      id: 'closure',
      nameKey: 'parts.closure.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'single-button',
      variants: [
        { id: 'single-button', nameKey: 'parts.closure.variants.single-button', svgPath: '' },
        { id: 'double-breasted', nameKey: 'parts.closure.variants.double-breasted', svgPath: '' },
        { id: 'open', nameKey: 'parts.closure.variants.open', svgPath: '' },
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
        { id: 'patch', nameKey: 'parts.pockets.variants.patch', svgPath: '' },
        { id: 'none', nameKey: 'parts.pockets.variants.none', svgPath: '' },
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
        { id: 'shawl', nameKey: 'parts.lapels.variants.shawl', svgPath: '' },
        { id: 'none', nameKey: 'parts.lapels.variants.none', svgPath: '' },
      ],
    },
    {
      id: 'collar',
      nameKey: 'parts.collar.name',
      required: true,
      layerOrder: 4,
      defaultVariantId: 'standard',
      variants: [
        { id: 'standard', nameKey: 'parts.collar.variants.standard', svgPath: '' },
        { id: 'mandarin', nameKey: 'parts.collar.variants.mandarin', svgPath: '' },
        { id: 'stand', nameKey: 'parts.collar.variants.stand', svgPath: '' },
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
        { id: 'three-quarter', nameKey: 'parts.sleeves.variants.three-quarter', svgPath: '' },
        { id: 'pushed-up', nameKey: 'parts.sleeves.variants.pushed-up', svgPath: '' },
      ],
    },
  ],
}
