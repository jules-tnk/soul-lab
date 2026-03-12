import type { GarmentType } from '../../types'

export const pencilSkirt: GarmentType = {
  id: 'pencil-skirt',
  categoryId: 'bottoms',
  nameKey: 'garments.bottoms.pencil-skirt.name',
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
        { id: 'corset', nameKey: 'parts.waistband.variants.corset', svgPath: '' },
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
        { id: 'ankle', nameKey: 'parts.length.variants.ankle', svgPath: '' },
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
        { id: 'flounce', nameKey: 'parts.hem.variants.flounce', svgPath: '' },
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
        { id: 'center-back', nameKey: 'parts.slit.variants.center-back', svgPath: '' },
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
  ],
}
