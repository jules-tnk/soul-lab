import type { GarmentType } from '../../types'

export const blazer: GarmentType = {
  id: 'blazer',
  categoryId: 'outerwear',
  nameKey: 'garments.outerwear.blazer.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'fit',
      nameKey: 'parts.fit.name',
      required: true,
      layerOrder: 0,
      defaultVariantId: 'regular',
      variants: [
        { id: 'slim', nameKey: 'parts.fit.variants.slim', svgPath: 'outerwear/blazer/fit/slim.svg' },
        { id: 'regular', nameKey: 'parts.fit.variants.regular', svgPath: 'outerwear/blazer/fit/regular.svg' },
        { id: 'oversized', nameKey: 'parts.fit.variants.oversized', svgPath: 'outerwear/blazer/fit/oversized.svg' },
      ],
    },
    {
      id: 'vents',
      nameKey: 'parts.vents.name',
      required: false,
      layerOrder: 1,
      defaultVariantId: 'none',
      variants: [
        { id: 'none', nameKey: 'parts.vents.variants.none', svgPath: 'outerwear/blazer/vents/none.svg' },
        { id: 'center', nameKey: 'parts.vents.variants.center', svgPath: 'outerwear/blazer/vents/center.svg' },
        { id: 'side', nameKey: 'parts.vents.variants.side', svgPath: 'outerwear/blazer/vents/side.svg' },
      ],
    },
    {
      id: 'closure',
      nameKey: 'parts.closure.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'single-button',
      variants: [
        { id: 'single-button', nameKey: 'parts.closure.variants.single-button', svgPath: 'outerwear/blazer/closure/single-button.svg' },
        { id: 'double-breasted', nameKey: 'parts.closure.variants.double-breasted', svgPath: 'outerwear/blazer/closure/double-breasted.svg' },
        { id: 'open', nameKey: 'parts.closure.variants.open', svgPath: 'outerwear/blazer/closure/open.svg' },
      ],
    },
    {
      id: 'pockets',
      nameKey: 'parts.pockets.name',
      required: false,
      layerOrder: 3,
      defaultVariantId: 'flap',
      variants: [
        { id: 'flap', nameKey: 'parts.pockets.variants.flap', svgPath: 'outerwear/blazer/pockets/flap.svg' },
        { id: 'welt', nameKey: 'parts.pockets.variants.welt', svgPath: 'outerwear/blazer/pockets/welt.svg' },
        { id: 'patch', nameKey: 'parts.pockets.variants.patch', svgPath: 'outerwear/blazer/pockets/patch.svg' },
        { id: 'none', nameKey: 'parts.pockets.variants.none', svgPath: 'outerwear/blazer/pockets/none.svg' },
      ],
    },
    {
      id: 'lapels',
      nameKey: 'parts.lapels.name',
      required: true,
      layerOrder: 4,
      defaultVariantId: 'notch',
      variants: [
        { id: 'notch', nameKey: 'parts.lapels.variants.notch', svgPath: 'outerwear/blazer/lapels/notch.svg' },
        { id: 'peak', nameKey: 'parts.lapels.variants.peak', svgPath: 'outerwear/blazer/lapels/peak.svg' },
        { id: 'shawl', nameKey: 'parts.lapels.variants.shawl', svgPath: 'outerwear/blazer/lapels/shawl.svg' },
        { id: 'none', nameKey: 'parts.lapels.variants.none', svgPath: 'outerwear/blazer/lapels/none.svg' },
      ],
    },
    {
      id: 'collar',
      nameKey: 'parts.collar.name',
      required: true,
      layerOrder: 4,
      defaultVariantId: 'standard',
      variants: [
        { id: 'standard', nameKey: 'parts.collar.variants.standard', svgPath: 'outerwear/blazer/collar/standard.svg' },
        { id: 'mandarin', nameKey: 'parts.collar.variants.mandarin', svgPath: 'outerwear/blazer/collar/mandarin.svg' },
        { id: 'stand', nameKey: 'parts.collar.variants.stand', svgPath: 'outerwear/blazer/collar/stand.svg' },
      ],
    },
    {
      id: 'sleeves',
      nameKey: 'parts.sleeves.name',
      required: true,
      layerOrder: 5,
      defaultVariantId: 'long',
      variants: [
        { id: 'long', nameKey: 'parts.sleeves.variants.long', svgPath: 'outerwear/blazer/sleeves/long.svg' },
        { id: 'three-quarter', nameKey: 'parts.sleeves.variants.three-quarter', svgPath: 'outerwear/blazer/sleeves/three-quarter.svg' },
        { id: 'pushed-up', nameKey: 'parts.sleeves.variants.pushed-up', svgPath: 'outerwear/blazer/sleeves/pushed-up.svg' },
      ],
    },
  ],
}
