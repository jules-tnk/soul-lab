import { Box, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useDesignStore } from '../../stores/designStore'
import { getGarmentType } from '../../catalog'
import SvgLayer from './SvgLayer'
import ColorSwatches from './ColorSwatches'

export default function GarmentPreview() {
  const { t } = useTranslation()
  const design = useDesignStore(s => s.designs.find(d => d.id === s.currentDesignId))
  const updateCurrentDesign = useDesignStore(s => s.updateCurrentDesign)

  if (!design) {
    return (
      <Box
        w="100%"
        maxW="280px"
        mx="auto"
        sx={{ aspectRatio: '2/3' }}
        bg="gray.100"
        borderRadius="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="gray.400" fontSize="sm">
          {t('nav.atelier')}
        </Text>
      </Box>
    )
  }

  const garmentType = getGarmentType(design.garmentTypeId)

  const layers: Array<{ svgPath: string; layerOrder: number }> = []

  if (garmentType) {
    for (const part of garmentType.parts) {
      const selectedVariantId = design.parts[part.id] ?? part.defaultVariantId
      const variant = part.variants.find(v => v.id === selectedVariantId)
      if (variant && variant.svgPath) {
        layers.push({ svgPath: variant.svgPath, layerOrder: part.layerOrder })
      }
    }
  }

  const sortedLayers = [...layers].sort((a, b) => a.layerOrder - b.layerOrder)

  const garmentNameKey = garmentType?.nameKey ?? ''
  const garmentName = garmentNameKey ? t(garmentNameKey) : design.garmentTypeId

  return (
    <VStack spacing={3} align="center" w="100%">
      <Text fontWeight="semibold" fontSize="sm" color="gray.600" letterSpacing="wide" textTransform="uppercase">
        {garmentName}
      </Text>
      <Box
        w="100%"
        maxW="280px"
        sx={{ aspectRatio: '2/3' }}
        position="relative"
        color={design.color}
        borderRadius="lg"
        overflow="hidden"
        bg="gray.50"
        boxShadow="sm"
      >
        {sortedLayers.map(layer => (
          <SvgLayer
            key={`${layer.svgPath}-${layer.layerOrder}`}
            svgPath={layer.svgPath}
            layerOrder={layer.layerOrder}
          />
        ))}
      </Box>
      <ColorSwatches
        value={design.color}
        onChange={color => updateCurrentDesign({ color })}
      />
    </VStack>
  )
}
