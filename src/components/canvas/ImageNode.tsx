import { useEffect, useState } from 'react'
import { Image as KonvaImage } from 'react-konva'
import type { ImageElement } from '../../types'

interface Props {
  element: ImageElement
}

export default function ImageNode({ element }: Props) {
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setImage(img)
    img.onerror = () => setImage(null)
    img.src = element.dataUrl
  }, [element.dataUrl])

  if (!image) return null

  return (
    <KonvaImage
      image={image}
      x={0}
      y={0}
      width={element.width}
      height={element.height}
      opacity={element.opacity}
    />
  )
}
