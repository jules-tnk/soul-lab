import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'
import type { Design, CanvasElement, FabricType, PatternType, GenderType } from '../types'

interface DesignState {
  designs: Design[]
  currentDesignId: string | null
  createDesign: (garmentTypeId: string, name: string, elements?: CanvasElement[]) => string
  updateCurrentDesign: (patch: Partial<Design>) => void
  deleteDesign: (id: string) => void
  duplicateDesign: (id: string) => string | null
  loadDesign: (id: string) => void
  importDesigns: (designs: Design[]) => void
  getCurrentDesign: () => Design | undefined
}

const makeDefaultDesign = (garmentTypeId: string, name: string, elements: CanvasElement[] = []): Design => ({
  id: uuid(),
  version: 2,
  name,
  garmentTypeId,
  gender: 'unisex' as GenderType,
  elements,
  thumbnail: '',
  canvasWidth: 600,
  canvasHeight: 800,
  fabric: 'cotton' as FabricType,
  pattern: 'solid' as PatternType,
  decorations: [],
  tags: [],
  notes: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

export const useDesignStore = create<DesignState>()(
  persist(
    (set, get) => ({
      designs: [],
      currentDesignId: null,

      createDesign: (garmentTypeId, name, elements = []) => {
        const design = makeDefaultDesign(garmentTypeId, name, elements)
        set(s => ({
          designs: [...s.designs, design],
          currentDesignId: design.id,
        }))
        return design.id
      },

      updateCurrentDesign: (patch) => {
        set(s => ({
          designs: s.designs.map(d =>
            d.id === s.currentDesignId
              ? { ...d, ...patch, updatedAt: new Date().toISOString() }
              : d
          ),
        }))
      },

      deleteDesign: (id) => {
        set(s => ({
          designs: s.designs.filter(d => d.id !== id),
          currentDesignId: s.currentDesignId === id ? null : s.currentDesignId,
        }))
      },

      duplicateDesign: (id) => {
        const original = get().designs.find(d => d.id === id)
        if (!original) return null
        const copy: Design = {
          ...original,
          id: uuid(),
          elements: original.elements.map(el => ({ ...el, id: uuid() })),
          name: `${original.name} (copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set(s => ({ designs: [...s.designs, copy] }))
        return copy.id
      },

      loadDesign: (id) => set({ currentDesignId: id }),

      importDesigns: (incoming) => {
        set(s => {
          const existingIds = new Set(s.designs.map(d => d.id))
          const newDesigns = incoming.filter(d => !existingIds.has(d.id))
          return { designs: [...s.designs, ...newDesigns] }
        })
      },

      getCurrentDesign: () => {
        const s = get()
        return s.designs.find(d => d.id === s.currentDesignId)
      },
    }),
    {
      name: 'soul-lab-designs',
      onRehydrateStorage: () => (state) => {
        if (!state) return
        const hasV1 = state.designs.some((d: any) => !d.version || d.version < 2)
        if (hasV1) {
          state.designs = []
          state.currentDesignId = null
        }
        // Migrations for older designs
        if (state.designs) {
          state.designs = state.designs.map(d => ({
            ...d,
            gender: (d as any).gender ?? 'unisex',
            elements: d.elements.map(el => ({
              ...el,
              groupId: el.groupId ?? null,
            })) as CanvasElement[],
          }))
        }
      },
    }
  )
)
