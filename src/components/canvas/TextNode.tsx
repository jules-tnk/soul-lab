import { Text } from 'react-konva'
import type { TextElement } from '../../types'

interface Props {
  element: TextElement
  isSelected: boolean
  onSelect: (e: any) => void
  onChange: (attrs: Partial<TextElement>) => void
}

export default function TextNode({ element }: Props) {
  return (
    <Text
      text={element.text}
      fontSize={element.fontSize}
      fontFamily={element.fontFamily}
      fill={element.color}
      opacity={element.opacity}
    />
  )
}
