export interface SvgCacheEntry {
  text: string
  offsetX: number
  offsetY: number
}

const svgCache = new Map<string, SvgCacheEntry>()

export async function fetchSvgText(svgPath: string): Promise<SvgCacheEntry> {
  const cached = svgCache.get(svgPath)
  if (cached) return cached
  const base = import.meta.env.BASE_URL
  const res = await fetch(`${base}svg/${svgPath}`)
  if (!res.ok) throw new Error(`Failed to fetch SVG: ${svgPath}`)
  const raw = await res.text()
  const entry = trimSvgViewBox(raw)
  svgCache.set(svgPath, entry)
  return entry
}

function trimSvgViewBox(svgText: string): SvgCacheEntry {
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
      return { text: svgText, offsetX: 0, offsetY: 0 }
    }

    const pad = 2
    const x = bbox.x - pad
    const y = bbox.y - pad
    const w = bbox.width + pad * 2
    const h = bbox.height + pad * 2

    svg.setAttribute('viewBox', `${x} ${y} ${w} ${h}`)
    // 1:1 pixel-per-SVG-unit ratio so all parts share consistent scale
    svg.setAttribute('width', String(Math.round(w)))
    svg.setAttribute('height', String(Math.round(h)))

    // Remove measurement styles before serializing
    svg.removeAttribute('style')

    const serializer = new XMLSerializer()
    const result = serializer.serializeToString(svg)
    document.body.removeChild(svg)
    return { text: result, offsetX: x, offsetY: y }
  } catch {
    return { text: svgText, offsetX: 0, offsetY: 0 }
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
  const entry = await fetchSvgText(svgPath)
  return svgTextToImage(entry.text, color)
}

export async function loadSvgWithMeta(
  svgPath: string,
  color: string
): Promise<{ image: HTMLImageElement; offsetX: number; offsetY: number }> {
  const entry = await fetchSvgText(svgPath)
  const image = await svgTextToImage(entry.text, color)
  return { image, offsetX: entry.offsetX, offsetY: entry.offsetY }
}
