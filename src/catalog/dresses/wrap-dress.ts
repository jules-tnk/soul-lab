import type { GarmentType } from '../../types'

export const wrapDress: GarmentType = {
  id: 'wrap-dress',
  categoryId: 'dresses',
  nameKey: 'garments.dresses.wrap-dress.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'wrap-direction',
      nameKey: 'parts.wrap-direction.name',
      required: true,
      layerOrder: 0,
      defaultVariantId: 'left-over-right',
      variants: [
        { id: 'left-over-right', nameKey: 'parts.wrap-direction.variants.left-over-right', svgPath: '' },
        { id: 'right-over-left', nameKey: 'parts.wrap-direction.variants.right-over-left', svgPath: '' },
      ],
    },
    {
      id: 'skirt-length',
      nameKey: 'parts.skirt-length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'knee',
      variants: [
        { id: 'above-knee', nameKey: 'parts.skirt-length.variants.above-knee', svgPath: '' },
        { id: 'knee', nameKey: 'parts.skirt-length.variants.knee', svgPath: '' },
        { id: 'midi', nameKey: 'parts.skirt-length.variants.midi', svgPath: '' },
        { id: 'maxi', nameKey: 'parts.skirt-length.variants.maxi', svgPath: '' },
      ],
    },
    {
      id: 'tie',
      nameKey: 'parts.tie.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'self-tie',
      variants: [
        { id: 'self-tie', nameKey: 'parts.tie.variants.self-tie', svgPath: '' },
        { id: 'd-ring', nameKey: 'parts.tie.variants.d-ring', svgPath: '' },
        { id: 'snap', nameKey: 'parts.tie.variants.snap', svgPath: '' },
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
        { id: 'surplice', nameKey: 'parts.neckline.variants.surplice', svgPath: '' },
        { id: 'deep-v', nameKey: 'parts.neckline.variants.deep-v', svgPath: '' },
        { id: 'mock-wrap', nameKey: 'parts.neckline.variants.mock-wrap', svgPath: '' },
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
        { id: 'short', nameKey: 'parts.sleeves.variants.short', svgPath: '' },
        { id: 'three-quarter', nameKey: 'parts.sleeves.variants.three-quarter', svgPath: '' },
        { id: 'flutter', nameKey: 'parts.sleeves.variants.flutter', svgPath: '' },
        { id: 'bell', nameKey: 'parts.sleeves.variants.bell', svgPath: '' },
        { id: 'sleeveless', nameKey: 'parts.sleeves.variants.sleeveless', svgPath: '' },
      ],
    },
  ],
}
