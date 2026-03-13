import { useRef, useCallback, useEffect, useState } from 'react'
import { setSnapshotFn, clearSnapshotFn } from '../../stores/canvasHistoryRef'
import { Stage, Layer } from 'react-konva'
import { Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import { useCanvasHistory } from '../../hooks/useCanvasHistory'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import { useViewport } from '../../hooks/useViewport'
import TransformableElement from './TransformableElement'
import GridLayer from './GridLayer'
import Minimap from './Minimap'
import CanvasToolbar from './CanvasToolbar'
import ContextMenu from './ContextMenu'
import type { CanvasElement } from '../../types'
import { v4 as uuid } from 'uuid'
import Konva from 'konva'

export default function DesignCanvas() {
  const { t } = useTranslation()
  const stageRef = useRef<Konva.Stage>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ w: 800, h: 600 })
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; onElement: boolean } | null>(null)

  const design = useDesignStore(s => s.getCurrentDesign())
  const updateDesign = useDesignStore(s => s.updateCurrentDesign)
  const selectedIds = useUIStore(s => s.selectedElementIds)
  const setSelected = useUIStore(s => s.setSelectedElements)
  const toggleSelected = useUIStore(s => s.toggleSelectedElement)
  const clearSelection = useUIStore(s => s.clearSelection)
  const setDirty = useUIStore(s => s.setDirty)
  const zoom = useUIStore(s => s.canvasZoom)
  const setZoom = useUIStore(s => s.setCanvasZoom)
  const position = useUIStore(s => s.viewportPosition)
  const setPosition = useUIStore(s => s.setViewportPosition)

  const history = useCanvasHistory()
  const viewport = useViewport()

  useEffect(() => {
    setSnapshotFn(history.pushSnapshot)
    return () => clearSnapshotFn()
  }, [history.pushSnapshot])

  // Track container size
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      const entry = entries[0]
      if (entry) {
        setContainerSize({ w: entry.contentRect.width, h: entry.contentRect.height })
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const elements = design?.elements ?? []

  const updateElements = useCallback((newElements: CanvasElement[]) => {
    history.pushSnapshot(elements)
    updateDesign({ elements: newElements })
    setDirty(true)
  }, [elements, history, updateDesign, setDirty])

  const handleElementChange = useCallback((id: string, attrs: Partial<CanvasElement>) => {
    const newElements = elements.map(el =>
      el.id === id ? { ...el, ...attrs } as CanvasElement : el
    )
    updateElements(newElements)
  }, [elements, updateElements])

  const handleSelect = useCallback((id: string, e: any) => {
    const evt = e.evt
    const element = elements.find(el => el.id === id)
    const editingGroupId = useUIStore.getState().editingGroupId

    if (element?.groupId && element.groupId !== editingGroupId) {
      const groupMembers = elements.filter(el => el.groupId === element.groupId).map(el => el.id)
      if (evt?.ctrlKey || evt?.metaKey || evt?.shiftKey) {
        const allSelected = groupMembers.every(mid => selectedIds.includes(mid))
        if (allSelected) {
          setSelected(selectedIds.filter(sid => !groupMembers.includes(sid)))
        } else {
          setSelected([...new Set([...selectedIds, ...groupMembers])])
        }
      } else {
        setSelected(groupMembers)
      }
    } else {
      if (evt?.ctrlKey || evt?.metaKey || evt?.shiftKey) {
        toggleSelected(id)
      } else {
        setSelected([id])
      }
    }
  }, [elements, selectedIds, setSelected, toggleSelected])

  const handleStageClick = useCallback((e: any) => {
    if (e.target === e.target.getStage()) {
      clearSelection()
    }
  }, [clearSelection])

  const handleDblClick = useCallback((id: string) => {
    const element = elements.find(el => el.id === id)
    if (element?.groupId) {
      useUIStore.getState().setEditingGroupId(element.groupId)
      setSelected([id])
    }
  }, [elements, setSelected])

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

  // Shared action callbacks for keyboard shortcuts + context menu
  const handleDelete = useCallback(() => {
    if (selectedIds.length === 0) return
    updateElements(elements.filter(el => !selectedIds.includes(el.id)))
    clearSelection()
  }, [selectedIds, elements, updateElements, clearSelection])

  const handleDuplicate = useCallback(() => {
    if (selectedIds.length === 0) return
    const duplicated = elements
      .filter(el => selectedIds.includes(el.id))
      .map(el => ({ ...el, id: uuid(), x: el.x + 20, y: el.y + 20 }) as CanvasElement)
    updateElements([...elements, ...duplicated])
    setSelected(duplicated.map(el => el.id))
  }, [selectedIds, elements, updateElements, setSelected])

  const handleCopy = useCallback(() => {
    const selected = elements.filter(el => selectedIds.includes(el.id))
    if (selected.length > 0) {
      useUIStore.getState().setClipboard(JSON.parse(JSON.stringify(selected)))
    }
  }, [elements, selectedIds])

  const handleCut = useCallback(() => {
    const selected = elements.filter(el => selectedIds.includes(el.id))
    if (selected.length === 0) return
    useUIStore.getState().setClipboard(JSON.parse(JSON.stringify(selected)))
    updateElements(elements.filter(el => !selectedIds.includes(el.id)))
    clearSelection()
  }, [elements, selectedIds, updateElements, clearSelection])

  const handlePaste = useCallback(() => {
    const { clipboardElements, pasteCount } = useUIStore.getState()
    if (clipboardElements.length === 0) return
    const offset = (pasteCount + 1) * 20
    const groupMap = new Map<string, string>()
    const pasted = clipboardElements.map(el => {
      let newGroupId = el.groupId
      if (el.groupId) {
        if (!groupMap.has(el.groupId)) groupMap.set(el.groupId, uuid())
        newGroupId = groupMap.get(el.groupId)!
      }
      return { ...el, id: uuid(), x: el.x + offset, y: el.y + offset, groupId: newGroupId } as CanvasElement
    })
    updateElements([...elements, ...pasted])
    setSelected(pasted.map(el => el.id))
    useUIStore.getState().incrementPasteCount()
  }, [elements, updateElements, setSelected])

  const handleGroup = useCallback(() => {
    if (selectedIds.length < 2) return
    history.pushSnapshot(elements)
    const gid = uuid()
    const newElements = elements.map(el =>
      selectedIds.includes(el.id) ? { ...el, groupId: gid } as CanvasElement : el
    )
    updateDesign({ elements: newElements })
    setDirty(true)
  }, [selectedIds, elements, history, updateDesign, setDirty])

  const handleUngroup = useCallback(() => {
    const selected = elements.filter(el => selectedIds.includes(el.id))
    const groupIds = [...new Set(selected.map(el => el.groupId).filter(Boolean))]
    if (groupIds.length === 0) return
    history.pushSnapshot(elements)
    const newElements = elements.map(el =>
      groupIds.includes(el.groupId) ? { ...el, groupId: null } as CanvasElement : el
    )
    updateDesign({ elements: newElements })
    setDirty(true)
  }, [selectedIds, elements, history, updateDesign, setDirty])

  const handleBringToFront = useCallback(() => {
    const maxZ = Math.max(...elements.map(e => e.zIndex))
    history.pushSnapshot(elements)
    const newElements = elements.map(el =>
      selectedIds.includes(el.id) ? { ...el, zIndex: maxZ + 1 } as CanvasElement : el
    )
    updateDesign({ elements: newElements })
    setDirty(true)
  }, [elements, selectedIds, history, updateDesign, setDirty])

  const handleSendToBack = useCallback(() => {
    const minZ = Math.min(...elements.map(e => e.zIndex))
    history.pushSnapshot(elements)
    const newElements = elements.map(el =>
      selectedIds.includes(el.id) ? { ...el, zIndex: minZ - 1 } as CanvasElement : el
    )
    updateDesign({ elements: newElements })
    setDirty(true)
  }, [elements, selectedIds, history, updateDesign, setDirty])

  const handleToggleLock = useCallback(() => {
    const firstSelected = elements.find(el => selectedIds.includes(el.id))
    if (!firstSelected) return
    const newLocked = !firstSelected.locked
    history.pushSnapshot(elements)
    const newElements = elements.map(el =>
      selectedIds.includes(el.id) ? { ...el, locked: newLocked } as CanvasElement : el
    )
    updateDesign({ elements: newElements })
    setDirty(true)
  }, [elements, selectedIds, history, updateDesign, setDirty])

  useKeyboardShortcuts({
    onDelete: handleDelete,
    onUndo: handleUndo,
    onRedo: handleRedo,
    onDuplicate: handleDuplicate,
    onSelectAll: () => setSelected(elements.map(el => el.id)),
    onDeselect: clearSelection,
    onCopy: handleCopy,
    onCut: handleCut,
    onPaste: handlePaste,
    onGroup: handleGroup,
    onUngroup: handleUngroup,
  })

  // Expose stageRef for thumbnail capture
  useEffect(() => {
    if (stageRef.current) {
      (window as any).__soulLabStage = stageRef.current
    }
    return () => { delete (window as any).__soulLabStage }
  }, [])

  // DnD handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('application/soul-lab-element')
    if (!data || !containerRef.current) return
    const parsed = JSON.parse(data)
    const rect = containerRef.current.getBoundingClientRect()
    const canvasPos = viewport.screenToCanvas(e.clientX, e.clientY, rect)

    let newElement: CanvasElement | null = null
    const base = {
      id: uuid(),
      x: canvasPos.x,
      y: canvasPos.y,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      opacity: 1,
      zIndex: elements.length,
      locked: false,
      visible: true,
      groupId: null,
    }

    if (parsed.type === 'garment-part') {
      newElement = {
        ...base,
        type: 'garment-part',
        color: '#000000',
        partId: parsed.partId,
        variantId: parsed.variantId,
        garmentTypeId: parsed.garmentTypeId,
        scaleX: 3,
        scaleY: 2.67,
      } as CanvasElement
    } else if (parsed.type === 'text') {
      newElement = {
        ...base,
        type: 'text',
        color: '#000000',
        text: 'Text',
        fontSize: 24,
        fontFamily: 'Inter, sans-serif',
      } as CanvasElement
    } else if (parsed.type === 'shape') {
      newElement = {
        ...base,
        type: 'shape',
        color: '#000000',
        shapeType: parsed.shapeType || 'rect',
        width: 80,
        height: 80,
        strokeColor: '#E53E3E',
        strokeWidth: 2,
      } as CanvasElement
    }

    if (newElement) {
      updateElements([...elements, newElement])
      setSelected([newElement.id])
    }
  }, [elements, updateElements, setSelected, viewport])

  // Context menu
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const isOnElement = selectedIds.length > 0
    setContextMenu({ x: e.clientX, y: e.clientY, onElement: isOnElement })
  }, [selectedIds])

  // Zoom toolbar handlers
  const handleZoomIn = useCallback(() => setZoom(zoom * 1.1), [zoom, setZoom])
  const handleZoomOut = useCallback(() => setZoom(zoom / 1.1), [zoom, setZoom])
  const handleResetZoom = useCallback(() => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [setZoom, setPosition])
  const handleFitAll = useCallback(() => {
    viewport.fitAll(elements, containerSize.w, containerSize.h)
  }, [viewport, elements, containerSize])

  const sorted = [...elements].sort((a, b) => a.zIndex - b.zIndex)

  const getContextMenuItems = () => {
    if (contextMenu?.onElement) {
      return [
        { label: t('canvas.cut', 'Cut'), shortcut: 'Ctrl+X', onClick: handleCut },
        { label: t('canvas.copy', 'Copy'), shortcut: 'Ctrl+C', onClick: handleCopy },
        { label: t('canvas.paste', 'Paste'), shortcut: 'Ctrl+V', onClick: handlePaste, disabled: useUIStore.getState().clipboardElements.length === 0 },
        { label: '---', onClick: () => {} },
        { label: t('canvas.group', 'Group'), shortcut: 'Ctrl+G', onClick: handleGroup, disabled: selectedIds.length < 2 },
        { label: t('canvas.ungroup', 'Ungroup'), shortcut: 'Ctrl+Shift+G', onClick: handleUngroup, disabled: !elements.some(el => selectedIds.includes(el.id) && el.groupId) },
        { label: '---', onClick: () => {} },
        { label: t('actions.duplicate'), shortcut: 'Ctrl+D', onClick: handleDuplicate },
        { label: t('actions.delete'), shortcut: 'Del', onClick: handleDelete, danger: true },
        { label: '---', onClick: () => {} },
        { label: t('canvas.bringToFront', 'Bring to Front'), onClick: handleBringToFront },
        { label: t('canvas.sendToBack', 'Send to Back'), onClick: handleSendToBack },
        { label: '---', onClick: () => {} },
        { label: elements.find(el => selectedIds.includes(el.id))?.locked ? t('canvas.unlock', 'Unlock') : t('canvas.lock', 'Lock'), onClick: handleToggleLock },
      ]
    }
    return [
      { label: t('canvas.paste', 'Paste'), shortcut: 'Ctrl+V', onClick: handlePaste, disabled: useUIStore.getState().clipboardElements.length === 0 },
      { label: '---', onClick: () => {} },
      { label: t('canvas.selectAll', 'Select All'), shortcut: 'Ctrl+A', onClick: () => setSelected(elements.map(el => el.id)) },
      { label: '---', onClick: () => {} },
      { label: t('canvas.fitAll', 'Fit All'), onClick: handleFitAll },
      { label: t('canvas.resetZoom', 'Reset Zoom'), onClick: handleResetZoom },
    ]
  }

  return (
    <Box display="flex" flexDir="column" h="100%" position="relative">
      <Box
        ref={containerRef}
        flex={1}
        overflow="hidden"
        position="relative"
        bg="gray.50"
        cursor={viewport.isPanning ? 'grabbing' : 'default'}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onContextMenu={handleContextMenu}
      >
        <Stage
          ref={stageRef}
          width={containerSize.w}
          height={containerSize.h}
          x={position.x}
          y={position.y}
          scaleX={zoom}
          scaleY={zoom}
          onClick={handleStageClick}
          onTap={handleStageClick}
          onWheel={viewport.onWheel}
          onMouseDown={viewport.onMouseDown}
          onMouseMove={viewport.onMouseMove}
          onMouseUp={viewport.onMouseUp}
        >
          <GridLayer
            viewportX={position.x}
            viewportY={position.y}
            zoom={zoom}
            containerW={containerSize.w}
            containerH={containerSize.h}
          />
          <Layer>
            {sorted.filter(el => el.visible).map(el => (
              <TransformableElement
                key={el.id}
                element={el}
                isSelected={selectedIds.includes(el.id)}
                onSelect={(e) => handleSelect(el.id, e)}
                onChange={(attrs) => handleElementChange(el.id, attrs)}
                onDblClick={() => handleDblClick(el.id)}
              />
            ))}
          </Layer>
        </Stage>
        <Minimap
          elements={elements}
          containerW={containerSize.w}
          containerH={containerSize.h}
        />
      </Box>
      <CanvasToolbar
        canUndo={history.canUndo}
        canRedo={history.canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
        onFitAll={handleFitAll}
      />
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          items={getContextMenuItems()}
        />
      )}
    </Box>
  )
}
