import { useEffect, useState } from 'react'
import { Image as KonvaImage } from 'react-konva'
import type { GarmentPartElement } from '../../types'
import { getGarmentType } from '../../catalog'
import { loadSvgWithMeta } from '../../utils/svgToImage'

interface Props {
  element: GarmentPartElement
}

export default function GarmentPartNode({ element }: Props) {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const garmentType = getGarmentType(element.garmentTypeId)
  const part = garmentType?.parts.find(p => p.id === element.partId)
  const variant = part?.variants.find(v => v.id === element.variantId)
  const svgPath = variant?.svgPath || ''

  useEffect(() => {
    if (!svgPath) { setImage(null); return }
    let cancelled = false
    loadSvgWithMeta(svgPath, element.color).then(result => {
      if (!cancelled) {
        setImage(result.image)
        setOffset({ x: result.offsetX, y: result.offsetY })
      }
    }).catch(() => {
      if (!cancelled) setImage(null)
    })
    return () => { cancelled = true }
  }, [svgPath, element.color])

  if (!image) return null

  return (
    <KonvaImage
      image={image}
      x={offset.x}
      y={offset.y}
      opacity={element.opacity}
    />
  )
}
