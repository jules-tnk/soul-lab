import { useCallback, useRef } from 'react'
import type { CanvasElement } from '../types'

const MAX_HISTORY = 50

export function useCanvasHistory() {
  const pastRef = useRef<CanvasElement[][]>([])
  const futureRef = useRef<CanvasElement[][]>([])

  const pushSnapshot = useCallback((elements: CanvasElement[]) => {
    const snapshot = JSON.parse(JSON.stringify(elements))
    pastRef.current.push(snapshot)
    if (pastRef.current.length > MAX_HISTORY) {
      pastRef.current.shift()
    }
    futureRef.current = []
  }, [])

  const undo = useCallback((currentElements: CanvasElement[]): CanvasElement[] | null => {
    if (pastRef.current.length === 0) return null
    const prev = pastRef.current.pop()!
    futureRef.current.push(JSON.parse(JSON.stringify(currentElements)))
    return prev
  }, [])

  const redo = useCallback((currentElements: CanvasElement[]): CanvasElement[] | null => {
    if (futureRef.current.length === 0) return null
    const next = futureRef.current.pop()!
    pastRef.current.push(JSON.parse(JSON.stringify(currentElements)))
    return next
  }, [])

  const canUndo = useCallback(() => pastRef.current.length > 0, [])
  const canRedo = useCallback(() => futureRef.current.length > 0, [])

  const clear = useCallback(() => {
    pastRef.current = []
    futureRef.current = []
  }, [])

  return { pushSnapshot, undo, redo, canUndo, canRedo, clear }
}
