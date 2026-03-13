import type { GarmentType } from '../../types'

export const trenchCoat: GarmentType = {
  id: 'trench-coat',
  categoryId: 'outerwear',
  nameKey: 'garments.outerwear.trench-coat.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'mid',
      variants: [
        { id: 'short', nameKey: 'parts.length.variants.short', svgPath: 'outerwear/trench-coat/length/short.svg' },
        { id: 'mid', nameKey: 'parts.length.variants.mid', svgPath: 'outerwear/trench-coat/length/mid.svg' },
        { id: 'long', nameKey: 'parts.length.variants.long', svgPath: 'outerwear/trench-coat/length/long.svg' },
        { id: 'ankle', nameKey: 'parts.length.variants.ankle', svgPath: 'outerwear/trench-coat/length/ankle.svg' },
      ],
    },
    {
      id: 'belt',
      nameKey: 'parts.belt.name',
      required: false,
      layerOrder: 2,
      defaultVariantId: 'self-tie',
      variants: [
        { id: 'self-tie', nameKey: 'parts.belt.variants.self-tie', svgPath: 'outerwear/trench-coat/belt/self-tie.svg' },
        { id: 'buckle', nameKey: 'parts.belt.variants.buckle', svgPath: 'outerwear/trench-coat/belt/buckle.svg' },
        { id: 'none', nameKey: 'parts.belt.variants.none', svgPath: 'outerwear/trench-coat/belt/none.svg' },
      ],
    },
    {
      id: 'closure',
      nameKey: 'parts.closure.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'double-breasted',
      variants: [
        { id: 'double-breasted', nameKey: 'parts.closure.variants.double-breasted', svgPath: 'outerwear/trench-coat/closure/double-breasted.svg' },
        { id: 'single-button', nameKey: 'parts.closure.variants.single-button', svgPath: 'outerwear/trench-coat/closure/single-button.svg' },
        { id: 'hidden', nameKey: 'parts.closure.variants.hidden', svgPath: 'outerwear/trench-coat/closure/hidden.svg' },
      ],
    },
    {
      id: 'pockets',
      nameKey: 'parts.pockets.name',
      required: false,
      layerOrder: 3,
      defaultVariantId: 'flap',
      variants: [
        { id: 'flap', nameKey: 'parts.pockets.variants.flap', svgPath: 'outerwear/trench-coat/pockets/flap.svg' },
        { id: 'welt', nameKey: 'parts.pockets.variants.welt', svgPath: 'outerwear/trench-coat/pockets/welt.svg' },
        { id: 'slash', nameKey: 'parts.pockets.variants.slash', svgPath: 'outerwear/trench-coat/pockets/slash.svg' },
      ],
    },
    {
      id: 'lapels',
      nameKey: 'parts.lapels.name',
      required: true,
      layerOrder: 4,
      defaultVariantId: 'notch',
      variants: [
        { id: 'notch', nameKey: 'parts.lapels.variants.notch', svgPath: 'outerwear/trench-coat/lapels/notch.svg' },
        { id: 'peak', nameKey: 'parts.lapels.variants.peak', svgPath: 'outerwear/trench-coat/lapels/peak.svg' },
        { id: 'gun-flap', nameKey: 'parts.lapels.variants.gun-flap', svgPath: 'outerwear/trench-coat/lapels/gun-flap.svg' },
      ],
    },
    {
      id: 'collar',
      nameKey: 'parts.collar.name',
      required: true,
      layerOrder: 4,
      defaultVariantId: 'classic',
      variants: [
        { id: 'classic', nameKey: 'parts.collar.variants.classic', svgPath: 'outerwear/trench-coat/collar/classic.svg' },
        { id: 'stand', nameKey: 'parts.collar.variants.stand', svgPath: 'outerwear/trench-coat/collar/stand.svg' },
        { id: 'storm', nameKey: 'parts.collar.variants.storm', svgPath: 'outerwear/trench-coat/collar/storm.svg' },
      ],
    },
    {
      id: 'sleeves',
      nameKey: 'parts.sleeves.name',
      required: true,
      layerOrder: 5,
      defaultVariantId: 'long',
      variants: [
        { id: 'long', nameKey: 'parts.sleeves.variants.long', svgPath: 'outerwear/trench-coat/sleeves/long.svg' },
        { id: 'raglan', nameKey: 'parts.sleeves.variants.raglan', svgPath: 'outerwear/trench-coat/sleeves/raglan.svg' },
      ],
    },
  ],
}
