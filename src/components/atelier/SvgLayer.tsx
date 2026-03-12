import { Box } from '@chakra-ui/react'
import { useSvg } from '../../hooks/useSvg'

interface SvgLayerProps {
  svgPath: string
  layerOrder: number
}

export default function SvgLayer({ svgPath, layerOrder }: SvgLayerProps) {
  const { svg } = useSvg(svgPath)

  if (!svg) return null

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      w="100%"
      h="100%"
      zIndex={layerOrder}
      dangerouslySetInnerHTML={{ __html: svg }}
      sx={{
        '& svg': {
          width: '100%',
          height: '100%',
        },
      }}
    />
  )
}
