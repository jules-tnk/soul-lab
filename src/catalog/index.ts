import type { GarmentCategory, GarmentType } from '../types'
import { categories } from './categories'
import { shirt } from './tops/shirt'
import { blouse } from './tops/blouse'
import { tshirt } from './tops/tshirt'
import { polo } from './tops/polo'
import { tankTop } from './tops/tank-top'
import { tunic } from './tops/tunic'
import { trousers } from './bottoms/trousers'
import { jeans } from './bottoms/jeans'
import { shorts } from './bottoms/shorts'
import { aLineSkirt } from './bottoms/a-line-skirt'
import { pencilSkirt } from './bottoms/pencil-skirt'
import { pleatedSkirt } from './bottoms/pleated-skirt'
import { aLineDress } from './dresses/a-line-dress'
import { sheathDress } from './dresses/sheath-dress'
import { wrapDress } from './dresses/wrap-dress'
import { maxiDress } from './dresses/maxi-dress'
import { shirtDress } from './dresses/shirt-dress'
import { cocktailDress } from './dresses/cocktail-dress'
import { blazer } from './outerwear/blazer'
import { bomber } from './outerwear/bomber'
import { trenchCoat } from './outerwear/trench-coat'
import { parka } from './outerwear/parka'
import { cardigan } from './outerwear/cardigan'
import { vest } from './outerwear/vest'

const allGarmentTypes: GarmentType[] = [
  shirt,
  blouse,
  tshirt,
  polo,
  tankTop,
  tunic,
  trousers,
  jeans,
  shorts,
  aLineSkirt,
  pencilSkirt,
  pleatedSkirt,
  aLineDress,
  sheathDress,
  wrapDress,
  maxiDress,
  shirtDress,
  cocktailDress,
  blazer,
  bomber,
  trenchCoat,
  parka,
  cardigan,
  vest,
]
const typeMap = new Map(allGarmentTypes.map(t => [t.id, t]))

export function getCategories(): GarmentCategory[] { return categories }
export function getGarmentType(id: string): GarmentType | undefined { return typeMap.get(id) }
export function getGarmentTypesForCategory(categoryId: string): GarmentType[] {
  const cat = categories.find(c => c.id === categoryId)
  if (!cat) return []
  return cat.garmentTypeIds.map(id => typeMap.get(id)).filter(Boolean) as GarmentType[]
}
export function getAllGarmentTypes(): GarmentType[] { return allGarmentTypes }
