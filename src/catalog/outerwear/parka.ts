import type { GarmentType } from '../../types'

export const parka: GarmentType = {
  id: 'parka',
  categoryId: 'outerwear',
  nameKey: 'garments.outerwear.parka.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'hood',
      nameKey: 'parts.hood.name',
      required: false,
      layerOrder: 0,
      defaultVariantId: 'standard',
      variants: [
        { id: 'standard', nameKey: 'parts.hood.variants.standard', svgPath: 'outerwear/parka/hood/standard.svg' },
        { id: 'fur-trim', nameKey: 'parts.hood.variants.fur-trim', svgPath: 'outerwear/parka/hood/fur-trim.svg' },
        { id: 'detachable', nameKey: 'parts.hood.variants.detachable', svgPath: 'outerwear/parka/hood/detachable.svg' },
        { id: 'none', nameKey: 'parts.hood.variants.none', svgPath: 'outerwear/parka/hood/none.svg' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'mid-thigh',
      variants: [
        { id: 'hip', nameKey: 'parts.length.variants.hip', svgPath: 'outerwear/parka/length/hip.svg' },
        { id: 'mid-thigh', nameKey: 'parts.length.variants.mid-thigh', svgPath: 'outerwear/parka/length/mid-thigh.svg' },
        { id: 'knee', nameKey: 'parts.length.variants.knee', svgPath: 'outerwear/parka/length/knee.svg' },
      ],
    },
    {
      id: 'drawstring',
      nameKey: 'parts.drawstring.name',
      required: false,
      layerOrder: 1,
      defaultVariantId: 'waist',
      variants: [
        { id: 'waist', nameKey: 'parts.drawstring.variants.waist', svgPath: 'outerwear/parka/drawstring/waist.svg' },
        { id: 'hem', nameKey: 'parts.drawstring.variants.hem', svgPath: 'outerwear/parka/drawstring/hem.svg' },
        { id: 'none', nameKey: 'parts.drawstring.variants.none', svgPath: 'outerwear/parka/drawstring/none.svg' },
      ],
    },
    {
      id: 'closure',
      nameKey: 'parts.closure.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'zipper',
      variants: [
        { id: 'zipper', nameKey: 'parts.closure.variants.zipper', svgPath: 'outerwear/parka/closure/zipper.svg' },
        { id: 'snap', nameKey: 'parts.closure.variants.snap', svgPath: 'outerwear/parka/closure/snap.svg' },
      ],
    },
    {
      id: 'pockets',
      nameKey: 'parts.pockets.name',
      required: false,
      layerOrder: 3,
      defaultVariantId: 'flap',
      variants: [
        { id: 'flap', nameKey: 'parts.pockets.variants.flap', svgPath: 'outerwear/parka/pockets/flap.svg' },
        { id: 'cargo', nameKey: 'parts.pockets.variants.cargo', svgPath: 'outerwear/parka/pockets/cargo.svg' },
        { id: 'welt', nameKey: 'parts.pockets.variants.welt', svgPath: 'outerwear/parka/pockets/welt.svg' },
        { id: 'kangaroo', nameKey: 'parts.pockets.variants.kangaroo', svgPath: 'outerwear/parka/pockets/kangaroo.svg' },
      ],
    },
    {
      id: 'collar',
      nameKey: 'parts.collar.name',
      required: true,
      layerOrder: 4,
      defaultVariantId: 'standard',
      variants: [
        { id: 'standard', nameKey: 'parts.collar.variants.standard', svgPath: 'outerwear/parka/collar/standard.svg' },
        { id: 'funnel', nameKey: 'parts.collar.variants.funnel', svgPath: 'outerwear/parka/collar/funnel.svg' },
        { id: 'stand', nameKey: 'parts.collar.variants.stand', svgPath: 'outerwear/parka/collar/stand.svg' },
      ],
    },
    {
      id: 'sleeves',
      nameKey: 'parts.sleeves.name',
      required: true,
      layerOrder: 5,
      defaultVariantId: 'long',
      variants: [
        { id: 'long', nameKey: 'parts.sleeves.variants.long', svgPath: 'outerwear/parka/sleeves/long.svg' },
        { id: 'raglan', nameKey: 'parts.sleeves.variants.raglan', svgPath: 'outerwear/parka/sleeves/raglan.svg' },
      ],
    },
  ],
}
