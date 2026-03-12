import type { GarmentCategory } from '../types'

export const categories: GarmentCategory[] = [
  { id: 'tops', nameKey: 'categories.tops', garmentTypeIds: ['shirt', 'blouse', 'tshirt', 'polo', 'tank-top', 'tunic'] },
  { id: 'bottoms', nameKey: 'categories.bottoms', garmentTypeIds: ['trousers', 'jeans', 'shorts', 'a-line-skirt', 'pencil-skirt', 'pleated-skirt'] },
  { id: 'dresses', nameKey: 'categories.dresses', garmentTypeIds: ['a-line-dress', 'sheath-dress', 'wrap-dress', 'maxi-dress', 'shirt-dress', 'cocktail-dress'] },
  { id: 'outerwear', nameKey: 'categories.outerwear', garmentTypeIds: ['blazer', 'bomber', 'trench-coat', 'parka', 'cardigan', 'vest'] },
]
