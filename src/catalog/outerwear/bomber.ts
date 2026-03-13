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
        { id: 'ribbed', nameKey: 'parts.hem.variants.ribbed', svgPath: 'outerwear/bomber/hem/ribbed.svg' },
        { id: 'elastic', nameKey: 'parts.hem.variants.elastic', svgPath: 'outerwear/bomber/hem/elastic.svg' },
      ],
    },
    {
      id: 'closure',
      nameKey: 'parts.closure.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'zipper',
      variants: [
        { id: 'zipper', nameKey: 'parts.closure.variants.zipper', svgPath: 'outerwear/bomber/closure/zipper.svg' },
        { id: 'snap', nameKey: 'parts.closure.variants.snap', svgPath: 'outerwear/bomber/closure/snap.svg' },
      ],
    },
    {
      id: 'pockets',
      nameKey: 'parts.pockets.name',
      required: false,
      layerOrder: 3,
      defaultVariantId: 'slash',
      variants: [
        { id: 'slash', nameKey: 'parts.pockets.variants.slash', svgPath: 'outerwear/bomber/pockets/slash.svg' },
        { id: 'flap', nameKey: 'parts.pockets.variants.flap', svgPath: 'outerwear/bomber/pockets/flap.svg' },
        { id: 'none', nameKey: 'parts.pockets.variants.none', svgPath: 'outerwear/bomber/pockets/none.svg' },
      ],
    },
    {
      id: 'collar',
      nameKey: 'parts.collar.name',
      required: true,
      layerOrder: 4,
      defaultVariantId: 'standard',
      variants: [
        { id: 'standard', nameKey: 'parts.collar.variants.standard', svgPath: 'outerwear/bomber/collar/standard.svg' },
        { id: 'mandarin', nameKey: 'parts.collar.variants.mandarin', svgPath: 'outerwear/bomber/collar/mandarin.svg' },
        { id: 'shearling', nameKey: 'parts.collar.variants.shearling', svgPath: 'outerwear/bomber/collar/shearling.svg' },
      ],
    },
    {
      id: 'sleeves',
      nameKey: 'parts.sleeves.name',
      required: true,
      layerOrder: 5,
      defaultVariantId: 'long',
      variants: [
        { id: 'long', nameKey: 'parts.sleeves.variants.long', svgPath: 'outerwear/bomber/sleeves/long.svg' },
        { id: 'raglan', nameKey: 'parts.sleeves.variants.raglan', svgPath: 'outerwear/bomber/sleeves/raglan.svg' },
      ],
    },
    {
      id: 'cuffs',
      nameKey: 'parts.cuffs.name',
      required: true,
      layerOrder: 6,
      defaultVariantId: 'ribbed',
      variants: [
        { id: 'ribbed', nameKey: 'parts.cuffs.variants.ribbed', svgPath: 'outerwear/bomber/cuffs/ribbed.svg' },
        { id: 'elastic', nameKey: 'parts.cuffs.variants.elastic', svgPath: 'outerwear/bomber/cuffs/elastic.svg' },
        { id: 'snapped', nameKey: 'parts.cuffs.variants.snapped', svgPath: 'outerwear/bomber/cuffs/snapped.svg' },
      ],
    },
  ],
}
