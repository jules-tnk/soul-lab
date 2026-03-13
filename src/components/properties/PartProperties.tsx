import { VStack, Box, Text, HStack, Tag, Input, Slider, SliderTrack, SliderFilledTrack, SliderThumb, IconButton, Tooltip, Circle } from '@chakra-ui/react'
import { DeleteIcon, LockIcon, UnlockIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import type { GarmentPartElement, CanvasElement } from '../../types'
import { COLOR_SWATCHES } from '../../types'
import { getGarmentType } from '../../catalog'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import { pushSnapshot } from '../../stores/canvasHistoryRef'

interface Props {
  element: GarmentPartElement
}

export default function PartProperties({ element }: Props) {
  const { t } = useTranslation()
  const design = useDesignStore(s => s.getCurrentDesign())
  const updateDesign = useDesignStore(s => s.updateCurrentDesign)
  const setDirty = useUIStore(s => s.setDirty)
  const clearSelection = useUIStore(s => s.clearSelection)

  const garmentType = getGarmentType(element.garmentTypeId)
  const part = garmentType?.parts.find(p => p.id === element.partId)

  const updateElement = (attrs: Partial<GarmentPartElement>) => {
    if (!design) return
    pushSnapshot(design.elements)
    const elements = design.elements.map(el =>
      el.id === element.id ? { ...el, ...attrs } as CanvasElement : el
    )
    updateDesign({ elements })
    setDirty(true)
  }

  const handleDelete = () => {
    if (!design) return
    pushSnapshot(design.elements)
    updateDesign({ elements: design.elements.filter(el => el.id !== element.id) })
    setDirty(true)
    clearSelection()
  }

  const handleZOrder = (delta: number) => {
    updateElement({ zIndex: element.zIndex + delta })
  }

  if (!part) return null

  return (
    <VStack align="stretch" spacing={3}>
      <Text fontSize="sm" fontWeight="600">{t(part.nameKey)}</Text>

      {/* Variant chips */}
      <Box>
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="gray.500" mb={1}>
          {t('canvas.variant', 'Variant')}
        </Text>
        <HStack wrap="wrap" spacing={1}>
          {part.variants.map(v => (
            <Tag key={v.id} size="sm" cursor="pointer" borderRadius="full" fontSize="2xs"
              colorScheme={element.variantId === v.id ? 'brand' : 'gray'}
              variant={element.variantId === v.id ? 'solid' : 'subtle'}
              onClick={() => updateElement({ variantId: v.id })}
            >
              {t(v.nameKey)}
            </Tag>
          ))}
        </HStack>
      </Box>

      {/* Color */}
      <Box>
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="gray.500" mb={1}>
          {t('metadata.color')}
        </Text>
        <HStack wrap="wrap" spacing={1}>
          {COLOR_SWATCHES.map(s => (
            <Circle
              key={s.id}
              size="24px"
              bg={s.hex}
              cursor="pointer"
              border="2px solid"
              borderColor={element.color === s.hex ? 'brand.500' : 'gray.200'}
              onClick={() => updateElement({ color: s.hex })}
            />
          ))}
          <Input
            type="color"
            value={element.color}
            onChange={e => updateElement({ color: e.target.value })}
            w="28px" h="28px" p={0} border="none" cursor="pointer"
          />
        </HStack>
      </Box>

      {/* Opacity */}
      <Box>
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="gray.500" mb={1}>
          {t('canvas.opacity', 'Opacity')}
        </Text>
        <Slider value={element.opacity} min={0} max={1} step={0.05} onChange={v => updateElement({ opacity: v })}>
          <SliderTrack><SliderFilledTrack /></SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>

      {/* Scale */}
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

      {/* Controls */}
      <HStack spacing={1}>
        <Tooltip label="Bring forward">
          <IconButton aria-label="up" icon={<ArrowUpIcon />} size="xs" variant="ghost" onClick={() => handleZOrder(1)} />
        </Tooltip>
        <Tooltip label="Send backward">
          <IconButton aria-label="down" icon={<ArrowDownIcon />} size="xs" variant="ghost" onClick={() => handleZOrder(-1)} />
        </Tooltip>
        <Tooltip label={element.locked ? 'Unlock' : 'Lock'}>
          <IconButton
            aria-label="lock"
            icon={element.locked ? <LockIcon /> : <UnlockIcon />}
            size="xs"
            variant="ghost"
            onClick={() => updateElement({ locked: !element.locked })}
          />
        </Tooltip>
        <Tooltip label={t('actions.delete')}>
          <IconButton aria-label="delete" icon={<DeleteIcon />} size="xs" variant="ghost" colorScheme="red" onClick={handleDelete} />
        </Tooltip>
      </HStack>
    </VStack>
  )
}
