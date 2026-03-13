import { useEffect, useRef } from 'react'
import { Group, Transformer } from 'react-konva'
import type { CanvasElement } from '../../types'
import GarmentPartNode from './GarmentPartNode'
import TextNode from './TextNode'
import ShapeNode from './ShapeNode'
import ImageNode from './ImageNode'
import Konva from 'konva'

interface Props {
  element: CanvasElement
  isSelected: boolean
  onSelect: (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => void
  onChange: (attrs: Partial<CanvasElement>) => void
  onDblClick?: () => void
  onMultiDragStart?: (draggedId: string) => void
  onMultiDrag?: (draggedId: string, dx: number, dy: number) => void
  onMultiDragEnd?: (draggedId: string, dx: number, dy: number) => void
}

export default function TransformableElement({ element, isSelected, onSelect, onChange, onDblClick, onMultiDragStart, onMultiDrag, onMultiDragEnd }: Props) {
  const trRef = useRef<Konva.Transformer>(null)
  const groupRef = useRef<Konva.Group>(null)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const group = groupRef.current
    const tr = trRef.current
    if (!isSelected || !tr || !group) return

    const update = () => {
      tr.nodes([group])
      tr.getLayer()?.batchDraw()
    }
    // Defer to next frame so react-konva has fully applied node positions
    const rafId = requestAnimationFrame(update)
    // Re-fit when children are added/removed (e.g. async image load)
    group.on('add remove', update)
    return () => {
      cancelAnimationFrame(rafId)
      group.off('add remove', update)
    }
  }, [isSelected])

  const renderNode = () => {
    switch (element.type) {
      case 'garment-part':
        return <GarmentPartNode element={element} />
      case 'text':
        return <TextNode element={element} />
      case 'shape':
        return <ShapeNode element={element} />
      case 'image':
        return <ImageNode element={element} />
    }
  }

  return (
    <>
      <Group
        ref={groupRef}
        id={element.id}
        x={element.x}
        y={element.y}
        scaleX={element.scaleX}
        scaleY={element.scaleY}
        rotation={element.rotation}
        draggable={!element.locked}
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={() => onDblClick?.()}
        onDblTap={() => onDblClick?.()}
        onDragStart={() => {
          dragStartRef.current = { x: element.x, y: element.y }
          onMultiDragStart?.(element.id)
        }}
        onDragMove={(e) => {
          if (dragStartRef.current && onMultiDrag) {
            const dx = e.target.x() - dragStartRef.current.x
            const dy = e.target.y() - dragStartRef.current.y
            onMultiDrag(element.id, dx, dy)
          }
        }}
        onDragEnd={(e) => {
          if (dragStartRef.current && onMultiDragEnd) {
            const dx = e.target.x() - dragStartRef.current.x
            const dy = e.target.y() - dragStartRef.current.y
            onMultiDragEnd(element.id, dx, dy)
          } else {
            onChange({ x: e.target.x(), y: e.target.y() })
          }
          dragStartRef.current = null
        }}
        onTransformEnd={() => {
          const group = groupRef.current
          if (!group) return
          onChange({
            x: group.x(),
            y: group.y(),
            scaleX: group.scaleX(),
            scaleY: group.scaleY(),
            rotation: group.rotation(),
          })
        }}
      >
        {renderNode()}
      </Group>
      {isSelected && !element.locked && (
        <Transformer
          ref={trRef}
          rotateEnabled={true}
          enabledAnchors={['top-left', 'top-center', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right']}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 10 || Math.abs(newBox.height) < 10) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </>
  )
}
