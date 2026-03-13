import type { GarmentType } from '../../types'

export const jeans: GarmentType = {
  id: 'jeans',
  categoryId: 'bottoms',
  nameKey: 'garments.bottoms.jeans.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'waistband',
      nameKey: 'parts.waistband.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'standard',
      variants: [
        { id: 'standard', nameKey: 'parts.waistband.variants.standard', svgPath: 'bottoms/jeans/waistband/standard.svg' },
        { id: 'high', nameKey: 'parts.waistband.variants.high', svgPath: 'bottoms/jeans/waistband/high.svg' },
        { id: 'low', nameKey: 'parts.waistband.variants.low', svgPath: 'bottoms/jeans/waistband/low.svg' },
      ],
    },
    {
      id: 'rise',
      nameKey: 'parts.rise.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'mid',
      variants: [
        { id: 'high', nameKey: 'parts.rise.variants.high', svgPath: 'bottoms/jeans/rise/high.svg' },
        { id: 'mid', nameKey: 'parts.rise.variants.mid', svgPath: 'bottoms/jeans/rise/mid.svg' },
        { id: 'low', nameKey: 'parts.rise.variants.low', svgPath: 'bottoms/jeans/rise/low.svg' },
      ],
    },
    {
      id: 'leg-shape',
      nameKey: 'parts.leg-shape.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'straight',
      variants: [
        { id: 'straight', nameKey: 'parts.leg-shape.variants.straight', svgPath: 'bottoms/jeans/leg-shape/straight.svg' },
        { id: 'skinny', nameKey: 'parts.leg-shape.variants.skinny', svgPath: 'bottoms/jeans/leg-shape/skinny.svg' },
        { id: 'slim', nameKey: 'parts.leg-shape.variants.slim', svgPath: 'bottoms/jeans/leg-shape/slim.svg' },
        { id: 'bootcut', nameKey: 'parts.leg-shape.variants.bootcut', svgPath: 'bottoms/jeans/leg-shape/bootcut.svg' },
        { id: 'wide', nameKey: 'parts.leg-shape.variants.wide', svgPath: 'bottoms/jeans/leg-shape/wide.svg' },
      ],
    },
    {
      id: 'hem',
      nameKey: 'parts.hem.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'straight',
      variants: [
        { id: 'straight', nameKey: 'parts.hem.variants.straight', svgPath: 'bottoms/jeans/hem/straight.svg' },
        { id: 'cuffed', nameKey: 'parts.hem.variants.cuffed', svgPath: 'bottoms/jeans/hem/cuffed.svg' },
        { id: 'raw', nameKey: 'parts.hem.variants.raw', svgPath: 'bottoms/jeans/hem/raw.svg' },
      ],
    },
    {
      id: 'fly',
      nameKey: 'parts.fly.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'zipper',
      variants: [
        { id: 'zipper', nameKey: 'parts.fly.variants.zipper', svgPath: 'bottoms/jeans/fly/zipper.svg' },
        { id: 'button', nameKey: 'parts.fly.variants.button', svgPath: 'bottoms/jeans/fly/button.svg' },
      ],
    },
    {
      id: 'pockets',
      nameKey: 'parts.pockets.name',
      required: false,
      layerOrder: 3,
      defaultVariantId: 'classic',
      variants: [
        { id: 'classic', nameKey: 'parts.pockets.variants.classic', svgPath: 'bottoms/jeans/pockets/classic.svg' },
        { id: 'patch', nameKey: 'parts.pockets.variants.patch', svgPath: 'bottoms/jeans/pockets/patch.svg' },
        { id: 'minimal', nameKey: 'parts.pockets.variants.minimal', svgPath: 'bottoms/jeans/pockets/minimal.svg' },
        { id: 'none', nameKey: 'parts.pockets.variants.none', svgPath: 'bottoms/jeans/pockets/none.svg' },
      ],
    },
  ],
}
