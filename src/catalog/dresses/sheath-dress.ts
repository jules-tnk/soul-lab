import type { GarmentType } from '../../types'

export const sheathDress: GarmentType = {
  id: 'sheath-dress',
  categoryId: 'dresses',
  nameKey: 'garments.dresses.sheath-dress.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'bodice',
      nameKey: 'parts.bodice.name',
      required: true,
      layerOrder: 0,
      defaultVariantId: 'fitted',
      variants: [
        { id: 'fitted', nameKey: 'parts.bodice.variants.fitted', svgPath: '' },
        { id: 'structured', nameKey: 'parts.bodice.variants.structured', svgPath: '' },
        { id: 'darted', nameKey: 'parts.bodice.variants.darted', svgPath: '' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'knee',
      variants: [
        { id: 'above-knee', nameKey: 'parts.length.variants.above-knee', svgPath: '' },
        { id: 'knee', nameKey: 'parts.length.variants.knee', svgPath: '' },
        { id: 'midi', nameKey: 'parts.length.variants.midi', svgPath: '' },
        { id: 'maxi', nameKey: 'parts.length.variants.maxi', svgPath: '' },
      ],
    },
    {
      id: 'slit',
      nameKey: 'parts.slit.name',
      required: false,
      layerOrder: 1,
      defaultVariantId: 'none',
      variants: [
        { id: 'none', nameKey: 'parts.slit.variants.none', svgPath: '' },
        { id: 'center', nameKey: 'parts.slit.variants.center', svgPath: '' },
        { id: 'side', nameKey: 'parts.slit.variants.side', svgPath: '' },
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
        { id: 'buttons', nameKey: 'parts.closure.variants.buttons', svgPath: '' },
        { id: 'hook', nameKey: 'parts.closure.variants.hook', svgPath: '' },
      ],
    },
    {
      id: 'neckline',
      nameKey: 'parts.neckline.name',
      required: true,
      layerOrder: 3,
      defaultVariantId: 'round',
      variants: [
        { id: 'round', nameKey: 'parts.neckline.variants.round', svgPath: '' },
        { id: 'v-neck', nameKey: 'parts.neckline.variants.v-neck', svgPath: '' },
        { id: 'square', nameKey: 'parts.neckline.variants.square', svgPath: '' },
        { id: 'boat', nameKey: 'parts.neckline.variants.boat', svgPath: '' },
        { id: 'cowl', nameKey: 'parts.neckline.variants.cowl', svgPath: '' },
        { id: 'sweetheart', nameKey: 'parts.neckline.variants.sweetheart', svgPath: '' },
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
        { id: 'three-quarter', nameKey: 'parts.sleeves.variants.three-quarter', svgPath: '' },
        { id: 'long', nameKey: 'parts.sleeves.variants.long', svgPath: '' },
        { id: 'cap', nameKey: 'parts.sleeves.variants.cap', svgPath: '' },
        { id: 'sleeveless', nameKey: 'parts.sleeves.variants.sleeveless', svgPath: '' },
      ],
    },
  ],
}
