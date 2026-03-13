import { Box, Text, HStack, Tag, Collapse, IconButton } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'
import type { GarmentPart, GarmentPartElement } from '../../types'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import { pushSnapshot } from '../../stores/canvasHistoryRef'

interface Props {
  part: GarmentPart
  garmentTypeId: string
}

export default function PartGroup({ part, garmentTypeId }: Props) {
  const { t } = useTranslation()
  const expandedParts = useUIStore(s => s.expandedParts)
  const togglePart = useUIStore(s => s.togglePart)
  const setDirty = useUIStore(s => s.setDirty)
  const design = useDesignStore(s => s.getCurrentDesign())
  const updateDesign = useDesignStore(s => s.updateCurrentDesign)
  const isOpen = expandedParts.includes(part.id)

  const existingElement = design?.elements.find(
    el => el.type === 'garment-part' && el.partId === part.id
  ) as GarmentPartElement | undefined

  const handleVariantClick = (variantId: string) => {
    if (!design) return
    pushSnapshot(design.elements)
    const elements = [...design.elements]

    if (existingElement) {
      const idx = elements.findIndex(el => el.id === existingElement.id)
      elements[idx] = { ...existingElement, variantId }
    } else {
      const newElement: GarmentPartElement = {
        id: uuid(),
        type: 'garment-part',
        partId: part.id,
        variantId,
        garmentTypeId,
        x: 300,
        y: 400,
        scaleX: 3,
        scaleY: 2.67,
        rotation: 0,
        color: '#E63946',
        opacity: 1,
        zIndex: part.layerOrder,
        locked: false,
        visible: true,
      }
      elements.push(newElement)
    }
    updateDesign({ elements })
    setDirty(true)
  }

  return (
    <Box>
      <HStack
        cursor="pointer"
        onClick={() => togglePart(part.id)}
        py={1}
        _hover={{ bg: 'gray.50' }}
        borderRadius="sm"
      >
        <IconButton
          aria-label="toggle"
          icon={isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
          size="2xs"
          variant="ghost"
        />
        <Text fontSize="2xs" fontWeight="600" textTransform="uppercase" letterSpacing="0.5px">
          {t(part.nameKey)}
        </Text>
      </HStack>
      <Collapse in={isOpen}>
        <HStack wrap="wrap" spacing={1} pl={5} pb={2}>
          {part.variants.map(v => (
            <Tag
              key={v.id}
              size="sm"
              cursor="pointer"
              colorScheme={existingElement?.variantId === v.id ? 'brand' : 'gray'}
              variant={existingElement?.variantId === v.id ? 'solid' : 'subtle'}
              onClick={() => handleVariantClick(v.id)}
              fontSize="2xs"
            >
              {t(v.nameKey)}
            </Tag>
          ))}
        </HStack>
      </Collapse>
    </Box>
  )
}
