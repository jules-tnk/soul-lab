import type { GarmentType } from '../../types'

export const aLineSkirt: GarmentType = {
  id: 'a-line-skirt',
  categoryId: 'bottoms',
  nameKey: 'garments.bottoms.a-line-skirt.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'waistband',
      nameKey: 'parts.waistband.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'standard',
      variants: [
        { id: 'standard', nameKey: 'parts.waistband.variants.standard', svgPath: '' },
        { id: 'high', nameKey: 'parts.waistband.variants.high', svgPath: '' },
        { id: 'yoke', nameKey: 'parts.waistband.variants.yoke', svgPath: '' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'knee',
      variants: [
        { id: 'mini', nameKey: 'parts.length.variants.mini', svgPath: '' },
        { id: 'knee', nameKey: 'parts.length.variants.knee', svgPath: '' },
        { id: 'midi', nameKey: 'parts.length.variants.midi', svgPath: '' },
        { id: 'maxi', nameKey: 'parts.length.variants.maxi', svgPath: '' },
        { id: 'tea-length', nameKey: 'parts.length.variants.tea-length', svgPath: '' },
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
        { id: 'ruffled', nameKey: 'parts.hem.variants.ruffled', svgPath: '' },
        { id: 'scalloped', nameKey: 'parts.hem.variants.scalloped', svgPath: '' },
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
        { id: 'elastic', nameKey: 'parts.closure.variants.elastic', svgPath: '' },
      ],
    },
  ],
}
