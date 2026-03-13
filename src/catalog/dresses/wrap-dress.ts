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
        { id: 'left-over-right', nameKey: 'parts.wrap-direction.variants.left-over-right', svgPath: 'dresses/wrap-dress/wrap-direction/left-over-right.svg' },
        { id: 'right-over-left', nameKey: 'parts.wrap-direction.variants.right-over-left', svgPath: 'dresses/wrap-dress/wrap-direction/right-over-left.svg' },
      ],
    },
    {
      id: 'skirt-length',
      nameKey: 'parts.skirt-length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'knee',
      variants: [
        { id: 'above-knee', nameKey: 'parts.skirt-length.variants.above-knee', svgPath: 'dresses/wrap-dress/skirt-length/above-knee.svg' },
        { id: 'knee', nameKey: 'parts.skirt-length.variants.knee', svgPath: 'dresses/wrap-dress/skirt-length/knee.svg' },
        { id: 'midi', nameKey: 'parts.skirt-length.variants.midi', svgPath: 'dresses/wrap-dress/skirt-length/midi.svg' },
        { id: 'maxi', nameKey: 'parts.skirt-length.variants.maxi', svgPath: 'dresses/wrap-dress/skirt-length/maxi.svg' },
      ],
    },
    {
      id: 'tie',
      nameKey: 'parts.tie.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'self-tie',
      variants: [
        { id: 'self-tie', nameKey: 'parts.tie.variants.self-tie', svgPath: 'dresses/wrap-dress/tie/self-tie.svg' },
        { id: 'd-ring', nameKey: 'parts.tie.variants.d-ring', svgPath: 'dresses/wrap-dress/tie/d-ring.svg' },
        { id: 'snap', nameKey: 'parts.tie.variants.snap', svgPath: 'dresses/wrap-dress/tie/snap.svg' },
      ],
    },
    {
      id: 'neckline',
      nameKey: 'parts.neckline.name',
      required: true,
      layerOrder: 3,
      defaultVariantId: 'v-neck',
      variants: [
        { id: 'v-neck', nameKey: 'parts.neckline.variants.v-neck', svgPath: 'dresses/wrap-dress/neckline/v-neck.svg' },
        { id: 'surplice', nameKey: 'parts.neckline.variants.surplice', svgPath: 'dresses/wrap-dress/neckline/surplice.svg' },
        { id: 'deep-v', nameKey: 'parts.neckline.variants.deep-v', svgPath: 'dresses/wrap-dress/neckline/deep-v.svg' },
        { id: 'mock-wrap', nameKey: 'parts.neckline.variants.mock-wrap', svgPath: 'dresses/wrap-dress/neckline/mock-wrap.svg' },
      ],
    },
    {
      id: 'sleeves',
      nameKey: 'parts.sleeves.name',
      required: true,
      layerOrder: 5,
      defaultVariantId: 'long',
      variants: [
        { id: 'long', nameKey: 'parts.sleeves.variants.long', svgPath: 'dresses/wrap-dress/sleeves/long.svg' },
        { id: 'short', nameKey: 'parts.sleeves.variants.short', svgPath: 'dresses/wrap-dress/sleeves/short.svg' },
        { id: 'three-quarter', nameKey: 'parts.sleeves.variants.three-quarter', svgPath: 'dresses/wrap-dress/sleeves/three-quarter.svg' },
        { id: 'flutter', nameKey: 'parts.sleeves.variants.flutter', svgPath: 'dresses/wrap-dress/sleeves/flutter.svg' },
        { id: 'bell', nameKey: 'parts.sleeves.variants.bell', svgPath: 'dresses/wrap-dress/sleeves/bell.svg' },
        { id: 'sleeveless', nameKey: 'parts.sleeves.variants.sleeveless', svgPath: 'dresses/wrap-dress/sleeves/sleeveless.svg' },
      ],
    },
  ],
}
