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
        { id: 'standard', nameKey: 'parts.waistband.variants.standard', svgPath: 'bottoms/pleated-skirt/waistband/standard.svg' },
        { id: 'high', nameKey: 'parts.waistband.variants.high', svgPath: 'bottoms/pleated-skirt/waistband/high.svg' },
        { id: 'elastic', nameKey: 'parts.waistband.variants.elastic', svgPath: 'bottoms/pleated-skirt/waistband/elastic.svg' },
      ],
    },
    {
      id: 'pleat-type',
      nameKey: 'parts.pleat-type.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'knife',
      variants: [
        { id: 'knife', nameKey: 'parts.pleat-type.variants.knife', svgPath: 'bottoms/pleated-skirt/pleat-type/knife.svg' },
        { id: 'box', nameKey: 'parts.pleat-type.variants.box', svgPath: 'bottoms/pleated-skirt/pleat-type/box.svg' },
        { id: 'accordion', nameKey: 'parts.pleat-type.variants.accordion', svgPath: 'bottoms/pleated-skirt/pleat-type/accordion.svg' },
        { id: 'sunburst', nameKey: 'parts.pleat-type.variants.sunburst', svgPath: 'bottoms/pleated-skirt/pleat-type/sunburst.svg' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'knee',
      variants: [
        { id: 'mini', nameKey: 'parts.length.variants.mini', svgPath: 'bottoms/pleated-skirt/length/mini.svg' },
        { id: 'knee', nameKey: 'parts.length.variants.knee', svgPath: 'bottoms/pleated-skirt/length/knee.svg' },
        { id: 'midi', nameKey: 'parts.length.variants.midi', svgPath: 'bottoms/pleated-skirt/length/midi.svg' },
        { id: 'maxi', nameKey: 'parts.length.variants.maxi', svgPath: 'bottoms/pleated-skirt/length/maxi.svg' },
        { id: 'tea-length', nameKey: 'parts.length.variants.tea-length', svgPath: 'bottoms/pleated-skirt/length/tea-length.svg' },
      ],
    },
    {
      id: 'hem',
      nameKey: 'parts.hem.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'straight',
      variants: [
        { id: 'straight', nameKey: 'parts.hem.variants.straight', svgPath: 'bottoms/pleated-skirt/hem/straight.svg' },
        { id: 'raw', nameKey: 'parts.hem.variants.raw', svgPath: 'bottoms/pleated-skirt/hem/raw.svg' },
      ],
    },
  ],
}
