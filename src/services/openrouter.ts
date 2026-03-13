import { OpenRouter } from '@openrouter/sdk'

const MODEL = 'google/gemini-3.1-flash-image-preview'

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
