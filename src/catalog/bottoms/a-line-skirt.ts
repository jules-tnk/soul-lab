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
        { id: 'standard', nameKey: 'parts.waistband.variants.standard', svgPath: 'bottoms/a-line-skirt/waistband/standard.svg' },
        { id: 'high', nameKey: 'parts.waistband.variants.high', svgPath: 'bottoms/a-line-skirt/waistband/high.svg' },
        { id: 'yoke', nameKey: 'parts.waistband.variants.yoke', svgPath: 'bottoms/a-line-skirt/waistband/yoke.svg' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'knee',
      variants: [
        { id: 'mini', nameKey: 'parts.length.variants.mini', svgPath: 'bottoms/a-line-skirt/length/mini.svg' },
        { id: 'knee', nameKey: 'parts.length.variants.knee', svgPath: 'bottoms/a-line-skirt/length/knee.svg' },
        { id: 'midi', nameKey: 'parts.length.variants.midi', svgPath: 'bottoms/a-line-skirt/length/midi.svg' },
        { id: 'maxi', nameKey: 'parts.length.variants.maxi', svgPath: 'bottoms/a-line-skirt/length/maxi.svg' },
        { id: 'tea-length', nameKey: 'parts.length.variants.tea-length', svgPath: 'bottoms/a-line-skirt/length/tea-length.svg' },
      ],
    },
    {
      id: 'hem',
      nameKey: 'parts.hem.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'straight',
      variants: [
        { id: 'straight', nameKey: 'parts.hem.variants.straight', svgPath: 'bottoms/a-line-skirt/hem/straight.svg' },
        { id: 'ruffled', nameKey: 'parts.hem.variants.ruffled', svgPath: 'bottoms/a-line-skirt/hem/ruffled.svg' },
        { id: 'scalloped', nameKey: 'parts.hem.variants.scalloped', svgPath: 'bottoms/a-line-skirt/hem/scalloped.svg' },
      ],
    },
    {
      id: 'slit',
      nameKey: 'parts.slit.name',
      required: false,
      layerOrder: 1,
      defaultVariantId: 'none',
      variants: [
        { id: 'none', nameKey: 'parts.slit.variants.none', svgPath: 'bottoms/a-line-skirt/slit/none.svg' },
        { id: 'center', nameKey: 'parts.slit.variants.center', svgPath: 'bottoms/a-line-skirt/slit/center.svg' },
        { id: 'side', nameKey: 'parts.slit.variants.side', svgPath: 'bottoms/a-line-skirt/slit/side.svg' },
      ],
    },
    {
      id: 'closure',
      nameKey: 'parts.closure.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'zipper',
      variants: [
        { id: 'zipper', nameKey: 'parts.closure.variants.zipper', svgPath: 'bottoms/a-line-skirt/closure/zipper.svg' },
        { id: 'buttons', nameKey: 'parts.closure.variants.buttons', svgPath: 'bottoms/a-line-skirt/closure/buttons.svg' },
        { id: 'elastic', nameKey: 'parts.closure.variants.elastic', svgPath: 'bottoms/a-line-skirt/closure/elastic.svg' },
      ],
    },
  ],
}
