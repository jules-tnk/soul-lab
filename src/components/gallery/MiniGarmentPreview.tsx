import { Box } from '@chakra-ui/react'
import { getGarmentType } from '../../catalog'
import { useSvg } from '../../hooks/useSvg'
import type { Design } from '../../types'

function SvgMiniLayer({ svgPath }: { svgPath: string }) {
  const { svg } = useSvg(svgPath)
  if (!svg) return null
  return (
    <Box position="absolute" top={0} left={0} w="100%" h="100%"
      dangerouslySetInnerHTML={{ __html: svg }}
      sx={{ '& svg': { width: '100%', height: '100%' } }}
    />
  )
}

export default function MiniGarmentPreview({ design }: { design: Design }) {
  const garmentType = getGarmentType(design.garmentTypeId)
  if (!garmentType) return null

  const layers = garmentType.parts
    .map(part => {
      const variantId = design.parts[part.id] ?? part.defaultVariantId
      const variant = part.variants.find(v => v.id === variantId)
      if (!variant?.svgPath) return null
      return { svgPath: variant.svgPath, layerOrder: part.layerOrder }
    })
    .filter(Boolean)
    .sort((a, b) => a!.layerOrder - b!.layerOrder) as { svgPath: string; layerOrder: number }[]

  return (
    <Box position="relative" w="100%" h="100%">
      {layers.map((l, i) => <SvgMiniLayer key={l.svgPath + i} svgPath={l.svgPath} />)}
    </Box>
  )
}
