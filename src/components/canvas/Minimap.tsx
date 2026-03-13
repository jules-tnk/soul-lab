import { useState, useRef, useCallback } from 'react'
import { Box, IconButton, Tooltip } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useUIStore } from '../../stores/uiStore'
import type { CanvasElement } from '../../types'

interface Props {
  elements: CanvasElement[]
  containerW: number
  containerH: number
}

const MINIMAP_W = 160
const MINIMAP_H = 120

const TYPE_COLORS: Record<string, string> = {
  'garment-part': '#E53E3E',
  text: '#3182CE',
  shape: '#38A169',
  image: '#D69E2E',
}

export default function Minimap({ elements, containerW, containerH }: Props) {
  const [visible, setVisible] = useState(true)
  const minimapRef = useRef<HTMLDivElement>(null)
  const zoom = useUIStore(s => s.canvasZoom)
  const position = useUIStore(s => s.viewportPosition)
  const setPosition = useUIStore(s => s.setViewportPosition)

  // Calculate world bounds
  let minX = 0, minY = 0, maxX = 600, maxY = 800
  for (const el of elements) {
    minX = Math.min(minX, el.x - 50)
    minY = Math.min(minY, el.y - 50)
    maxX = Math.max(maxX, el.x + 200)
    maxY = Math.max(maxY, el.y + 200)
  }
  // Include viewport edges
  const vpLeft = -position.x / zoom
  const vpTop = -position.y / zoom
  const vpRight = vpLeft + containerW / zoom
  const vpBottom = vpTop + containerH / zoom
  minX = Math.min(minX, vpLeft - 50)
  minY = Math.min(minY, vpTop - 50)
  maxX = Math.max(maxX, vpRight + 50)
  maxY = Math.max(maxY, vpBottom + 50)

  const worldW = maxX - minX || 1
  const worldH = maxY - minY || 1
  const scale = Math.min(MINIMAP_W / worldW, MINIMAP_H / worldH)

  const toMinimap = (x: number, y: number) => ({
    x: (x - minX) * scale,
    y: (y - minY) * scale,
  })

  const vpPos = toMinimap(vpLeft, vpTop)
  const vpW = (containerW / zoom) * scale
  const vpH = (containerH / zoom) * scale

  const handleMinimapClick = useCallback(
    (e: React.MouseEvent) => {
      if (!minimapRef.current) return
      const rect = minimapRef.current.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const canvasX = mx / scale + minX
      const canvasY = my / scale + minY
      setPosition({
        x: -(canvasX - containerW / zoom / 2) * zoom,
        y: -(canvasY - containerH / zoom / 2) * zoom,
      })
    },
    [scale, minX, minY, zoom, containerW, containerH, setPosition]
  )

  return (
    <Box position="absolute" bottom={3} right={3} zIndex={10}>
      <Tooltip label={visible ? 'Hide minimap' : 'Show minimap'}>
        <IconButton
          aria-label="toggle minimap"
          icon={visible ? <ViewOffIcon /> : <ViewIcon />}
          size="xs"
          variant="ghost"
          onClick={() => setVisible(v => !v)}
          mb={visible ? 1 : 0}
        />
      </Tooltip>
      {visible && (
        <Box
          ref={minimapRef}
          w={`${MINIMAP_W}px`}
          h={`${MINIMAP_H}px`}
          bg="whiteAlpha.900"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          position="relative"
          overflow="hidden"
          cursor="pointer"
          onClick={handleMinimapClick}
          boxShadow="sm"
        >
          {/* Element dots */}
          {elements.map(el => {
            const p = toMinimap(el.x, el.y)
            return (
              <Box
                key={el.id}
                position="absolute"
                left={`${p.x}px`}
                top={`${p.y}px`}
                w="4px"
                h="4px"
                borderRadius="full"
                bg={TYPE_COLORS[el.type] || 'gray.400'}
              />
            )
          })}
          {/* Viewport rectangle */}
          <Box
            position="absolute"
            left={`${vpPos.x}px`}
            top={`${vpPos.y}px`}
            w={`${vpW}px`}
            h={`${vpH}px`}
            border="2px solid"
            borderColor="blue.400"
            bg="blue.50"
            opacity={0.5}
            borderRadius="sm"
            pointerEvents="none"
          />
        </Box>
      )}
    </Box>
  )
}
