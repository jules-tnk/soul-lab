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
        { id: 'slim', nameKey: 'parts.fit.variants.slim', svgPath: 'tops/polo/fit/slim.svg' },
        { id: 'regular', nameKey: 'parts.fit.variants.regular', svgPath: 'tops/polo/fit/regular.svg' },
        { id: 'relaxed', nameKey: 'parts.fit.variants.relaxed', svgPath: 'tops/polo/fit/relaxed.svg' },
      ],
    },
    {
      id: 'hem',
      nameKey: 'parts.hem.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'straight',
      variants: [
        { id: 'straight', nameKey: 'parts.hem.variants.straight', svgPath: 'tops/polo/hem/straight.svg' },
        { id: 'ribbed', nameKey: 'parts.hem.variants.ribbed', svgPath: 'tops/polo/hem/ribbed.svg' },
      ],
    },
    {
      id: 'placket',
      nameKey: 'parts.placket.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'standard',
      variants: [
        { id: 'standard', nameKey: 'parts.placket.variants.standard', svgPath: 'tops/polo/placket/standard.svg' },
        { id: 'hidden', nameKey: 'parts.placket.variants.hidden', svgPath: 'tops/polo/placket/hidden.svg' },
        { id: 'zipper', nameKey: 'parts.placket.variants.zipper', svgPath: 'tops/polo/placket/zipper.svg' },
      ],
    },
    {
      id: 'collar',
      nameKey: 'parts.collar.name',
      required: true,
      layerOrder: 4,
      defaultVariantId: 'classic',
      variants: [
        { id: 'classic', nameKey: 'parts.collar.variants.classic', svgPath: 'tops/polo/collar/classic.svg' },
        { id: 'mandarin', nameKey: 'parts.collar.variants.mandarin', svgPath: 'tops/polo/collar/mandarin.svg' },
        { id: 'johnny', nameKey: 'parts.collar.variants.johnny', svgPath: 'tops/polo/collar/johnny.svg' },
      ],
    },
    {
      id: 'sleeves',
      nameKey: 'parts.sleeves.name',
      required: true,
      layerOrder: 5,
      defaultVariantId: 'short',
      variants: [
        { id: 'short', nameKey: 'parts.sleeves.variants.short', svgPath: 'tops/polo/sleeves/short.svg' },
        { id: 'long', nameKey: 'parts.sleeves.variants.long', svgPath: 'tops/polo/sleeves/long.svg' },
        { id: 'three-quarter', nameKey: 'parts.sleeves.variants.three-quarter', svgPath: 'tops/polo/sleeves/three-quarter.svg' },
      ],
    },
  ],
}
