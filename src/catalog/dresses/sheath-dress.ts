import type { GarmentType } from '../../types'

export const sheathDress: GarmentType = {
  id: 'sheath-dress',
  categoryId: 'dresses',
  nameKey: 'garments.dresses.sheath-dress.name',
  svgViewBox: '0 0 200 300',
  parts: [
    {
      id: 'bodice',
      nameKey: 'parts.bodice.name',
      required: true,
      layerOrder: 0,
      defaultVariantId: 'fitted',
      variants: [
        { id: 'fitted', nameKey: 'parts.bodice.variants.fitted', svgPath: 'dresses/sheath-dress/bodice/fitted.svg' },
        { id: 'structured', nameKey: 'parts.bodice.variants.structured', svgPath: 'dresses/sheath-dress/bodice/structured.svg' },
        { id: 'darted', nameKey: 'parts.bodice.variants.darted', svgPath: 'dresses/sheath-dress/bodice/darted.svg' },
      ],
    },
    {
      id: 'length',
      nameKey: 'parts.length.name',
      required: true,
      layerOrder: 1,
      defaultVariantId: 'knee',
      variants: [
        { id: 'above-knee', nameKey: 'parts.length.variants.above-knee', svgPath: 'dresses/sheath-dress/length/above-knee.svg' },
        { id: 'knee', nameKey: 'parts.length.variants.knee', svgPath: 'dresses/sheath-dress/length/knee.svg' },
        { id: 'midi', nameKey: 'parts.length.variants.midi', svgPath: 'dresses/sheath-dress/length/midi.svg' },
        { id: 'maxi', nameKey: 'parts.length.variants.maxi', svgPath: 'dresses/sheath-dress/length/maxi.svg' },
      ],
    },
    {
      id: 'slit',
      nameKey: 'parts.slit.name',
      required: false,
      layerOrder: 1,
      defaultVariantId: 'none',
      variants: [
        { id: 'none', nameKey: 'parts.slit.variants.none', svgPath: 'dresses/sheath-dress/slit/none.svg' },
        { id: 'center', nameKey: 'parts.slit.variants.center', svgPath: 'dresses/sheath-dress/slit/center.svg' },
        { id: 'side', nameKey: 'parts.slit.variants.side', svgPath: 'dresses/sheath-dress/slit/side.svg' },
      ],
    },
    {
      id: 'closure',
      nameKey: 'parts.closure.name',
      required: true,
      layerOrder: 2,
      defaultVariantId: 'zipper',
      variants: [
        { id: 'zipper', nameKey: 'parts.closure.variants.zipper', svgPath: 'dresses/sheath-dress/closure/zipper.svg' },
        { id: 'buttons', nameKey: 'parts.closure.variants.buttons', svgPath: 'dresses/sheath-dress/closure/buttons.svg' },
        { id: 'hook', nameKey: 'parts.closure.variants.hook', svgPath: 'dresses/sheath-dress/closure/hook.svg' },
      ],
    },
    {
      id: 'neckline',
      nameKey: 'parts.neckline.name',
      required: true,
      layerOrder: 3,
      defaultVariantId: 'round',
      variants: [
        { id: 'round', nameKey: 'parts.neckline.variants.round', svgPath: 'dresses/sheath-dress/neckline/round.svg' },
        { id: 'v-neck', nameKey: 'parts.neckline.variants.v-neck', svgPath: 'dresses/sheath-dress/neckline/v-neck.svg' },
        { id: 'square', nameKey: 'parts.neckline.variants.square', svgPath: 'dresses/sheath-dress/neckline/square.svg' },
        { id: 'boat', nameKey: 'parts.neckline.variants.boat', svgPath: 'dresses/sheath-dress/neckline/boat.svg' },
        { id: 'cowl', nameKey: 'parts.neckline.variants.cowl', svgPath: 'dresses/sheath-dress/neckline/cowl.svg' },
        { id: 'sweetheart', nameKey: 'parts.neckline.variants.sweetheart', svgPath: 'dresses/sheath-dress/neckline/sweetheart.svg' },
      ],
    },
    {
      id: 'sleeves',
      nameKey: 'parts.sleeves.name',
      required: true,
      layerOrder: 5,
      defaultVariantId: 'short',
      variants: [
        { id: 'short', nameKey: 'parts.sleeves.variants.short', svgPath: 'dresses/sheath-dress/sleeves/short.svg' },
        { id: 'three-quarter', nameKey: 'parts.sleeves.variants.three-quarter', svgPath: 'dresses/sheath-dress/sleeves/three-quarter.svg' },
        { id: 'long', nameKey: 'parts.sleeves.variants.long', svgPath: 'dresses/sheath-dress/sleeves/long.svg' },
        { id: 'cap', nameKey: 'parts.sleeves.variants.cap', svgPath: 'dresses/sheath-dress/sleeves/cap.svg' },
        { id: 'sleeveless', nameKey: 'parts.sleeves.variants.sleeveless', svgPath: 'dresses/sheath-dress/sleeves/sleeveless.svg' },
      ],
    },
  ],
}
