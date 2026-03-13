import { useEffect } from 'react'

interface ShortcutHandlers {
  onDelete: () => void
  onUndo: () => void
  onRedo: () => void
  onDuplicate: () => void
  onSelectAll: () => void
  onDeselect: () => void
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        handlers.onDelete()
      } else if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
        e.preventDefault()
        handlers.onUndo()
      } else if (
        (e.key === 'y' && (e.ctrlKey || e.metaKey)) ||
        (e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey)
      ) {
        e.preventDefault()
        handlers.onRedo()
      } else if (e.key === 'd' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        handlers.onDuplicate()
      } else if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        handlers.onSelectAll()
      } else if (e.key === 'Escape') {
        handlers.onDeselect()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handlers])
}
