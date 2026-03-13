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
  onSelect: (e: Konva.KonvaEventObject<MouseEvent>) => void
  onChange: (attrs: Partial<CanvasElement>) => void
}

export default function TransformableElement({ element, isSelected, onSelect, onChange }: Props) {
  const trRef = useRef<Konva.Transformer>(null)
  const groupRef = useRef<Konva.Group>(null)

  useEffect(() => {
    if (isSelected && trRef.current && groupRef.current) {
      trRef.current.nodes([groupRef.current])
      trRef.current.getLayer()?.batchDraw()
    }
  }, [isSelected])

  const renderNode = () => {
    switch (element.type) {
      case 'garment-part':
        return <GarmentPartNode element={element} isSelected={isSelected} onSelect={onSelect} onChange={onChange} />
      case 'text':
        return <TextNode element={element} isSelected={isSelected} onSelect={onSelect} onChange={onChange} />
      case 'shape':
        return <ShapeNode element={element} isSelected={isSelected} onSelect={onSelect} onChange={onChange} />
      case 'image':
        return <ImageNode element={element} isSelected={isSelected} onSelect={onSelect} onChange={onChange} />
    }
  }

  return (
    <>
      <Group
        ref={groupRef}
        x={element.x}
        y={element.y}
        scaleX={element.scaleX}
        scaleY={element.scaleY}
        rotation={element.rotation}
        draggable={!element.locked}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({ x: e.target.x(), y: e.target.y() })
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
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
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
