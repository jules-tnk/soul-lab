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
        { id: 'standard', nameKey: 'parts.waistband.variants.standard', svgPath: '' },
        { id: 'high', nameKey: 'parts.waistband.variants.high', svgPath: '' },
        { id: 'low', nameKey: 'parts.waistband.variants.low', svgPath: '' },
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
      id: 'leg-shape',
      nameKey: 'parts.leg-shape.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'straight',
      variants: [
        { id: 'straight', nameKey: 'parts.leg-shape.variants.straight', svgPath: '' },
        { id: 'skinny', nameKey: 'parts.leg-shape.variants.skinny', svgPath: '' },
        { id: 'slim', nameKey: 'parts.leg-shape.variants.slim', svgPath: '' },
        { id: 'bootcut', nameKey: 'parts.leg-shape.variants.bootcut', svgPath: '' },
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
      id: 'fly',
      nameKey: 'parts.fly.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'zipper',
      variants: [
        { id: 'zipper', nameKey: 'parts.fly.variants.zipper', svgPath: '' },
        { id: 'button', nameKey: 'parts.fly.variants.button', svgPath: '' },
      ],
    },
    {
      id: 'pockets',
      nameKey: 'parts.pockets.name',
      required: false,
      layerOrder: 3,
      defaultVariantId: 'classic',
      variants: [
        { id: 'classic', nameKey: 'parts.pockets.variants.classic', svgPath: '' },
        { id: 'patch', nameKey: 'parts.pockets.variants.patch', svgPath: '' },
        { id: 'minimal', nameKey: 'parts.pockets.variants.minimal', svgPath: '' },
        { id: 'none', nameKey: 'parts.pockets.variants.none', svgPath: '' },
      ],
    },
  ],
}
