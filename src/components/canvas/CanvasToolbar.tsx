import { HStack, IconButton, Tooltip, Text } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, AddIcon, MinusIcon, ViewIcon } from '@chakra-ui/icons'
import { useUIStore } from '../../stores/uiStore'

interface Props {
  canUndo: boolean
  canRedo: boolean
  onUndo: () => void
  onRedo: () => void
}

export default function CanvasToolbar({ canUndo, canRedo, onUndo, onRedo }: Props) {
  const zoom = useUIStore(s => s.canvasZoom)
  const setZoom = useUIStore(s => s.setCanvasZoom)

  return (
    <HStack spacing={1} py={2} justify="center">
      <Tooltip label="Undo (Ctrl+Z)">
        <IconButton
          aria-label="Undo"
          icon={<ArrowBackIcon />}
          size="xs"
          variant="ghost"
          isDisabled={!canUndo}
          onClick={onUndo}
        />
      </Tooltip>
      <Tooltip label="Redo (Ctrl+Y)">
        <IconButton
          aria-label="Redo"
          icon={<ArrowForwardIcon />}
          size="xs"
          variant="ghost"
          isDisabled={!canRedo}
          onClick={onRedo}
        />
      </Tooltip>
      <HStack spacing={0} ml={4}>
        <IconButton
          aria-label="Zoom out"
          icon={<MinusIcon />}
          size="xs"
          variant="ghost"
          onClick={() => setZoom(zoom - 0.1)}
          isDisabled={zoom <= 0.25}
        />
        <Text fontSize="xs" minW="40px" textAlign="center" color="gray.500">
          {Math.round(zoom * 100)}%
        </Text>
        <IconButton
          aria-label="Zoom in"
          icon={<AddIcon />}
          size="xs"
          variant="ghost"
          onClick={() => setZoom(zoom + 0.1)}
          isDisabled={zoom >= 3}
        />
        <Tooltip label="Reset Zoom">
          <IconButton
            aria-label="Reset Zoom"
            icon={<ViewIcon />}
            size="xs"
            variant="ghost"
            onClick={() => setZoom(1)}
          />
        </Tooltip>
      </HStack>
    </HStack>
  )
}
