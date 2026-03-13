import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import type { GarmentPartElement, TextElement, ShapeElement, ImageElement } from '../../types'
import GlobalProperties from './GlobalProperties'
import PartProperties from './PartProperties'
import TextProperties from './TextProperties'
import ShapeProperties from './ShapeProperties'
import ImageProperties from './ImageProperties'

export default function PropertiesPanel() {
  const { t } = useTranslation()
  const design = useDesignStore(s => s.getCurrentDesign())
  const selectedIds = useUIStore(s => s.selectedElementIds)

  if (!design) return null

  // Single selection: show element-specific properties
  if (selectedIds.length === 1) {
    const element = design.elements.find(el => el.id === selectedIds[0])
    if (element) {
      switch (element.type) {
        case 'garment-part':
          return <PartProperties element={element as GarmentPartElement} />
        case 'text':
          return <TextProperties element={element as TextElement} />
        case 'shape':
          return <ShapeProperties element={element as ShapeElement} />
        case 'image':
          return <ImageProperties element={element as ImageElement} />
      }
    }
  }

  // Multi-selection
  if (selectedIds.length > 1) {
    return (
      <Box>
        <Text fontSize="sm" color="gray.500" mb={3}>
          {selectedIds.length} {t('canvas.elementsSelected', 'elements selected')}
        </Text>
        <GlobalProperties />
      </Box>
    )
  }

  return <GlobalProperties />
}
