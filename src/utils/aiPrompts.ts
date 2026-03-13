import { FABRICS, PATTERNS, DECORATIONS, COLOR_SWATCHES } from '../types'
import type { Design, CanvasElement } from '../types'

function serializeDesignContext(design: Design): string {
  const counts: Record<string, number> = {}
  const colors = new Set<string>()

  for (const el of design.elements) {
    counts[el.type] = (counts[el.type] ?? 0) + 1
    if (el.color && el.color !== '#000000') colors.add(el.color)
  }

  const parts = Object.entries(counts)
    .map(([type, count]) => `${count} ${type}${count > 1 ? 's' : ''}`)
    .join(', ')

  const colorList = colors.size > 0
    ? `Colors used: ${[...colors].join(', ')}`
    : 'No custom colors'

  return `Elements: ${parts || 'none'}. ${colorList}.`
}

export function buildPreviewPrompt(design: Design, garmentTypeName: string): string {
  const decorations = design.decorations.length > 0
    ? design.decorations.join(', ')
    : 'none'

  const colors = [...new Set(design.elements.map((el: CanvasElement) => el.color).filter(Boolean))]
  const colorStr = colors.length > 0 ? colors.join(', ') : 'default'

  return `Generate a realistic 3D visualization of this garment design displayed on a plastic mannequin against a clean white/light gray studio background.

Garment: ${garmentTypeName}
Fabric: ${design.fabric}
Pattern: ${design.pattern}
Decorations: ${decorations}
Colors: ${colorStr}

The attached image shows the flat technical sketch of the design. Render it as a photorealistic 3D garment with proper fabric draping, texture, and lighting. Show the full garment on the mannequin from a 3/4 front view angle.`
}

export function buildSuggestionsSystemPrompt(
  design: Design,
  garmentTypeName: string,
  locale: string
): string {
  const context = serializeDesignContext(design)
  const decorations = design.decorations.length > 0
    ? design.decorations.join(', ')
    : 'none'

  const swatches = COLOR_SWATCHES.map(s => `${s.id} (${s.hex})`).join(', ')
  const lang = locale === 'fr' ? 'French' : 'English'

  return `You are a fashion design assistant for Soul Lab, a garment design application.
The user is designing a ${garmentTypeName}.

Current design state:
- Fabric: ${design.fabric}
- Pattern: ${design.pattern}
- Decorations: ${decorations}
- ${context}

Available options:
- Fabrics: ${FABRICS.join(', ')}
- Patterns: ${PATTERNS.join(', ')}
- Decorations: ${DECORATIONS.join(', ')}
- Color swatches: ${swatches}

Respond with helpful, creative suggestions in ${lang}. Use markdown formatting for readability (headings, bullet lists, bold for key terms). When suggesting specific changes, clearly name the option from the available lists above so the user can find and apply it themselves.`
}
