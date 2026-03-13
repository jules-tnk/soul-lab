const svgCache = new Map<string, string>()

export async function fetchSvgText(svgPath: string): Promise<string> {
  const cached = svgCache.get(svgPath)
  if (cached) return cached
  const base = import.meta.env.BASE_URL
  const res = await fetch(`${base}svg/${svgPath}`)
  if (!res.ok) throw new Error(`Failed to fetch SVG: ${svgPath}`)
  const raw = await res.text()
  const trimmed = trimSvgViewBox(raw)
  svgCache.set(svgPath, trimmed)
  return trimmed
}

function trimSvgViewBox(svgText: string): string {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgText, 'image/svg+xml')
    const svg = doc.documentElement as unknown as SVGSVGElement

    // Must be in DOM (visible) for getBBox to work
    svg.style.position = 'absolute'
    svg.style.left = '-9999px'
    svg.style.visibility = 'hidden'
    document.body.appendChild(svg)

    const bbox = svg.getBBox()

    // Fallback: if bbox is zero-size, return original
    if (bbox.width <= 0 || bbox.height <= 0) {
      document.body.removeChild(svg)
      return svgText
    }

    const pad = 2
    const x = bbox.x - pad
    const y = bbox.y - pad
    const w = bbox.width + pad * 2
    const h = bbox.height + pad * 2

    svg.setAttribute('viewBox', `${x} ${y} ${w} ${h}`)

    // Scale width/height so the largest dimension normalizes to 200px.
    // This keeps images at a usable natural size while the tight viewBox
    // ensures the Transformer fits tightly around visible content.
    const BASE = 200
    const scale = BASE / Math.max(w, h)
    svg.setAttribute('width', String(Math.round(w * scale)))
    svg.setAttribute('height', String(Math.round(h * scale)))

    // Remove measurement styles before serializing
    svg.removeAttribute('style')

    const serializer = new XMLSerializer()
    const result = serializer.serializeToString(svg)
    document.body.removeChild(svg)
    return result
  } catch {
    return svgText
  }
}

export function svgTextToImage(
  svgText: string,
  color: string
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const tinted = svgText.replace(/currentColor/g, color)
    const blob = new Blob([tinted], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const img = new window.Image()
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

export async function loadSvgAsImage(
  svgPath: string,
  color: string
): Promise<HTMLImageElement> {
  const text = await fetchSvgText(svgPath)
  return svgTextToImage(text, color)
}
