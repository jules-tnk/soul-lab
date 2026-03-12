import type { GarmentType } from '../../types'

export const polo: GarmentType = {
  id: 'polo',
  categoryId: 'tops',
  nameKey: 'garments.tops.polo.name',
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
        { id: 'ribbed', nameKey: 'parts.hem.variants.ribbed', svgPath: '' },
      ],
    },
    {
      id: 'placket',
      nameKey: 'parts.placket.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'standard',
      variants: [
        { id: 'standard', nameKey: 'parts.placket.variants.standard', svgPath: '' },
        { id: 'hidden', nameKey: 'parts.placket.variants.hidden', svgPath: '' },
        { id: 'zipper', nameKey: 'parts.placket.variants.zipper', svgPath: '' },
      ],
    },
    {
      id: 'collar',
      nameKey: 'parts.collar.name',
      required: true,
      layerOrder: 4,
      defaultVariantId: 'classic',
      variants: [
        { id: 'classic', nameKey: 'parts.collar.variants.classic', svgPath: '' },
        { id: 'mandarin', nameKey: 'parts.collar.variants.mandarin', svgPath: '' },
        { id: 'johnny', nameKey: 'parts.collar.variants.johnny', svgPath: '' },
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
      ],
    },
  ],
}
