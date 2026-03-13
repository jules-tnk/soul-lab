import { create } from 'zustand'

interface UIState {
  locale: 'en' | 'fr'
  expandedParts: string[]
  selectedElementIds: string[]
  tagFilter: string[]
  searchQuery: string
  activeCategoryId: string
  isDirty: boolean
  canvasZoom: number
  toggleLocale: () => void
  togglePart: (partId: string) => void
  setSelectedElements: (ids: string[]) => void
  toggleSelectedElement: (id: string) => void
  clearSelection: () => void
  setTagFilter: (tags: string[]) => void
  setSearch: (query: string) => void
  setActiveCategory: (id: string) => void
  setDirty: (dirty: boolean) => void
  setCanvasZoom: (zoom: number) => void
}

export const useUIStore = create<UIState>()((set) => ({
  locale: 'fr',
  expandedParts: [],
  selectedElementIds: [],
  tagFilter: [],
  searchQuery: '',
  activeCategoryId: 'tops',
  isDirty: false,
  canvasZoom: 1,

  toggleLocale: () =>
    set(s => ({ locale: s.locale === 'fr' ? 'en' : 'fr' })),

  togglePart: (partId) =>
    set(s => ({
      expandedParts: s.expandedParts.includes(partId)
        ? s.expandedParts.filter(p => p !== partId)
        : [...s.expandedParts, partId],
    })),

  setSelectedElements: (ids) => set({ selectedElementIds: ids }),

  toggleSelectedElement: (id) =>
    set(s => ({
      selectedElementIds: s.selectedElementIds.includes(id)
        ? s.selectedElementIds.filter(i => i !== id)
        : [...s.selectedElementIds, id],
    })),

  clearSelection: () => set({ selectedElementIds: [] }),

  setTagFilter: (tags) => set({ tagFilter: tags }),
  setSearch: (query) => set({ searchQuery: query }),
  setActiveCategory: (id) => set({ activeCategoryId: id }),
  setDirty: (dirty) => set({ isDirty: dirty }),
  setCanvasZoom: (zoom) => set({ canvasZoom: Math.max(0.25, Math.min(3, zoom)) }),
}))
