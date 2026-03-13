import { useRef, useCallback, useEffect } from 'react'
import { setSnapshotFn, clearSnapshotFn } from '../../stores/canvasHistoryRef'
import { Stage, Layer } from 'react-konva'
import { Box } from '@chakra-ui/react'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import { useCanvasHistory } from '../../hooks/useCanvasHistory'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import TransformableElement from './TransformableElement'
import CanvasToolbar from './CanvasToolbar'
import type { CanvasElement } from '../../types'
import { v4 as uuid } from 'uuid'
import Konva from 'konva'

export default function DesignCanvas() {
  const stageRef = useRef<Konva.Stage>(null)
  const design = useDesignStore(s => s.getCurrentDesign())
  const updateDesign = useDesignStore(s => s.updateCurrentDesign)
  const selectedIds = useUIStore(s => s.selectedElementIds)
  const setSelected = useUIStore(s => s.setSelectedElements)
  const toggleSelected = useUIStore(s => s.toggleSelectedElement)
  const clearSelection = useUIStore(s => s.clearSelection)
  const setDirty = useUIStore(s => s.setDirty)
  const zoom = useUIStore(s => s.canvasZoom)

  const history = useCanvasHistory()

  useEffect(() => {
    setSnapshotFn(history.pushSnapshot)
    return () => clearSnapshotFn()
  }, [history.pushSnapshot])

  const elements = design?.elements ?? []

  const updateElements = useCallback((newElements: CanvasElement[]) => {
    history.pushSnapshot(elements)
    updateDesign({ elements: newElements })
    setDirty(true)
  }, [elements, history, updateDesign, setDirty])

  const handleElementChange = useCallback((id: string, attrs: Partial<CanvasElement>) => {
    const newElements = elements.map(el =>
      el.id === id ? { ...el, ...attrs } : el
    )
    updateElements(newElements)
  }, [elements, updateElements])

  const handleSelect = useCallback((id: string, e: any) => {
    if (e.evt?.shiftKey) {
      toggleSelected(id)
    } else {
      setSelected([id])
    }
  }, [setSelected, toggleSelected])

  const handleStageClick = useCallback((e: any) => {
    if (e.target === e.target.getStage()) {
      clearSelection()
    }
  }, [clearSelection])

  // Shared undo/redo handlers (used by both keyboard shortcuts and toolbar)
  const handleUndo = useCallback(() => {
    const prev = history.undo(elements)
    if (prev) {
      updateDesign({ elements: prev })
      setDirty(true)
      clearSelection()
    }
  }, [elements, history, updateDesign, setDirty, clearSelection])

  const handleRedo = useCallback(() => {
    const next = history.redo(elements)
    if (next) {
      updateDesign({ elements: next })
      setDirty(true)
      clearSelection()
    }
  }, [elements, history, updateDesign, setDirty, clearSelection])

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onDelete: () => {
      if (selectedIds.length === 0) return
      const newElements = elements.filter(el => !selectedIds.includes(el.id))
      updateElements(newElements)
      clearSelection()
    },
    onUndo: handleUndo,
    onRedo: handleRedo,
    onDuplicate: () => {
      if (selectedIds.length === 0) return
      const duplicated = elements
        .filter(el => selectedIds.includes(el.id))
        .map(el => ({ ...el, id: uuid(), x: el.x + 20, y: el.y + 20 }))
      updateElements([...elements, ...duplicated])
      setSelected(duplicated.map(el => el.id))
    },
    onSelectAll: () => {
      setSelected(elements.map(el => el.id))
    },
    onDeselect: clearSelection,
  })

  // Expose stageRef for thumbnail capture
  useEffect(() => {
    if (stageRef.current) {
      (window as any).__soulLabStage = stageRef.current
    }
    return () => { delete (window as any).__soulLabStage }
  }, [])

  const canvasW = design?.canvasWidth ?? 600
  const canvasH = design?.canvasHeight ?? 800

  // Sort by zIndex for rendering order
  const sorted = [...elements].sort((a, b) => a.zIndex - b.zIndex)

  return (
    <Box display="flex" flexDir="column" alignItems="center" h="100%">
      <Box
        bg="gray.50"
        borderRadius="md"
        border="1px dashed"
        borderColor="gray.200"
        overflow="hidden"
        position="relative"
      >
        <Stage
          ref={stageRef}
          width={canvasW * zoom}
          height={canvasH * zoom}
          scaleX={zoom}
          scaleY={zoom}
          onClick={handleStageClick}
          onTap={handleStageClick}
        >
          <Layer>
            {sorted.filter(el => el.visible).map(el => (
              <TransformableElement
                key={el.id}
                element={el}
                isSelected={selectedIds.includes(el.id)}
                onSelect={(e) => handleSelect(el.id, e)}
                onChange={(attrs) => handleElementChange(el.id, attrs)}
              />
            ))}
          </Layer>
        </Stage>
      </Box>
      <CanvasToolbar
        canUndo={history.canUndo}
        canRedo={history.canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
      />
    </Box>
  )
}
