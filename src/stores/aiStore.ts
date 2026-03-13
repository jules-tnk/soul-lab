import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChatMessage } from '../types'

const EMPTY_HISTORY: ChatMessage[] = []

interface AIState {
  apiKey: string | null
  previewLoading: boolean
  previewImage: string | null
  previewError: string | null
  chatHistories: Record<string, ChatMessage[]>
  suggestionsLoading: boolean
  suggestionsError: string | null

  setApiKey: (key: string) => void
  clearApiKey: () => void
  setPreviewState: (patch: { loading?: boolean; image?: string | null; error?: string | null }) => void
  addChatMessage: (designId: string, message: ChatMessage) => void
  setSuggestionsLoading: (v: boolean) => void
  setSuggestionsError: (err: string | null) => void
  clearChat: (designId: string) => void
  getChatHistory: (designId: string) => ChatMessage[]
}

export const useAIStore = create<AIState>()(
  persist(
    (set, get) => ({
      apiKey: null,
      previewLoading: false,
      previewImage: null,
      previewError: null,
      chatHistories: {},
      suggestionsLoading: false,
      suggestionsError: null,

      setApiKey: (key) => set({ apiKey: key }),
      clearApiKey: () => set({ apiKey: null }),
      setPreviewState: (patch) =>
        set(s => ({
          previewLoading: patch.loading ?? s.previewLoading,
          previewImage: patch.image !== undefined ? patch.image : s.previewImage,
          previewError: patch.error !== undefined ? patch.error : s.previewError,
        })),

      addChatMessage: (designId, message) =>
        set(s => ({
          chatHistories: {
            ...s.chatHistories,
            [designId]: [...(s.chatHistories[designId] ?? []), message],
          },
        })),

      setSuggestionsLoading: (v) => set({ suggestionsLoading: v }),
      setSuggestionsError: (err) => set({ suggestionsError: err }),

      clearChat: (designId) =>
        set(s => {
          const { [designId]: _, ...rest } = s.chatHistories
          return { chatHistories: rest }
        }),

      getChatHistory: (designId) => get().chatHistories[designId] ?? EMPTY_HISTORY,
    }),
    {
      name: 'soul-lab-ai',
      partialize: (state) => ({
        apiKey: state.apiKey,
        chatHistories: state.chatHistories,
      }),
    }
  )
)
