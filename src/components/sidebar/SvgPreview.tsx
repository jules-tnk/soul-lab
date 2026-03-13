import { useEffect, useState } from 'react'
import { Image } from '@chakra-ui/react'
import { fetchSvgText } from '../../utils/svgToImage'

interface Props {
  svgPath: string
  color?: string
  size?: number
}

export default function SvgPreview({ svgPath, color = '#000000', size = 28 }: Props) {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    if (!svgPath) { setSrc(null); return }
    let revoke: (() => void) | null = null
    fetchSvgText(svgPath).then(text => {
      const tinted = text.replace(/currentColor/g, color)
      const blob = new Blob([tinted], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      revoke = () => URL.revokeObjectURL(url)
      setSrc(url)
    }).catch(() => setSrc(null))
    return () => { revoke?.() }
  }, [svgPath, color])

  if (!src) return null

  return (
    <Image
      src={src}
      alt=""
      boxSize={`${size}px`}
      objectFit="contain"
      flexShrink={0}
      pointerEvents="none"
    />
  )
}
