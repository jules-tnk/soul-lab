import type { GarmentType } from '../../types'

export const tshirt: GarmentType = {
  id: 'tshirt',
  categoryId: 'tops',
  nameKey: 'garments.tops.tshirt.name',
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
        { id: 'relaxed', nameKey: 'parts.fit.variants.relaxed', svgPath: '' },
        { id: 'oversized', nameKey: 'parts.fit.variants.oversized', svgPath: '' },
      ],
    },
    {
      id: 'hem',
      nameKey: 'parts.hem.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'straight',
      variants: [
        { id: 'straight', nameKey: 'parts.hem.variants.straight', svgPath: '' },
        { id: 'curved', nameKey: 'parts.hem.variants.curved', svgPath: '' },
        { id: 'split', nameKey: 'parts.hem.variants.split', svgPath: '' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'regular',
      variants: [
        { id: 'cropped', nameKey: 'parts.length.variants.cropped', svgPath: '' },
        { id: 'regular', nameKey: 'parts.length.variants.regular', svgPath: '' },
        { id: 'longline', nameKey: 'parts.length.variants.longline', svgPath: '' },
      ],
    },
    {
      id: 'neckline',
      nameKey: 'parts.neckline.name',
      required: true,
      layerOrder: 3,
      defaultVariantId: 'crew',
      variants: [
        { id: 'crew', nameKey: 'parts.neckline.variants.crew', svgPath: '' },
        { id: 'v-neck', nameKey: 'parts.neckline.variants.v-neck', svgPath: '' },
        { id: 'scoop', nameKey: 'parts.neckline.variants.scoop', svgPath: '' },
        { id: 'henley', nameKey: 'parts.neckline.variants.henley', svgPath: '' },
        { id: 'mock', nameKey: 'parts.neckline.variants.mock', svgPath: '' },
      ],
    },
    {
      id: 'sleeves',
      nameKey: 'parts.sleeves.name',
      required: true,
      layerOrder: 5,
      defaultVariantId: 'short',
      variants: [
        { id: 'short', nameKey: 'parts.sleeves.variants.short', svgPath: '' },
        { id: 'long', nameKey: 'parts.sleeves.variants.long', svgPath: '' },
        { id: 'three-quarter', nameKey: 'parts.sleeves.variants.three-quarter', svgPath: '' },
        { id: 'raglan', nameKey: 'parts.sleeves.variants.raglan', svgPath: '' },
        { id: 'cap', nameKey: 'parts.sleeves.variants.cap', svgPath: '' },
      ],
    },
  ],
}
