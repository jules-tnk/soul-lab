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
        { id: 'slim', nameKey: 'parts.fit.variants.slim', svgPath: '' },
        { id: 'regular', nameKey: 'parts.fit.variants.regular', svgPath: '' },
        { id: 'relaxed', nameKey: 'parts.fit.variants.relaxed', svgPath: '' },
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
        { id: 'curved', nameKey: 'parts.hem.variants.curved', svgPath: '' },
        { id: 'cropped', nameKey: 'parts.hem.variants.cropped', svgPath: '' },
      ],
    },
    {
      id: 'neckline',
      nameKey: 'parts.neckline.name',
      required: true,
      layerOrder: 3,
      defaultVariantId: 'scoop',
      variants: [
        { id: 'scoop', nameKey: 'parts.neckline.variants.scoop', svgPath: '' },
        { id: 'square', nameKey: 'parts.neckline.variants.square', svgPath: '' },
        { id: 'v-neck', nameKey: 'parts.neckline.variants.v-neck', svgPath: '' },
        { id: 'halter', nameKey: 'parts.neckline.variants.halter', svgPath: '' },
      ],
    },
    {
      id: 'straps',
      nameKey: 'parts.straps.name',
      required: true,
      layerOrder: 5,
      defaultVariantId: 'wide',
      variants: [
        { id: 'wide', nameKey: 'parts.straps.variants.wide', svgPath: '' },
        { id: 'thin', nameKey: 'parts.straps.variants.thin', svgPath: '' },
        { id: 'racerback', nameKey: 'parts.straps.variants.racerback', svgPath: '' },
        { id: 'spaghetti', nameKey: 'parts.straps.variants.spaghetti', svgPath: '' },
        { id: 'halter', nameKey: 'parts.straps.variants.halter', svgPath: '' },
      ],
    },
    {
      id: 'back',
      nameKey: 'parts.back.name',
      required: false,
      layerOrder: 1,
      defaultVariantId: 'standard',
      variants: [
        { id: 'standard', nameKey: 'parts.back.variants.standard', svgPath: '' },
        { id: 'racerback', nameKey: 'parts.back.variants.racerback', svgPath: '' },
        { id: 'open', nameKey: 'parts.back.variants.open', svgPath: '' },
      ],
    },
  ],
}
