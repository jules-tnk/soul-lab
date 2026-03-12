import type { GarmentType } from '../../types'

export const parka: GarmentType = {
  id: 'parka',
  categoryId: 'outerwear',
  nameKey: 'garments.outerwear.parka.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'hood',
      nameKey: 'parts.hood.name',
      required: false,
      layerOrder: 0,
      defaultVariantId: 'standard',
      variants: [
        { id: 'standard', nameKey: 'parts.hood.variants.standard', svgPath: '' },
        { id: 'fur-trim', nameKey: 'parts.hood.variants.fur-trim', svgPath: '' },
        { id: 'detachable', nameKey: 'parts.hood.variants.detachable', svgPath: '' },
        { id: 'none', nameKey: 'parts.hood.variants.none', svgPath: '' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'mid-thigh',
      variants: [
        { id: 'hip', nameKey: 'parts.length.variants.hip', svgPath: '' },
        { id: 'mid-thigh', nameKey: 'parts.length.variants.mid-thigh', svgPath: '' },
        { id: 'knee', nameKey: 'parts.length.variants.knee', svgPath: '' },
      ],
    },
    {
      id: 'drawstring',
      nameKey: 'parts.drawstring.name',
      required: false,
      layerOrder: 1,
      defaultVariantId: 'waist',
      variants: [
        { id: 'waist', nameKey: 'parts.drawstring.variants.waist', svgPath: '' },
        { id: 'hem', nameKey: 'parts.drawstring.variants.hem', svgPath: '' },
        { id: 'none', nameKey: 'parts.drawstring.variants.none', svgPath: '' },
      ],
    },
    {
      id: 'closure',
      nameKey: 'parts.closure.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'zipper',
      variants: [
        { id: 'zipper', nameKey: 'parts.closure.variants.zipper', svgPath: '' },
        { id: 'snap', nameKey: 'parts.closure.variants.snap', svgPath: '' },
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
        { id: 'cargo', nameKey: 'parts.pockets.variants.cargo', svgPath: '' },
        { id: 'welt', nameKey: 'parts.pockets.variants.welt', svgPath: '' },
        { id: 'kangaroo', nameKey: 'parts.pockets.variants.kangaroo', svgPath: '' },
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
        { id: 'funnel', nameKey: 'parts.collar.variants.funnel', svgPath: '' },
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
        { id: 'raglan', nameKey: 'parts.sleeves.variants.raglan', svgPath: '' },
      ],
    },
  ],
}
