import { useEffect, useState } from 'react'
import { Image as KonvaImage } from 'react-konva'
import type { GarmentPartElement } from '../../types'
import { getGarmentType } from '../../catalog'
import { loadSvgAsImage } from '../../utils/svgToImage'

interface Props {
  element: GarmentPartElement
}

export default function GarmentPartNode({ element }: Props) {
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  const garmentType = getGarmentType(element.garmentTypeId)
  const part = garmentType?.parts.find(p => p.id === element.partId)
  const variant = part?.variants.find(v => v.id === element.variantId)
  const svgPath = variant?.svgPath || ''

  useEffect(() => {
    if (!svgPath) { setImage(null); return }
    let cancelled = false
    loadSvgAsImage(svgPath, element.color).then(img => {
      if (!cancelled) setImage(img)
    }).catch(() => {
      if (!cancelled) setImage(null)
    })
    return () => { cancelled = true }
  }, [svgPath, element.color])

  if (!image) return null

  return (
    <KonvaImage
      image={image}
      x={0}
      y={0}
      opacity={element.opacity}
    />
  )
}
