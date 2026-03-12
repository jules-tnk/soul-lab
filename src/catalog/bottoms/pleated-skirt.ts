import type { GarmentType } from '../../types'

export const pleatedSkirt: GarmentType = {
  id: 'pleated-skirt',
  categoryId: 'bottoms',
  nameKey: 'garments.bottoms.pleated-skirt.name',
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
      id: 'pleat-type',
      nameKey: 'parts.pleat-type.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'knife',
      variants: [
        { id: 'knife', nameKey: 'parts.pleat-type.variants.knife', svgPath: '' },
        { id: 'box', nameKey: 'parts.pleat-type.variants.box', svgPath: '' },
        { id: 'accordion', nameKey: 'parts.pleat-type.variants.accordion', svgPath: '' },
        { id: 'sunburst', nameKey: 'parts.pleat-type.variants.sunburst', svgPath: '' },
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
        { id: 'raw', nameKey: 'parts.hem.variants.raw', svgPath: '' },
      ],
    },
  ],
}
