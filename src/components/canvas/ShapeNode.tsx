import { Rect, Circle, Star, Line } from 'react-konva'
import type { ShapeElement } from '../../types'

interface Props {
  element: ShapeElement
  isSelected: boolean
  onSelect: (e: any) => void
  onChange: (attrs: Partial<ShapeElement>) => void
}

export default function ShapeNode({ element }: Props) {
  const commonProps = {
    fill: element.color,
    stroke: element.strokeColor,
    strokeWidth: element.strokeWidth,
    opacity: element.opacity,
  }

  switch (element.shapeType) {
    case 'rect':
      return <Rect {...commonProps} width={element.width} height={element.height} />
    case 'circle':
      return <Circle {...commonProps} radius={Math.min(element.width, element.height) / 2} />
    case 'star':
      return <Star {...commonProps} numPoints={5} innerRadius={element.width / 4} outerRadius={element.width / 2} />
    case 'line':
      return <Line {...commonProps} points={[0, 0, element.width, element.height]} />
    default:
      return null
  }
}
