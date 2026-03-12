import type { GarmentCategory, GarmentType } from '../types'
import { categories } from './categories'
import { shirt } from './tops/shirt'

const allGarmentTypes: GarmentType[] = [shirt]
const typeMap = new Map(allGarmentTypes.map(t => [t.id, t]))

export function getCategories(): GarmentCategory[] { return categories }
export function getGarmentType(id: string): GarmentType | undefined { return typeMap.get(id) }
export function getGarmentTypesForCategory(categoryId: string): GarmentType[] {
  const cat = categories.find(c => c.id === categoryId)
  if (!cat) return []
  return cat.garmentTypeIds.map(id => typeMap.get(id)).filter(Boolean) as GarmentType[]
}
export function getAllGarmentTypes(): GarmentType[] { return allGarmentTypes }
export function getDefaultParts(garmentType: GarmentType): Record<string, string> {
  const parts: Record<string, string> = {}
  for (const part of garmentType.parts) { parts[part.id] = part.defaultVariantId }
  return parts
}
