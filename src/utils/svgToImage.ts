const svgCache = new Map<string, string>()

export async function fetchSvgText(svgPath: string): Promise<string> {
  const cached = svgCache.get(svgPath)
  if (cached) return cached
  const res = await fetch(`/svg/${svgPath}`)
  if (!res.ok) throw new Error(`SVG not found: ${svgPath}`)
  const text = await res.text()
  svgCache.set(svgPath, text)
  return text
}

export function svgTextToImage(svgText: string, color: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const tinted = svgText.replace(/currentColor/g, color)
    const blob = new Blob([tinted], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load SVG image'))
    }
    img.src = url
  })
}

export async function loadSvgAsImage(svgPath: string, color: string): Promise<HTMLImageElement> {
  const text = await fetchSvgText(svgPath)
  return svgTextToImage(text, color)
}
