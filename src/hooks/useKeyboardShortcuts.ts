import { useEffect, useRef } from 'react'

interface ShortcutHandlers {
  onDelete: () => void
  onUndo: () => void
  onRedo: () => void
  onDuplicate: () => void
  onSelectAll: () => void
  onDeselect: () => void
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  const handlersRef = useRef(handlers)
  useEffect(() => { handlersRef.current = handlers })

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        handlersRef.current.onDelete()
      } else if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
        e.preventDefault()
        handlersRef.current.onUndo()
      } else if (
        (e.key === 'y' && (e.ctrlKey || e.metaKey)) ||
        (e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey)
      ) {
        e.preventDefault()
        handlersRef.current.onRedo()
      } else if (e.key === 'd' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        handlersRef.current.onDuplicate()
      } else if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        handlersRef.current.onSelectAll()
      } else if (e.key === 'Escape') {
        handlersRef.current.onDeselect()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
}
