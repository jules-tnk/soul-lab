import { VStack, Box, Text, Input, Select, HStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, IconButton, Tooltip } from '@chakra-ui/react'
import { DeleteIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import type { TextElement, CanvasElement } from '../../types'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import { pushSnapshot } from '../../stores/canvasHistoryRef'

interface Props { element: TextElement }

export default function TextProperties({ element }: Props) {
  const { t } = useTranslation()
  const design = useDesignStore(s => s.getCurrentDesign())
  const updateDesign = useDesignStore(s => s.updateCurrentDesign)
  const setDirty = useUIStore(s => s.setDirty)
  const clearSelection = useUIStore(s => s.clearSelection)

  const updateElement = (attrs: Partial<TextElement>) => {
    if (!design) return
    pushSnapshot(design.elements)
    updateDesign({ elements: design.elements.map(el => el.id === element.id ? { ...el, ...attrs } as CanvasElement : el) })
    setDirty(true)
  }

  return (
    <VStack align="stretch" spacing={3}>
      <Text fontSize="sm" fontWeight="600">{t('canvas.text', 'Text')}</Text>
      <Input size="sm" value={element.text} onChange={e => updateElement({ text: e.target.value })} />
      <HStack>
        <Select size="sm" value={element.fontFamily} onChange={e => updateElement({ fontFamily: e.target.value })}>
          <option value="Inter, sans-serif">Inter</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="monospace">Monospace</option>
          <option value="cursive">Cursive</option>
        </Select>
        <Input size="sm" type="number" w="70px" value={element.fontSize} onChange={e => updateElement({ fontSize: Number(e.target.value) })} />
      </HStack>
      <Box>
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="gray.500" mb={1}>
          {t('metadata.color')}
        </Text>
        <Input type="color" value={element.color} onChange={e => updateElement({ color: e.target.value })} w="40px" h="32px" p={0} border="none" />
      </Box>
      <Box>
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="gray.500" mb={1}>
          {t('canvas.opacity', 'Opacity')}
        </Text>
        <Slider value={element.opacity} min={0} max={1} step={0.05} onChange={v => updateElement({ opacity: v })}>
          <SliderTrack><SliderFilledTrack /></SliderTrack>
          <SliderThumb />
        </Slider>
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
