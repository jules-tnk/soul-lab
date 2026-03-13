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
        { id: 'slim', nameKey: 'parts.fit.variants.slim', svgPath: 'outerwear/vest/fit/slim.svg' },
        { id: 'regular', nameKey: 'parts.fit.variants.regular', svgPath: 'outerwear/vest/fit/regular.svg' },
        { id: 'oversized', nameKey: 'parts.fit.variants.oversized', svgPath: 'outerwear/vest/fit/oversized.svg' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'hip',
      variants: [
        { id: 'cropped', nameKey: 'parts.length.variants.cropped', svgPath: 'outerwear/vest/length/cropped.svg' },
        { id: 'hip', nameKey: 'parts.length.variants.hip', svgPath: 'outerwear/vest/length/hip.svg' },
        { id: 'long', nameKey: 'parts.length.variants.long', svgPath: 'outerwear/vest/length/long.svg' },
      ],
    },
    {
      id: 'closure',
      nameKey: 'parts.closure.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'buttons',
      variants: [
        { id: 'buttons', nameKey: 'parts.closure.variants.buttons', svgPath: 'outerwear/vest/closure/buttons.svg' },
        { id: 'zipper', nameKey: 'parts.closure.variants.zipper', svgPath: 'outerwear/vest/closure/zipper.svg' },
        { id: 'open', nameKey: 'parts.closure.variants.open', svgPath: 'outerwear/vest/closure/open.svg' },
      ],
    },
    {
      id: 'pockets',
      nameKey: 'parts.pockets.name',
      required: false,
      layerOrder: 3,
      defaultVariantId: 'welt',
      variants: [
        { id: 'welt', nameKey: 'parts.pockets.variants.welt', svgPath: 'outerwear/vest/pockets/welt.svg' },
        { id: 'flap', nameKey: 'parts.pockets.variants.flap', svgPath: 'outerwear/vest/pockets/flap.svg' },
        { id: 'none', nameKey: 'parts.pockets.variants.none', svgPath: 'outerwear/vest/pockets/none.svg' },
      ],
    },
    {
      id: 'neckline',
      nameKey: 'parts.neckline.name',
      required: true,
      layerOrder: 3,
      defaultVariantId: 'v-neck',
      variants: [
        { id: 'v-neck', nameKey: 'parts.neckline.variants.v-neck', svgPath: 'outerwear/vest/neckline/v-neck.svg' },
        { id: 'round', nameKey: 'parts.neckline.variants.round', svgPath: 'outerwear/vest/neckline/round.svg' },
        { id: 'scoop', nameKey: 'parts.neckline.variants.scoop', svgPath: 'outerwear/vest/neckline/scoop.svg' },
        { id: 'mandarin', nameKey: 'parts.neckline.variants.mandarin', svgPath: 'outerwear/vest/neckline/mandarin.svg' },
      ],
    },
  ],
}
