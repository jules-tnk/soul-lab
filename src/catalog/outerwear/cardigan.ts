import type { GarmentType } from '../../types'

export const cardigan: GarmentType = {
  id: 'cardigan',
  categoryId: 'outerwear',
  nameKey: 'garments.outerwear.cardigan.name',
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
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'hip',
      variants: [
        { id: 'cropped', nameKey: 'parts.length.variants.cropped', svgPath: '' },
        { id: 'hip', nameKey: 'parts.length.variants.hip', svgPath: '' },
        { id: 'tunic', nameKey: 'parts.length.variants.tunic', svgPath: '' },
        { id: 'long', nameKey: 'parts.length.variants.long', svgPath: '' },
      ],
    },
    {
      id: 'closure',
      nameKey: 'parts.closure.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'buttons',
      variants: [
        { id: 'buttons', nameKey: 'parts.closure.variants.buttons', svgPath: '' },
        { id: 'zipper', nameKey: 'parts.closure.variants.zipper', svgPath: '' },
        { id: 'toggle', nameKey: 'parts.closure.variants.toggle', svgPath: '' },
        { id: 'open', nameKey: 'parts.closure.variants.open', svgPath: '' },
      ],
    },
    {
      id: 'pockets',
      nameKey: 'parts.pockets.name',
      required: false,
      layerOrder: 3,
      defaultVariantId: 'patch',
      variants: [
        { id: 'patch', nameKey: 'parts.pockets.variants.patch', svgPath: '' },
        { id: 'kangaroo', nameKey: 'parts.pockets.variants.kangaroo', svgPath: '' },
        { id: 'none', nameKey: 'parts.pockets.variants.none', svgPath: '' },
      ],
    },
    {
      id: 'neckline',
      nameKey: 'parts.neckline.name',
      required: true,
      layerOrder: 3,
      defaultVariantId: 'v-neck',
      variants: [
        { id: 'v-neck', nameKey: 'parts.neckline.variants.v-neck', svgPath: '' },
        { id: 'round', nameKey: 'parts.neckline.variants.round', svgPath: '' },
        { id: 'shawl', nameKey: 'parts.neckline.variants.shawl', svgPath: '' },
        { id: 'waterfall', nameKey: 'parts.neckline.variants.waterfall', svgPath: '' },
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
        { id: 'short', nameKey: 'parts.sleeves.variants.short', svgPath: '' },
        { id: 'dolman', nameKey: 'parts.sleeves.variants.dolman', svgPath: '' },
      ],
    },
  ],
}
