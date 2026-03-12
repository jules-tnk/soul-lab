import { create } from 'zustand'

interface UIState {
  locale: 'en' | 'fr'
  expandedParts: string[]
  tagFilter: string[]
  searchQuery: string
  activeCategoryId: string
  isDirty: boolean
  toggleLocale: () => void
  togglePart: (partId: string) => void
  setTagFilter: (tags: string[]) => void
  setSearch: (query: string) => void
  setActiveCategory: (id: string) => void
  setDirty: (dirty: boolean) => void
}

export const useUIStore = create<UIState>()((set) => ({
  locale: 'fr',
  expandedParts: [],
  tagFilter: [],
  searchQuery: '',
  activeCategoryId: 'tops',
  isDirty: false,

  toggleLocale: () =>
    set(s => ({ locale: s.locale === 'fr' ? 'en' : 'fr' })),

  togglePart: (partId) =>
    set(s => ({
      expandedParts: s.expandedParts.includes(partId)
        ? s.expandedParts.filter(p => p !== partId)
        : [...s.expandedParts, partId],
    })),

  setTagFilter: (tags) => set({ tagFilter: tags }),
  setSearch: (query) => set({ searchQuery: query }),
  setActiveCategory: (id) => set({ activeCategoryId: id }),
  setDirty: (dirty) => set({ isDirty: dirty }),
}))
