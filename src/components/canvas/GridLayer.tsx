import { Layer, Circle } from 'react-konva'

interface Props {
  viewportX: number
  viewportY: number
  zoom: number
  containerW: number
  containerH: number
}

export default function GridLayer({ viewportX, viewportY, zoom, containerW, containerH }: Props) {
  if (zoom < 0.3) return null // fade out at very low zoom

  // Adaptive spacing: base 50, double if zoomed out, halve if zoomed in
  let spacing = 50
  if (zoom < 0.5) spacing = 100
  else if (zoom > 2) spacing = 25

  // Calculate visible area in canvas coordinates
  const left = -viewportX / zoom
  const top = -viewportY / zoom
  const right = left + containerW / zoom
  const bottom = top + containerH / zoom

  // Snap to grid
  const startX = Math.floor(left / spacing) * spacing
  const startY = Math.floor(top / spacing) * spacing

  const dots: { x: number; y: number }[] = []
  for (let x = startX; x <= right; x += spacing) {
    for (let y = startY; y <= bottom; y += spacing) {
      dots.push({ x, y })
    }
  }

  // Limit rendering for performance
  const maxDots = 5000
  const visibleDots = dots.slice(0, maxDots)

  const opacity = zoom < 0.5 ? (zoom - 0.3) / 0.2 : 1

  return (
    <Layer listening={false}>
      {visibleDots.map((dot, i) => (
        <Circle
          key={i}
          x={dot.x}
          y={dot.y}
          radius={1.5 / zoom}
          fill={`rgba(200, 200, 200, ${opacity})`}
        />
      ))}
    </Layer>
  )
}
