import type { GarmentType } from '../../types'

export const tshirt: GarmentType = {
  id: 'tshirt',
  categoryId: 'tops',
  nameKey: 'garments.tops.tshirt.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'fit',
      nameKey: 'parts.fit.name',
      required: true,
      layerOrder: 0,
      defaultVariantId: 'regular',
      variants: [
        { id: 'slim',      nameKey: 'parts.fit.variants.slim',      svgPath: 'tops/tshirt/fit/slim.svg' },
        { id: 'regular',   nameKey: 'parts.fit.variants.regular',   svgPath: 'tops/tshirt/fit/regular.svg' },
        { id: 'relaxed',   nameKey: 'parts.fit.variants.relaxed',   svgPath: 'tops/tshirt/fit/relaxed.svg' },
        { id: 'oversized', nameKey: 'parts.fit.variants.oversized', svgPath: 'tops/tshirt/fit/oversized.svg' },
      ],
    },
    {
      id: 'hem',
      nameKey: 'parts.hem.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'straight',
      variants: [
        { id: 'straight', nameKey: 'parts.hem.variants.straight', svgPath: 'tops/tshirt/hem/straight.svg' },
        { id: 'curved',   nameKey: 'parts.hem.variants.curved',   svgPath: 'tops/tshirt/hem/curved.svg' },
        { id: 'split',    nameKey: 'parts.hem.variants.split',    svgPath: 'tops/tshirt/hem/split.svg' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'regular',
      variants: [
        { id: 'cropped',  nameKey: 'parts.length.variants.cropped',  svgPath: 'tops/tshirt/length/cropped.svg' },
        { id: 'regular',  nameKey: 'parts.length.variants.regular',  svgPath: 'tops/tshirt/length/regular.svg' },
        { id: 'longline', nameKey: 'parts.length.variants.longline', svgPath: 'tops/tshirt/length/longline.svg' },
      ],
    },
    {
      id: 'neckline',
      nameKey: 'parts.neckline.name',
      required: true,
      layerOrder: 3,
      defaultVariantId: 'crew',
      variants: [
        { id: 'crew',   nameKey: 'parts.neckline.variants.crew',   svgPath: 'tops/tshirt/neckline/crew.svg' },
        { id: 'v-neck', nameKey: 'parts.neckline.variants.v-neck', svgPath: 'tops/tshirt/neckline/v-neck.svg' },
        { id: 'scoop',  nameKey: 'parts.neckline.variants.scoop',  svgPath: 'tops/tshirt/neckline/scoop.svg' },
        { id: 'henley', nameKey: 'parts.neckline.variants.henley', svgPath: 'tops/tshirt/neckline/henley.svg' },
        { id: 'mock',   nameKey: 'parts.neckline.variants.mock',   svgPath: 'tops/tshirt/neckline/mock.svg' },
      ],
    },
    {
      id: 'sleeves',
      nameKey: 'parts.sleeves.name',
      required: true,
      layerOrder: 5,
      defaultVariantId: 'short',
      variants: [
        { id: 'short',         nameKey: 'parts.sleeves.variants.short',         svgPath: 'tops/tshirt/sleeves/short.svg' },
        { id: 'long',          nameKey: 'parts.sleeves.variants.long',          svgPath: 'tops/tshirt/sleeves/long.svg' },
        { id: 'three-quarter', nameKey: 'parts.sleeves.variants.three-quarter', svgPath: 'tops/tshirt/sleeves/three-quarter.svg' },
        { id: 'raglan',        nameKey: 'parts.sleeves.variants.raglan',        svgPath: 'tops/tshirt/sleeves/raglan.svg' },
        { id: 'cap',           nameKey: 'parts.sleeves.variants.cap',           svgPath: 'tops/tshirt/sleeves/cap.svg' },
      ],
    },
  ],
}
