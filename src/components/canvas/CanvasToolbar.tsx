import { HStack, IconButton, Text, Tooltip } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, MinusIcon, AddIcon, RepeatIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'

interface Props {
  canUndo: boolean
  canRedo: boolean
  onUndo: () => void
  onRedo: () => void
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
  onFitAll: () => void
}

export default function CanvasToolbar({
  canUndo, canRedo, onUndo, onRedo,
  zoom, onZoomIn, onZoomOut, onResetZoom, onFitAll,
}: Props) {
  const { t } = useTranslation()

  return (
    <HStack spacing={1} justify="center" py={2}>
      <Tooltip label="Undo (Ctrl+Z)">
        <IconButton aria-label="undo" icon={<ArrowBackIcon />} size="sm" variant="ghost" isDisabled={!canUndo} onClick={onUndo} />
      </Tooltip>
      <Tooltip label="Redo (Ctrl+Y)">
        <IconButton aria-label="redo" icon={<ArrowForwardIcon />} size="sm" variant="ghost" isDisabled={!canRedo} onClick={onRedo} />
      </Tooltip>

      <Text mx={2} color="gray.300">|</Text>

      <Tooltip label="Zoom Out">
        <IconButton aria-label="zoom out" icon={<MinusIcon />} size="sm" variant="ghost" isDisabled={zoom <= 0.1} onClick={onZoomOut} />
      </Tooltip>
      <Text fontSize="xs" color="gray.500" minW="40px" textAlign="center">{Math.round(zoom * 100)}%</Text>
      <Tooltip label="Zoom In">
        <IconButton aria-label="zoom in" icon={<AddIcon />} size="sm" variant="ghost" isDisabled={zoom >= 5} onClick={onZoomIn} />
      </Tooltip>
      <Tooltip label={t('canvas.resetZoom', 'Reset Zoom')}>
        <IconButton aria-label="reset zoom" icon={<RepeatIcon />} size="sm" variant="ghost" onClick={onResetZoom} />
      </Tooltip>
      <Tooltip label={t('canvas.fitAll', 'Fit All')}>
        <IconButton aria-label="fit all" icon={<RepeatIcon transform="rotate(45deg)" />} size="sm" variant="ghost" onClick={onFitAll} />
      </Tooltip>
    </HStack>
  )
}
