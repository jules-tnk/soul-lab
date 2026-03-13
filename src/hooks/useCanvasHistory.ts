import { useCallback, useRef, useState } from 'react'
import type { CanvasElement } from '../types'

const MAX_HISTORY = 50

export function useCanvasHistory() {
  const pastRef = useRef<CanvasElement[][]>([])
  const futureRef = useRef<CanvasElement[][]>([])
  const [, setVersion] = useState(0)
  const bump = () => setVersion(v => v + 1)

  const pushSnapshot = useCallback((elements: CanvasElement[]) => {
    const snapshot = JSON.parse(JSON.stringify(elements))
    pastRef.current.push(snapshot)
    if (pastRef.current.length > MAX_HISTORY) {
      pastRef.current.shift()
    }
    futureRef.current = []
    bump()
  }, [])

  const undo = useCallback((currentElements: CanvasElement[]): CanvasElement[] | null => {
    if (pastRef.current.length === 0) return null
    const prev = pastRef.current.pop()!
    futureRef.current.push(JSON.parse(JSON.stringify(currentElements)))
    bump()
    return JSON.parse(JSON.stringify(prev))
  }, [])

  const redo = useCallback((currentElements: CanvasElement[]): CanvasElement[] | null => {
    if (futureRef.current.length === 0) return null
    const next = futureRef.current.pop()!
    pastRef.current.push(JSON.parse(JSON.stringify(currentElements)))
    bump()
    return JSON.parse(JSON.stringify(next))
  }, [])

  const canUndo = pastRef.current.length > 0
  const canRedo = futureRef.current.length > 0

  const clear = useCallback(() => {
    pastRef.current = []
    futureRef.current = []
    bump()
  }, [])

  return { pushSnapshot, undo, redo, canUndo, canRedo, clear }
}
