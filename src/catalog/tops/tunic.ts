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
        { id: 'relaxed', nameKey: 'parts.fit.variants.relaxed', svgPath: '' },
        { id: 'regular', nameKey: 'parts.fit.variants.regular', svgPath: '' },
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
        { id: 'asymmetric', nameKey: 'parts.hem.variants.asymmetric', svgPath: '' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'hip',
      variants: [
        { id: 'hip', nameKey: 'parts.length.variants.hip', svgPath: '' },
        { id: 'mid-thigh', nameKey: 'parts.length.variants.mid-thigh', svgPath: '' },
        { id: 'knee', nameKey: 'parts.length.variants.knee', svgPath: '' },
        { id: 'above-knee', nameKey: 'parts.length.variants.above-knee', svgPath: '' },
      ],
    },
    {
      id: 'side-slits',
      nameKey: 'parts.side-slits.name',
      required: false,
      layerOrder: 1,
      defaultVariantId: 'none',
      variants: [
        { id: 'none', nameKey: 'parts.side-slits.variants.none', svgPath: '' },
        { id: 'low', nameKey: 'parts.side-slits.variants.low', svgPath: '' },
        { id: 'high', nameKey: 'parts.side-slits.variants.high', svgPath: '' },
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
        { id: 'boat', nameKey: 'parts.neckline.variants.boat', svgPath: '' },
        { id: 'square', nameKey: 'parts.neckline.variants.square', svgPath: '' },
        { id: 'mandarin', nameKey: 'parts.neckline.variants.mandarin', svgPath: '' },
        { id: 'henley', nameKey: 'parts.neckline.variants.henley', svgPath: '' },
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
        { id: 'bell', nameKey: 'parts.sleeves.variants.bell', svgPath: '' },
        { id: 'rolled', nameKey: 'parts.sleeves.variants.rolled', svgPath: '' },
        { id: 'sleeveless', nameKey: 'parts.sleeves.variants.sleeveless', svgPath: '' },
      ],
    },
  ],
}
