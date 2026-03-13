import { VStack, Box, Text, Input, HStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, IconButton, Tooltip } from '@chakra-ui/react'
import { DeleteIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import type { ImageElement, CanvasElement } from '../../types'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import { pushSnapshot } from '../../stores/canvasHistoryRef'

interface Props { element: ImageElement }

export default function ImageProperties({ element }: Props) {
  const { t } = useTranslation()
  const design = useDesignStore(s => s.getCurrentDesign())
  const updateDesign = useDesignStore(s => s.updateCurrentDesign)
  const setDirty = useUIStore(s => s.setDirty)
  const clearSelection = useUIStore(s => s.clearSelection)

  const updateElement = (attrs: Partial<ImageElement>) => {
    if (!design) return
    pushSnapshot(design.elements)
    updateDesign({ elements: design.elements.map(el => el.id === element.id ? { ...el, ...attrs } as CanvasElement : el) })
    setDirty(true)
  }

  return (
    <VStack align="stretch" spacing={3}>
      <Text fontSize="sm" fontWeight="600">{t('canvas.image', 'Image')}</Text>
      <HStack>
        <Box flex={1}>
          <Text fontSize="2xs" color="gray.500" mb={1}>W</Text>
          <Input size="sm" type="number" value={Math.round(element.width)} onChange={e => updateElement({ width: Number(e.target.value) })} />
        </Box>
        <Box flex={1}>
          <Text fontSize="2xs" color="gray.500" mb={1}>H</Text>
          <Input size="sm" type="number" value={Math.round(element.height)} onChange={e => updateElement({ height: Number(e.target.value) })} />
        </Box>
      </HStack>
      <Box>
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="gray.500" mb={1}>
          {t('canvas.opacity', 'Opacity')}
        </Text>
        <Slider value={element.opacity} min={0} max={1} step={0.05} onChange={v => updateElement({ opacity: v })}>
          <SliderTrack><SliderFilledTrack /></SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
      <Box>
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="gray.500" mb={1}>
          {t('canvas.scale', 'Scale')}
        </Text>
        <HStack spacing={2}>
          <Box flex={1}>
            <Text fontSize="2xs" color="gray.500" mb={1}>H</Text>
            <Input size="sm" type="number" min={0.1} step={0.05}
              value={Math.round(element.scaleX * 100) / 100}
              onChange={e => updateElement({ scaleX: Math.max(0.1, Number(e.target.value)) })} />
          </Box>
          <Box flex={1}>
            <Text fontSize="2xs" color="gray.500" mb={1}>V</Text>
            <Input size="sm" type="number" min={0.1} step={0.05}
              value={Math.round(element.scaleY * 100) / 100}
              onChange={e => updateElement({ scaleY: Math.max(0.1, Number(e.target.value)) })} />
          </Box>
        </HStack>
      </Box>
      <HStack>
        <Tooltip label={element.locked ? 'Unlock' : 'Lock'}>
          <IconButton aria-label="lock" icon={element.locked ? <LockIcon /> : <UnlockIcon />} size="xs" variant="ghost"
            onClick={() => updateElement({ locked: !element.locked })} />
        </Tooltip>
        <Tooltip label={t('actions.delete')}>
          <IconButton aria-label="delete" icon={<DeleteIcon />} size="xs" variant="ghost" colorScheme="red"
            onClick={() => {
              if (!design) return
              pushSnapshot(design.elements)
              updateDesign({ elements: design.elements.filter(el => el.id !== element.id) })
              setDirty(true)
              clearSelection()
            }} />
        </Tooltip>
      </HStack>
    </VStack>
  )
}
