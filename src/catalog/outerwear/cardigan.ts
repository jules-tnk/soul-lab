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
        { id: 'slim', nameKey: 'parts.fit.variants.slim', svgPath: 'outerwear/cardigan/fit/slim.svg' },
        { id: 'regular', nameKey: 'parts.fit.variants.regular', svgPath: 'outerwear/cardigan/fit/regular.svg' },
        { id: 'oversized', nameKey: 'parts.fit.variants.oversized', svgPath: 'outerwear/cardigan/fit/oversized.svg' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'hip',
      variants: [
        { id: 'cropped', nameKey: 'parts.length.variants.cropped', svgPath: 'outerwear/cardigan/length/cropped.svg' },
        { id: 'hip', nameKey: 'parts.length.variants.hip', svgPath: 'outerwear/cardigan/length/hip.svg' },
        { id: 'tunic', nameKey: 'parts.length.variants.tunic', svgPath: 'outerwear/cardigan/length/tunic.svg' },
        { id: 'long', nameKey: 'parts.length.variants.long', svgPath: 'outerwear/cardigan/length/long.svg' },
      ],
    },
    {
      id: 'closure',
      nameKey: 'parts.closure.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'buttons',
      variants: [
        { id: 'buttons', nameKey: 'parts.closure.variants.buttons', svgPath: 'outerwear/cardigan/closure/buttons.svg' },
        { id: 'zipper', nameKey: 'parts.closure.variants.zipper', svgPath: 'outerwear/cardigan/closure/zipper.svg' },
        { id: 'toggle', nameKey: 'parts.closure.variants.toggle', svgPath: 'outerwear/cardigan/closure/toggle.svg' },
        { id: 'open', nameKey: 'parts.closure.variants.open', svgPath: 'outerwear/cardigan/closure/open.svg' },
      ],
    },
    {
      id: 'pockets',
      nameKey: 'parts.pockets.name',
      required: false,
      layerOrder: 3,
      defaultVariantId: 'patch',
      variants: [
        { id: 'patch', nameKey: 'parts.pockets.variants.patch', svgPath: 'outerwear/cardigan/pockets/patch.svg' },
        { id: 'kangaroo', nameKey: 'parts.pockets.variants.kangaroo', svgPath: 'outerwear/cardigan/pockets/kangaroo.svg' },
        { id: 'none', nameKey: 'parts.pockets.variants.none', svgPath: 'outerwear/cardigan/pockets/none.svg' },
      ],
    },
    {
      id: 'neckline',
      nameKey: 'parts.neckline.name',
      required: true,
      layerOrder: 3,
      defaultVariantId: 'v-neck',
      variants: [
        { id: 'v-neck', nameKey: 'parts.neckline.variants.v-neck', svgPath: 'outerwear/cardigan/neckline/v-neck.svg' },
        { id: 'round', nameKey: 'parts.neckline.variants.round', svgPath: 'outerwear/cardigan/neckline/round.svg' },
        { id: 'shawl', nameKey: 'parts.neckline.variants.shawl', svgPath: 'outerwear/cardigan/neckline/shawl.svg' },
        { id: 'waterfall', nameKey: 'parts.neckline.variants.waterfall', svgPath: 'outerwear/cardigan/neckline/waterfall.svg' },
      ],
    },
    {
      id: 'sleeves',
      nameKey: 'parts.sleeves.name',
      required: true,
      layerOrder: 5,
      defaultVariantId: 'long',
      variants: [
        { id: 'long', nameKey: 'parts.sleeves.variants.long', svgPath: 'outerwear/cardigan/sleeves/long.svg' },
        { id: 'three-quarter', nameKey: 'parts.sleeves.variants.three-quarter', svgPath: 'outerwear/cardigan/sleeves/three-quarter.svg' },
        { id: 'short', nameKey: 'parts.sleeves.variants.short', svgPath: 'outerwear/cardigan/sleeves/short.svg' },
        { id: 'dolman', nameKey: 'parts.sleeves.variants.dolman', svgPath: 'outerwear/cardigan/sleeves/dolman.svg' },
      ],
    },
  ],
}
