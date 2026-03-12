import {
  Box,
  HStack,
  Text,
  Collapse,
  Wrap,
  WrapItem,
  IconButton,
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import type { GarmentPart } from '../../types'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import VariantChip from './VariantChip'

const PART_COLORS: Record<string, string> = {
  collar: '#457b9d', sleeves: '#2a9d8f', cuffs: '#6a4c93',
  placket: '#264653', hem: '#e9c46a', pockets: '#f4a261',
  yoke: '#e76f51', fit: '#457b9d', neckline: '#457b9d',
  waistband: '#2a9d8f', rise: '#6a4c93', 'leg-shape': '#264653',
  bodice: '#e9c46a', waistline: '#f4a261', 'skirt-length': '#e76f51',
  lapels: '#457b9d', closure: '#2a9d8f', vents: '#6a4c93',
  hood: '#264653', belt: '#e9c46a', length: '#f4a261',
  straps: '#e76f51', back: '#457b9d', 'side-slits': '#2a9d8f',
  'pleat-type': '#6a4c93', slit: '#264653', fly: '#e9c46a',
  'wrap-direction': '#f4a261', tie: '#e76f51', 'skirt-shape': '#457b9d',
  drawstring: '#2a9d8f', embellishments: '#6a4c93',
}

const DEFAULT_COLOR = '#888888'

interface PartSectionProps {
  part: GarmentPart
}

export default function PartSection({ part }: PartSectionProps) {
  const { t } = useTranslation()
  const expandedParts = useUIStore(s => s.expandedParts)
  const togglePart = useUIStore(s => s.togglePart)
  const design = useDesignStore(s => s.designs.find(d => d.id === s.currentDesignId))
  const updateCurrentDesign = useDesignStore(s => s.updateCurrentDesign)

  const isExpanded = expandedParts.includes(part.id)
  const accentColor = PART_COLORS[part.id] ?? DEFAULT_COLOR
  const selectedVariantId = design?.parts[part.id] ?? part.defaultVariantId

  const handleSelect = (variantId: string) => {
    if (!design) return
    updateCurrentDesign({ parts: { ...design.parts, [part.id]: variantId } })
  }

  const partName = t(part.nameKey, { defaultValue: part.id })

  return (
    <Box
      bg="white"
      borderRadius="md"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
    >
      <HStack
        as="button"
        w="100%"
        px={3}
        py={2}
        spacing={2}
        cursor="pointer"
        _hover={{ bg: 'gray.50' }}
        onClick={() => togglePart(part.id)}
        textAlign="left"
        justify="space-between"
      >
        <HStack spacing={2}>
          <Box w="8px" h="8px" borderRadius="full" bg={accentColor} flexShrink={0} />
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            {partName}
          </Text>
        </HStack>
        <IconButton
          as="span"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
          icon={isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
          size="xs"
          variant="ghost"
          pointerEvents="none"
        />
      </HStack>
      <Collapse in={isExpanded} animateOpacity>
        <Box px={3} pb={3} pt={1}>
          <Wrap spacing={2}>
            {part.variants.map(variant => (
              <WrapItem key={variant.id}>
                <VariantChip
                  variant={variant}
                  isSelected={selectedVariantId === variant.id}
                  accentColor={accentColor}
                  onSelect={() => handleSelect(variant.id)}
                />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Collapse>
    </Box>
  )
}
