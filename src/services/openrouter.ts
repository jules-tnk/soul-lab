import { OpenRouter } from '@openrouter/sdk'
import { v4 as uuid } from 'uuid'
import { FABRICS, PATTERNS, DECORATIONS } from '../types'
import type { AIAction } from '../types'

const MODEL = 'google/gemini-3.1-flash-image-preview'

const VALID_TYPES = new Set(['fabric', 'pattern', 'decoration', 'color', 'palette'])
const FABRIC_SET = new Set<string>(FABRICS)
const PATTERN_SET = new Set<string>(PATTERNS)
const DECORATION_SET = new Set<string>(DECORATIONS)
const HEX_REGEX = /^#[0-9A-Fa-f]{6}$/

function createClient(apiKey: string) {
  return new OpenRouter({ apiKey })
}

export async function generateDesignPreview(
  apiKey: string,
  prompt: string,
  canvasDataUrl: string
): Promise<string> {
  const client = createClient(apiKey)

  const result = await client.chat.send({
    chatGenerationParams: {
      model: MODEL,
      messages: [
        {
          role: 'user' as const,
          content: [
            { type: 'text' as const, text: prompt },
            { type: 'image_url' as const, imageUrl: { url: canvasDataUrl } },
          ],
        },
      ],
      stream: false,
    },
  })

  // Check for images in the response (dedicated field for image generation models)
  const message = result.choices?.[0]?.message
  if (message?.images && message.images.length > 0) {
    return message.images[0].imageUrl.url
  }

  // Fallback: try to extract image from text content
  const content = typeof message?.content === 'string' ? message.content : ''
  const extracted = extractImageFromResponse(content)
  if (extracted) return extracted

  throw new Error('No image was generated. The model may not support image generation.')
}

export async function sendChatMessage(
  apiKey: string,
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
): Promise<string> {
  const client = createClient(apiKey)

  const result = await client.chat.send({
    chatGenerationParams: {
      model: MODEL,
      messages: messages.map(m => ({
        role: m.role as 'user',
        content: m.content,
      })),
      stream: false,
    },
  })

  const content = result.choices?.[0]?.message?.content
  if (typeof content === 'string') return content
  throw new Error('No response received from the model.')
}

export function extractImageFromResponse(content: string): string | null {
  // data URL pattern
  const dataUrlMatch = content.match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/)
  if (dataUrlMatch) return dataUrlMatch[0]

  // markdown image with URL
  const mdMatch = content.match(/!\[.*?\]\((https?:\/\/[^\s)]+)\)/)
  if (mdMatch) return mdMatch[1]

  // bare base64 block (long string without spaces)
  const stripped = content.trim()
  if (stripped.length > 1000 && !/\s/.test(stripped) && /^[A-Za-z0-9+/=]+$/.test(stripped)) {
    return `data:image/png;base64,${stripped}`
  }

  return null
}

export function parseActionsFromResponse(content: string): AIAction[] {
  // Try to extract JSON block from markdown code fence
  const fenceMatch = content.match(/```json\s*\n?([\s\S]*?)```/)
  let jsonStr = fenceMatch?.[1]?.trim()

  // Fallback: try bare JSON object
  if (!jsonStr) {
    const bareMatch = content.match(/\{\s*"suggestions"\s*:\s*\[[\s\S]*?\]\s*\}/)
    jsonStr = bareMatch?.[0]
  }

  if (!jsonStr) return []

  try {
    const parsed = JSON.parse(jsonStr)
    const suggestions: unknown[] = parsed.suggestions
    if (!Array.isArray(suggestions)) return []

    return suggestions
      .filter((s): s is Record<string, unknown> => {
        if (!s || typeof s !== 'object') return false
        const item = s as Record<string, unknown>
        if (typeof item.type !== 'string' || !VALID_TYPES.has(item.type)) return false
        if (typeof item.label !== 'string') return false

        switch (item.type) {
          case 'fabric':
            return typeof item.value === 'string' && FABRIC_SET.has(item.value)
          case 'pattern':
            return typeof item.value === 'string' && PATTERN_SET.has(item.value)
          case 'decoration':
            return typeof item.value === 'string' && DECORATION_SET.has(item.value)
          case 'color':
            return typeof item.value === 'string' && HEX_REGEX.test(item.value)
          case 'palette':
            return Array.isArray(item.value) && item.value.every(
              (v: unknown) => typeof v === 'string' && HEX_REGEX.test(v)
            )
          default:
            return false
        }
      })
      .map(s => ({
        id: uuid(),
        type: s.type as AIAction['type'],
        value: s.value as string | string[],
        target: typeof s.target === 'string' ? s.target : undefined,
        label: s.label as string,
        applied: false,
      }))
  } catch {
    return []
  }
}
