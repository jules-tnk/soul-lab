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

  const genderNote = design.gender === 'unisex'
    ? 'This is a unisex garment. Use a gender-neutral mannequin.'
    : `This is a ${design.gender}'s garment. Use a ${design.gender}'s mannequin and ensure the fit, proportions, and silhouette are appropriate for ${design.gender}'s wear.`

  return `Generate a realistic 3D visualization of this garment design displayed on a plastic mannequin against a clean white/light gray studio background.

Garment: ${garmentTypeName}
Gender: ${design.gender}
Fabric: ${design.fabric}
Pattern: ${design.pattern}
Decorations: ${decorations}
Colors: ${colorStr}

${genderNote}

The attached image shows the flat technical sketch of the design. Render it as a photorealistic 3D garment with proper fabric draping, texture, and lighting. The garment's cut, proportions, and styling must reflect ${design.gender}'s fashion.

Generate a single image containing three side-by-side views of the garment on the mannequin:
1. Front view (center)
2. Side view (left)
3. Back view (right)

Arrange the three views in a horizontal layout with equal spacing, all against the same clean studio background.`
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
The user is designing a ${design.gender}'s ${garmentTypeName}.

Current design state:
- Gender: ${design.gender}
- Fabric: ${design.fabric}
- Pattern: ${design.pattern}
- Decorations: ${decorations}
- ${context}

All suggestions must be appropriate for ${design.gender}'s fashion. Consider typical ${design.gender}'s sizing, silhouettes, and styling conventions when making recommendations.

Available options:
- Fabrics: ${FABRICS.join(', ')}
- Patterns: ${PATTERNS.join(', ')}
- Decorations: ${DECORATIONS.join(', ')}
- Color swatches: ${swatches}

Respond with helpful, creative suggestions in ${lang}. Use markdown formatting for readability (headings, bullet lists, bold for key terms). When suggesting specific changes, clearly name the option from the available lists above so the user can find and apply it themselves.`
}
