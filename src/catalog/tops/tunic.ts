import type { GarmentType } from '../../types'

export const tunic: GarmentType = {
  id: 'tunic',
  categoryId: 'tops',
  nameKey: 'garments.tops.tunic.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'fit',
      nameKey: 'parts.fit.name',
      required: true,
      layerOrder: 0,
      defaultVariantId: 'relaxed',
      variants: [
        { id: 'relaxed', nameKey: 'parts.fit.variants.relaxed', svgPath: 'tops/tunic/fit/relaxed.svg' },
        { id: 'regular', nameKey: 'parts.fit.variants.regular', svgPath: 'tops/tunic/fit/regular.svg' },
        { id: 'oversized', nameKey: 'parts.fit.variants.oversized', svgPath: 'tops/tunic/fit/oversized.svg' },
      ],
    },
    {
      id: 'hem',
      nameKey: 'parts.hem.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'straight',
      variants: [
        { id: 'straight', nameKey: 'parts.hem.variants.straight', svgPath: 'tops/tunic/hem/straight.svg' },
        { id: 'curved', nameKey: 'parts.hem.variants.curved', svgPath: 'tops/tunic/hem/curved.svg' },
        { id: 'asymmetric', nameKey: 'parts.hem.variants.asymmetric', svgPath: 'tops/tunic/hem/asymmetric.svg' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'hip',
      variants: [
        { id: 'hip', nameKey: 'parts.length.variants.hip', svgPath: 'tops/tunic/length/hip.svg' },
        { id: 'mid-thigh', nameKey: 'parts.length.variants.mid-thigh', svgPath: 'tops/tunic/length/mid-thigh.svg' },
        { id: 'knee', nameKey: 'parts.length.variants.knee', svgPath: 'tops/tunic/length/knee.svg' },
        { id: 'above-knee', nameKey: 'parts.length.variants.above-knee', svgPath: 'tops/tunic/length/above-knee.svg' },
      ],
    },
    {
      id: 'side-slits',
      nameKey: 'parts.side-slits.name',
      required: false,
      layerOrder: 1,
      defaultVariantId: 'none',
      variants: [
        { id: 'none', nameKey: 'parts.side-slits.variants.none', svgPath: 'tops/tunic/side-slits/none.svg' },
        { id: 'low', nameKey: 'parts.side-slits.variants.low', svgPath: 'tops/tunic/side-slits/low.svg' },
        { id: 'high', nameKey: 'parts.side-slits.variants.high', svgPath: 'tops/tunic/side-slits/high.svg' },
      ],
    },
    {
      id: 'neckline',
      nameKey: 'parts.neckline.name',
      required: true,
      layerOrder: 3,
      defaultVariantId: 'round',
      variants: [
        { id: 'round', nameKey: 'parts.neckline.variants.round', svgPath: 'tops/tunic/neckline/round.svg' },
        { id: 'v-neck', nameKey: 'parts.neckline.variants.v-neck', svgPath: 'tops/tunic/neckline/v-neck.svg' },
        { id: 'boat', nameKey: 'parts.neckline.variants.boat', svgPath: 'tops/tunic/neckline/boat.svg' },
        { id: 'square', nameKey: 'parts.neckline.variants.square', svgPath: 'tops/tunic/neckline/square.svg' },
        { id: 'mandarin', nameKey: 'parts.neckline.variants.mandarin', svgPath: 'tops/tunic/neckline/mandarin.svg' },
        { id: 'henley', nameKey: 'parts.neckline.variants.henley', svgPath: 'tops/tunic/neckline/henley.svg' },
      ],
    },
    {
      id: 'sleeves',
      nameKey: 'parts.sleeves.name',
      required: true,
      layerOrder: 5,
      defaultVariantId: 'long',
      variants: [
        { id: 'long', nameKey: 'parts.sleeves.variants.long', svgPath: 'tops/tunic/sleeves/long.svg' },
        { id: 'short', nameKey: 'parts.sleeves.variants.short', svgPath: 'tops/tunic/sleeves/short.svg' },
        { id: 'three-quarter', nameKey: 'parts.sleeves.variants.three-quarter', svgPath: 'tops/tunic/sleeves/three-quarter.svg' },
        { id: 'bell', nameKey: 'parts.sleeves.variants.bell', svgPath: 'tops/tunic/sleeves/bell.svg' },
        { id: 'rolled', nameKey: 'parts.sleeves.variants.rolled', svgPath: 'tops/tunic/sleeves/rolled.svg' },
        { id: 'sleeveless', nameKey: 'parts.sleeves.variants.sleeveless', svgPath: 'tops/tunic/sleeves/sleeveless.svg' },
      ],
    },
  ],
}
