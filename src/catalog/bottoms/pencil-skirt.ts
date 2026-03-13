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
        { id: 'standard', nameKey: 'parts.waistband.variants.standard', svgPath: 'bottoms/pencil-skirt/waistband/standard.svg' },
        { id: 'high', nameKey: 'parts.waistband.variants.high', svgPath: 'bottoms/pencil-skirt/waistband/high.svg' },
        { id: 'corset', nameKey: 'parts.waistband.variants.corset', svgPath: 'bottoms/pencil-skirt/waistband/corset.svg' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'knee',
      variants: [
        { id: 'above-knee', nameKey: 'parts.length.variants.above-knee', svgPath: 'bottoms/pencil-skirt/length/above-knee.svg' },
        { id: 'knee', nameKey: 'parts.length.variants.knee', svgPath: 'bottoms/pencil-skirt/length/knee.svg' },
        { id: 'midi', nameKey: 'parts.length.variants.midi', svgPath: 'bottoms/pencil-skirt/length/midi.svg' },
        { id: 'ankle', nameKey: 'parts.length.variants.ankle', svgPath: 'bottoms/pencil-skirt/length/ankle.svg' },
      ],
    },
    {
      id: 'hem',
      nameKey: 'parts.hem.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'straight',
      variants: [
        { id: 'straight', nameKey: 'parts.hem.variants.straight', svgPath: 'bottoms/pencil-skirt/hem/straight.svg' },
        { id: 'flounce', nameKey: 'parts.hem.variants.flounce', svgPath: 'bottoms/pencil-skirt/hem/flounce.svg' },
      ],
    },
    {
      id: 'slit',
      nameKey: 'parts.slit.name',
      required: false,
      layerOrder: 1,
      defaultVariantId: 'none',
      variants: [
        { id: 'none', nameKey: 'parts.slit.variants.none', svgPath: 'bottoms/pencil-skirt/slit/none.svg' },
        { id: 'center-back', nameKey: 'parts.slit.variants.center-back', svgPath: 'bottoms/pencil-skirt/slit/center-back.svg' },
        { id: 'side', nameKey: 'parts.slit.variants.side', svgPath: 'bottoms/pencil-skirt/slit/side.svg' },
      ],
    },
    {
      id: 'closure',
      nameKey: 'parts.closure.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'zipper',
      variants: [
        { id: 'zipper', nameKey: 'parts.closure.variants.zipper', svgPath: 'bottoms/pencil-skirt/closure/zipper.svg' },
        { id: 'buttons', nameKey: 'parts.closure.variants.buttons', svgPath: 'bottoms/pencil-skirt/closure/buttons.svg' },
        { id: 'hook', nameKey: 'parts.closure.variants.hook', svgPath: 'bottoms/pencil-skirt/closure/hook.svg' },
      ],
    },
  ],
}
