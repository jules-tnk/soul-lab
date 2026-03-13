import type { GarmentType } from '../../types'

export const tankTop: GarmentType = {
  id: 'tank-top',
  categoryId: 'tops',
  nameKey: 'garments.tops.tank-top.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'fit',
      nameKey: 'parts.fit.name',
      required: true,
      layerOrder: 0,
      defaultVariantId: 'regular',
      variants: [
        { id: 'slim', nameKey: 'parts.fit.variants.slim', svgPath: 'tops/tank-top/fit/slim.svg' },
        { id: 'regular', nameKey: 'parts.fit.variants.regular', svgPath: 'tops/tank-top/fit/regular.svg' },
        { id: 'relaxed', nameKey: 'parts.fit.variants.relaxed', svgPath: 'tops/tank-top/fit/relaxed.svg' },
      ],
    },
    {
      id: 'hem',
      nameKey: 'parts.hem.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'straight',
      variants: [
        { id: 'straight', nameKey: 'parts.hem.variants.straight', svgPath: 'tops/tank-top/hem/straight.svg' },
        { id: 'curved', nameKey: 'parts.hem.variants.curved', svgPath: 'tops/tank-top/hem/curved.svg' },
        { id: 'cropped', nameKey: 'parts.hem.variants.cropped', svgPath: 'tops/tank-top/hem/cropped.svg' },
      ],
    },
    {
      id: 'neckline',
      nameKey: 'parts.neckline.name',
      required: true,
      layerOrder: 3,
      defaultVariantId: 'scoop',
      variants: [
        { id: 'scoop', nameKey: 'parts.neckline.variants.scoop', svgPath: 'tops/tank-top/neckline/scoop.svg' },
        { id: 'square', nameKey: 'parts.neckline.variants.square', svgPath: 'tops/tank-top/neckline/square.svg' },
        { id: 'v-neck', nameKey: 'parts.neckline.variants.v-neck', svgPath: 'tops/tank-top/neckline/v-neck.svg' },
        { id: 'halter', nameKey: 'parts.neckline.variants.halter', svgPath: 'tops/tank-top/neckline/halter.svg' },
      ],
    },
    {
      id: 'straps',
      nameKey: 'parts.straps.name',
      required: true,
      layerOrder: 5,
      defaultVariantId: 'wide',
      variants: [
        { id: 'wide', nameKey: 'parts.straps.variants.wide', svgPath: 'tops/tank-top/straps/wide.svg' },
        { id: 'thin', nameKey: 'parts.straps.variants.thin', svgPath: 'tops/tank-top/straps/thin.svg' },
        { id: 'racerback', nameKey: 'parts.straps.variants.racerback', svgPath: 'tops/tank-top/straps/racerback.svg' },
        { id: 'spaghetti', nameKey: 'parts.straps.variants.spaghetti', svgPath: 'tops/tank-top/straps/spaghetti.svg' },
        { id: 'halter', nameKey: 'parts.straps.variants.halter', svgPath: 'tops/tank-top/straps/halter.svg' },
      ],
    },
    {
      id: 'back',
      nameKey: 'parts.back.name',
      required: false,
      layerOrder: 1,
      defaultVariantId: 'standard',
      variants: [
        { id: 'standard', nameKey: 'parts.back.variants.standard', svgPath: 'tops/tank-top/back/standard.svg' },
        { id: 'racerback', nameKey: 'parts.back.variants.racerback', svgPath: 'tops/tank-top/back/racerback.svg' },
        { id: 'open', nameKey: 'parts.back.variants.open', svgPath: 'tops/tank-top/back/open.svg' },
      ],
    },
  ],
}
