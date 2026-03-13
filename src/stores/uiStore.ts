import { create } from 'zustand'
import type { CanvasElement } from '../types'

interface UIState {
  locale: 'fr' | 'en'
  expandedParts: string[]
  selectedElementIds: string[]
  tagFilter: string[]
  searchQuery: string
  activeCategoryId: string
  isDirty: boolean
  canvasZoom: number
  viewportPosition: { x: number; y: number }
  editingGroupId: string | null
  clipboardElements: CanvasElement[]
  pasteCount: number

  toggleLocale: () => void
  togglePart: (partId: string) => void
  setSelectedElements: (ids: string[]) => void
  toggleSelectedElement: (id: string) => void
  clearSelection: () => void
  setTagFilter: (tags: string[]) => void
  setSearch: (q: string) => void
  setActiveCategory: (id: string) => void
  setDirty: (v: boolean) => void
  setCanvasZoom: (zoom: number) => void
  setViewportPosition: (pos: { x: number; y: number }) => void
  setEditingGroupId: (id: string | null) => void
  setClipboard: (elements: CanvasElement[]) => void
  incrementPasteCount: () => void
  resetPasteCount: () => void
}

export const useUIStore = create<UIState>((set) => ({
  locale: 'fr',
  expandedParts: [],
  selectedElementIds: [],
  tagFilter: [],
  searchQuery: '',
  activeCategoryId: 'tops',
  isDirty: false,
  canvasZoom: 1,
  viewportPosition: { x: 0, y: 0 },
  editingGroupId: null,
  clipboardElements: [],
  pasteCount: 0,

  toggleLocale: () => set(s => ({ locale: s.locale === 'fr' ? 'en' : 'fr' })),
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
  clearSelection: () => set({ selectedElementIds: [], editingGroupId: null }),
  setTagFilter: (tags) => set({ tagFilter: tags }),
  setSearch: (q) => set({ searchQuery: q }),
  setActiveCategory: (id) => set({ activeCategoryId: id }),
  setDirty: (v) => set({ isDirty: v }),
  setCanvasZoom: (zoom) => set({ canvasZoom: Math.max(0.1, Math.min(5, zoom)) }),
  setViewportPosition: (pos) => set({ viewportPosition: pos }),
  setEditingGroupId: (id) => set({ editingGroupId: id }),
  setClipboard: (elements) => set({ clipboardElements: elements, pasteCount: 0 }),
  incrementPasteCount: () => set(s => ({ pasteCount: s.pasteCount + 1 })),
  resetPasteCount: () => set({ pasteCount: 0 }),
}))
