import { useCallback, useRef, useEffect, useState } from 'react'
import { useUIStore } from '../stores/uiStore'
import type Konva from 'konva'

interface ViewportHandlers {
  onWheel: (e: Konva.KonvaEventObject<WheelEvent>) => void
  onMouseDown: (e: Konva.KonvaEventObject<MouseEvent>) => void
  onMouseMove: (e: Konva.KonvaEventObject<MouseEvent>) => void
  onMouseUp: () => void
  isPanning: boolean
  isSpaceHeld: () => boolean
  screenToCanvas: (screenX: number, screenY: number, containerRect: DOMRect) => { x: number; y: number }
  fitAll: (elements: { x: number; y: number; scaleX: number; scaleY: number }[], containerW: number, containerH: number) => void
}

export function useViewport(): ViewportHandlers {
  const zoom = useUIStore(s => s.canvasZoom)
  const setZoom = useUIStore(s => s.setCanvasZoom)
  const position = useUIStore(s => s.viewportPosition)
  const setPosition = useUIStore(s => s.setViewportPosition)

  const [isPanning, setIsPanning] = useState(false)
  const isPanningRef = useRef(false)
  const panStartRef = useRef({ x: 0, y: 0 })
  const spaceHeldRef = useRef(false)

  // Track Space key for hand-tool panning
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        const tag = (e.target as HTMLElement)?.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
        e.preventDefault()
        spaceHeldRef.current = true
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        spaceHeldRef.current = false
        isPanningRef.current = false
        setIsPanning(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  const onWheel = useCallback(
    (e: Konva.KonvaEventObject<WheelEvent>) => {
      e.evt.preventDefault()
      const stage = e.target.getStage()
      if (!stage) return

      const isZoomGesture = e.evt.ctrlKey || e.evt.metaKey

      if (isZoomGesture) {
        // Zoom toward pointer
        const pointer = stage.getPointerPosition()
        if (!pointer) return
        const mousePointTo = {
          x: (pointer.x - position.x) / zoom,
          y: (pointer.y - position.y) / zoom,
        }
        const direction = e.evt.deltaY > 0 ? -1 : 1
        const factor = direction > 0 ? 1.1 : 1 / 1.1
        const newZoom = Math.max(0.1, Math.min(5, zoom * factor))
        setZoom(newZoom)
        setPosition({
          x: pointer.x - mousePointTo.x * newZoom,
          y: pointer.y - mousePointTo.y * newZoom,
        })
      } else {
        // Pan
        setPosition({
          x: position.x - e.evt.deltaX,
          y: position.y - e.evt.deltaY,
        })
      }
    },
    [zoom, position, setZoom, setPosition]
  )

  const onMouseDown = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      // Middle-click or Space+left-click
      if (e.evt.button === 1 || (spaceHeldRef.current && e.evt.button === 0)) {
        isPanningRef.current = true
        setIsPanning(true)
        panStartRef.current = { x: e.evt.clientX - position.x, y: e.evt.clientY - position.y }
        e.evt.preventDefault()
      }
    },
    [position]
  )

  const onMouseMove = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (!isPanningRef.current) return
      setPosition({
        x: e.evt.clientX - panStartRef.current.x,
        y: e.evt.clientY - panStartRef.current.y,
      })
    },
    [setPosition]
  )

  const onMouseUp = useCallback(() => {
    isPanningRef.current = false
    setIsPanning(false)
  }, [])

  const screenToCanvas = useCallback(
    (screenX: number, screenY: number, containerRect: DOMRect) => ({
      x: (screenX - containerRect.left - position.x) / zoom,
      y: (screenY - containerRect.top - position.y) / zoom,
    }),
    [position, zoom]
  )

  const fitAll = useCallback(
    (elements: { x: number; y: number; scaleX: number; scaleY: number }[], containerW: number, containerH: number) => {
      if (elements.length === 0) {
        setZoom(1)
        setPosition({ x: 0, y: 0 })
        return
      }
      const padding = 0.1
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
      for (const el of elements) {
        minX = Math.min(minX, el.x)
        minY = Math.min(minY, el.y)
        // Approximate bounding: position + some size estimate
        maxX = Math.max(maxX, el.x + 100 * el.scaleX)
        maxY = Math.max(maxY, el.y + 100 * el.scaleY)
      }
      const contentW = maxX - minX || 100
      const contentH = maxY - minY || 100
      const scaleX = containerW / contentW * (1 - padding * 2)
      const scaleY = containerH / contentH * (1 - padding * 2)
      const newZoom = Math.max(0.1, Math.min(5, Math.min(scaleX, scaleY)))
      setZoom(newZoom)
      const cx = (minX + maxX) / 2
      const cy = (minY + maxY) / 2
      setPosition({
        x: containerW / 2 - cx * newZoom,
        y: containerH / 2 - cy * newZoom,
      })
    },
    [setZoom, setPosition]
  )

  const isSpaceHeld = useCallback(() => spaceHeldRef.current, [])

  return {
    onWheel,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    isPanning,
    isSpaceHeld,
    screenToCanvas,
    fitAll,
  }
}
