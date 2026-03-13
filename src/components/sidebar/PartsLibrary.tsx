import { Box, VStack, Divider } from '@chakra-ui/react'
import { useDesignStore } from '../../stores/designStore'
import { getGarmentType } from '../../catalog'
import TemplateButtons from './TemplateButtons'
import PartGroup from './PartGroup'
import ExtrasPanel from './ExtrasPanel'

export default function PartsLibrary() {
  const design = useDesignStore(s => s.getCurrentDesign())
  const garmentType = design ? getGarmentType(design.garmentTypeId) : undefined

  const configurableParts = garmentType?.parts.filter(p => p.variants.length > 1) ?? []

  return (
    <Box
      w="220px"
      minW="220px"
      h="calc(100vh - 64px)"
      overflowY="auto"
      bg="white"
      borderRight="1px solid"
      borderColor="gray.100"
      p={3}
    >
      <VStack align="stretch" spacing={3}>
        <TemplateButtons />
        {configurableParts.length > 0 && (
          <>
            <Divider />
            <VStack align="stretch" spacing={0}>
              {configurableParts.map(part => (
                <PartGroup key={part.id} part={part} garmentTypeId={design!.garmentTypeId} />
              ))}
            </VStack>
          </>
        )}
        <Divider />
        <ExtrasPanel />
      </VStack>
    </Box>
  )
}
