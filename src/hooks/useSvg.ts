import { useState, useEffect } from 'react'

const cache = new Map<string, string>()

export function useSvg(path: string | undefined): { svg: string | null; loading: boolean } {
  const [svg, setSvg] = useState<string | null>(path ? cache.get(path) ?? null : null)
  const [loading, setLoading] = useState(!!path && !cache.has(path))

  useEffect(() => {
    if (!path) { setSvg(null); setLoading(false); return }
    const cached = cache.get(path)
    if (cached) { setSvg(cached); setLoading(false); return }
    let cancelled = false
    setLoading(true)
    fetch(`/svg/${path}`)
      .then(r => { if (!r.ok) throw new Error(`SVG not found: ${path}`); return r.text() })
      .then(text => { cache.set(path, text); if (!cancelled) { setSvg(text); setLoading(false) } })
      .catch(() => { if (!cancelled) { setSvg(null); setLoading(false) } })
    return () => { cancelled = true }
  }, [path])

  return { svg, loading }
}
