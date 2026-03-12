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
        { id: 'standard', nameKey: 'parts.waistband.variants.standard', svgPath: '' },
        { id: 'high', nameKey: 'parts.waistband.variants.high', svgPath: '' },
        { id: 'elastic', nameKey: 'parts.waistband.variants.elastic', svgPath: '' },
      ],
    },
    {
      id: 'rise',
      nameKey: 'parts.rise.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'mid',
      variants: [
        { id: 'high', nameKey: 'parts.rise.variants.high', svgPath: '' },
        { id: 'mid', nameKey: 'parts.rise.variants.mid', svgPath: '' },
        { id: 'low', nameKey: 'parts.rise.variants.low', svgPath: '' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'mid-thigh',
      variants: [
        { id: 'short', nameKey: 'parts.length.variants.short', svgPath: '' },
        { id: 'mid-thigh', nameKey: 'parts.length.variants.mid-thigh', svgPath: '' },
        { id: 'bermuda', nameKey: 'parts.length.variants.bermuda', svgPath: '' },
        { id: 'long', nameKey: 'parts.length.variants.long', svgPath: '' },
      ],
    },
    {
      id: 'leg-shape',
      nameKey: 'parts.leg-shape.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'straight',
      variants: [
        { id: 'straight', nameKey: 'parts.leg-shape.variants.straight', svgPath: '' },
        { id: 'relaxed', nameKey: 'parts.leg-shape.variants.relaxed', svgPath: '' },
        { id: 'slim', nameKey: 'parts.leg-shape.variants.slim', svgPath: '' },
        { id: 'wide', nameKey: 'parts.leg-shape.variants.wide', svgPath: '' },
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
        { id: 'cuffed', nameKey: 'parts.hem.variants.cuffed', svgPath: '' },
        { id: 'raw', nameKey: 'parts.hem.variants.raw', svgPath: '' },
      ],
    },
    {
      id: 'pockets',
      nameKey: 'parts.pockets.name',
      required: false,
      layerOrder: 3,
      defaultVariantId: 'slash',
      variants: [
        { id: 'slash', nameKey: 'parts.pockets.variants.slash', svgPath: '' },
        { id: 'cargo', nameKey: 'parts.pockets.variants.cargo', svgPath: '' },
        { id: 'welt', nameKey: 'parts.pockets.variants.welt', svgPath: '' },
        { id: 'none', nameKey: 'parts.pockets.variants.none', svgPath: '' },
      ],
    },
  ],
}
