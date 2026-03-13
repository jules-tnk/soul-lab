import type { GarmentType } from '../../types'

export const shorts: GarmentType = {
  id: 'shorts',
  categoryId: 'bottoms',
  nameKey: 'garments.bottoms.shorts.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'waistband',
      nameKey: 'parts.waistband.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'standard',
      variants: [
        { id: 'standard', nameKey: 'parts.waistband.variants.standard', svgPath: 'bottoms/shorts/waistband/standard.svg' },
        { id: 'high', nameKey: 'parts.waistband.variants.high', svgPath: 'bottoms/shorts/waistband/high.svg' },
        { id: 'elastic', nameKey: 'parts.waistband.variants.elastic', svgPath: 'bottoms/shorts/waistband/elastic.svg' },
      ],
    },
    {
      id: 'rise',
      nameKey: 'parts.rise.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'mid',
      variants: [
        { id: 'high', nameKey: 'parts.rise.variants.high', svgPath: 'bottoms/shorts/rise/high.svg' },
        { id: 'mid', nameKey: 'parts.rise.variants.mid', svgPath: 'bottoms/shorts/rise/mid.svg' },
        { id: 'low', nameKey: 'parts.rise.variants.low', svgPath: 'bottoms/shorts/rise/low.svg' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'mid-thigh',
      variants: [
        { id: 'short', nameKey: 'parts.length.variants.short', svgPath: 'bottoms/shorts/length/short.svg' },
        { id: 'mid-thigh', nameKey: 'parts.length.variants.mid-thigh', svgPath: 'bottoms/shorts/length/mid-thigh.svg' },
        { id: 'bermuda', nameKey: 'parts.length.variants.bermuda', svgPath: 'bottoms/shorts/length/bermuda.svg' },
        { id: 'long', nameKey: 'parts.length.variants.long', svgPath: 'bottoms/shorts/length/long.svg' },
      ],
    },
    {
      id: 'leg-shape',
      nameKey: 'parts.leg-shape.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'straight',
      variants: [
        { id: 'straight', nameKey: 'parts.leg-shape.variants.straight', svgPath: 'bottoms/shorts/leg-shape/straight.svg' },
        { id: 'relaxed', nameKey: 'parts.leg-shape.variants.relaxed', svgPath: 'bottoms/shorts/leg-shape/relaxed.svg' },
        { id: 'slim', nameKey: 'parts.leg-shape.variants.slim', svgPath: 'bottoms/shorts/leg-shape/slim.svg' },
        { id: 'wide', nameKey: 'parts.leg-shape.variants.wide', svgPath: 'bottoms/shorts/leg-shape/wide.svg' },
      ],
    },
    {
      id: 'hem',
      nameKey: 'parts.hem.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'straight',
      variants: [
        { id: 'straight', nameKey: 'parts.hem.variants.straight', svgPath: 'bottoms/shorts/hem/straight.svg' },
        { id: 'cuffed', nameKey: 'parts.hem.variants.cuffed', svgPath: 'bottoms/shorts/hem/cuffed.svg' },
        { id: 'raw', nameKey: 'parts.hem.variants.raw', svgPath: 'bottoms/shorts/hem/raw.svg' },
      ],
    },
    {
      id: 'pockets',
      nameKey: 'parts.pockets.name',
      required: false,
      layerOrder: 3,
      defaultVariantId: 'slash',
      variants: [
        { id: 'slash', nameKey: 'parts.pockets.variants.slash', svgPath: 'bottoms/shorts/pockets/slash.svg' },
        { id: 'cargo', nameKey: 'parts.pockets.variants.cargo', svgPath: 'bottoms/shorts/pockets/cargo.svg' },
        { id: 'welt', nameKey: 'parts.pockets.variants.welt', svgPath: 'bottoms/shorts/pockets/welt.svg' },
        { id: 'none', nameKey: 'parts.pockets.variants.none', svgPath: 'bottoms/shorts/pockets/none.svg' },
      ],
    },
  ],
}
