import type { GarmentType } from '../../types'

export const bomber: GarmentType = {
  id: 'bomber',
  categoryId: 'outerwear',
  nameKey: 'garments.outerwear.bomber.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'hem',
      nameKey: 'parts.hem.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'ribbed',
      variants: [
        { id: 'ribbed', nameKey: 'parts.hem.variants.ribbed', svgPath: '' },
        { id: 'elastic', nameKey: 'parts.hem.variants.elastic', svgPath: '' },
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
      defaultVariantId: 'slash',
      variants: [
        { id: 'slash', nameKey: 'parts.pockets.variants.slash', svgPath: '' },
        { id: 'flap', nameKey: 'parts.pockets.variants.flap', svgPath: '' },
        { id: 'none', nameKey: 'parts.pockets.variants.none', svgPath: '' },
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
        { id: 'shearling', nameKey: 'parts.collar.variants.shearling', svgPath: '' },
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
    {
      id: 'cuffs',
      nameKey: 'parts.cuffs.name',
      required: true,
      layerOrder: 6,
      defaultVariantId: 'ribbed',
      variants: [
        { id: 'ribbed', nameKey: 'parts.cuffs.variants.ribbed', svgPath: '' },
        { id: 'elastic', nameKey: 'parts.cuffs.variants.elastic', svgPath: '' },
        { id: 'snapped', nameKey: 'parts.cuffs.variants.snapped', svgPath: '' },
      ],
    },
  ],
}
