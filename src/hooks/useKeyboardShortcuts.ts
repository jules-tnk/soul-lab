import { useEffect, useRef } from 'react'

interface ShortcutHandlers {
  onDelete: () => void
  onUndo: () => void
  onRedo: () => void
  onDuplicate: () => void
  onSelectAll: () => void
  onDeselect: () => void
  onCopy: () => void
  onCut: () => void
  onPaste: () => void
  onGroup: () => void
  onUngroup: () => void
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  const handlersRef = useRef(handlers)
  handlersRef.current = handlers

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      const ctrl = e.ctrlKey || e.metaKey
      const shift = e.shiftKey
      const key = e.key.toLowerCase()

      if (key === 'delete' || key === 'backspace') {
        e.preventDefault()
        handlersRef.current.onDelete()
      } else if (ctrl && !shift && key === 'z') {
        e.preventDefault()
        handlersRef.current.onUndo()
      } else if (ctrl && key === 'y') {
        e.preventDefault()
        handlersRef.current.onRedo()
      } else if (ctrl && shift && key === 'z') {
        e.preventDefault()
        handlersRef.current.onRedo()
      } else if (ctrl && !shift && key === 'd') {
        e.preventDefault()
        handlersRef.current.onDuplicate()
      } else if (ctrl && !shift && key === 'a') {
        e.preventDefault()
        handlersRef.current.onSelectAll()
      } else if (key === 'escape') {
        e.preventDefault()
        handlersRef.current.onDeselect()
      } else if (ctrl && !shift && key === 'c') {
        e.preventDefault()
        handlersRef.current.onCopy()
      } else if (ctrl && !shift && key === 'x') {
        e.preventDefault()
        handlersRef.current.onCut()
      } else if (ctrl && !shift && key === 'v') {
        e.preventDefault()
        handlersRef.current.onPaste()
      } else if (ctrl && !shift && key === 'g') {
        e.preventDefault()
        handlersRef.current.onGroup()
      } else if (ctrl && shift && key === 'g') {
        e.preventDefault()
        handlersRef.current.onUngroup()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}
