import { Box, VStack } from '@chakra-ui/react'
import { useDesignStore } from '../../stores/designStore'
import { getGarmentType } from '../../catalog'
import GarmentTypeSelector from './GarmentTypeSelector'
import PartSection from './PartSection'
import MetadataPanel from './MetadataPanel'

export default function ConfigPanel() {
  const design = useDesignStore(s => s.designs.find(d => d.id === s.currentDesignId))

  const garmentType = design ? getGarmentType(design.garmentTypeId) : undefined
  const partsWithChoices = garmentType
    ? garmentType.parts.filter(p => p.variants.length > 1)
    : []

  return (
    <Box
      overflowY="auto"
      maxH={{ base: 'none', md: 'calc(100vh - 160px)' }}
      pr={1}
    >
      <VStack spacing={4} align="stretch">
        <GarmentTypeSelector />
        {partsWithChoices.map(part => (
          <PartSection key={part.id} part={part} />
        ))}
        <MetadataPanel />
      </VStack>
    </Box>
  )
}
