import { Box, Text, HStack, VStack, Tag, Collapse, IconButton } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'
import type { GarmentPart, GarmentPartElement } from '../../types'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import { pushSnapshot } from '../../stores/canvasHistoryRef'
import SvgPreview from './SvgPreview'

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

  const hasSvgs = part.variants.some(v => v.svgPath !== '')

  const makeDragStart = (variantId: string) => (e: React.DragEvent) => {
    e.dataTransfer.setData('application/soul-lab-element', JSON.stringify({
      type: 'garment-part',
      partId: part.id,
      variantId,
      garmentTypeId,
    }))
    e.dataTransfer.effectAllowed = 'copy'
  }

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
        groupId: null,
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
        {hasSvgs ? (
          <HStack wrap="wrap" spacing={1} pl={5} pb={2}>
            {part.variants.map(v => {
              const isActive = existingElement?.variantId === v.id
              return (
                <VStack
                  key={v.id}
                  spacing={0}
                  p={1}
                  cursor="grab"
                  borderRadius="md"
                  border="1px solid"
                  borderColor={isActive ? 'brand.500' : 'gray.200'}
                  bg={isActive ? 'brand.50' : 'white'}
                  _hover={{ borderColor: isActive ? 'brand.600' : 'gray.300', bg: isActive ? 'brand.50' : 'gray.50' }}
                  onClick={() => handleVariantClick(v.id)}
                  draggable
                  onDragStart={makeDragStart(v.id)}
                  minW="52px"
                >
                  <SvgPreview svgPath={v.svgPath} color={isActive ? '#E63946' : '#555'} size={32} />
                  <Text fontSize="2xs" lineHeight="1.2" textAlign="center" noOfLines={1}>
                    {t(v.nameKey)}
                  </Text>
                </VStack>
              )
            })}
          </HStack>
        ) : (
          <HStack wrap="wrap" spacing={1} pl={5} pb={2}>
            {part.variants.map(v => (
              <Tag
                key={v.id}
                size="sm"
                cursor="grab"
                colorScheme={existingElement?.variantId === v.id ? 'brand' : 'gray'}
                variant={existingElement?.variantId === v.id ? 'solid' : 'subtle'}
                onClick={() => handleVariantClick(v.id)}
                fontSize="2xs"
                draggable
                onDragStart={makeDragStart(v.id)}
              >
                {t(v.nameKey)}
              </Tag>
            ))}
          </HStack>
        )}
      </Collapse>
    </Box>
  )
}
