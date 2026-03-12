import type { GarmentType } from '../../types'

export const vest: GarmentType = {
  id: 'vest',
  categoryId: 'outerwear',
  nameKey: 'garments.outerwear.vest.name',
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
        { id: 'open', nameKey: 'parts.closure.variants.open', svgPath: '' },
      ],
    },
    {
      id: 'pockets',
      nameKey: 'parts.pockets.name',
      required: false,
      layerOrder: 3,
      defaultVariantId: 'welt',
      variants: [
        { id: 'welt', nameKey: 'parts.pockets.variants.welt', svgPath: '' },
        { id: 'flap', nameKey: 'parts.pockets.variants.flap', svgPath: '' },
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
        { id: 'scoop', nameKey: 'parts.neckline.variants.scoop', svgPath: '' },
        { id: 'mandarin', nameKey: 'parts.neckline.variants.mandarin', svgPath: '' },
      ],
    },
  ],
}
