import { useState, useRef, useEffect } from 'react'
import {
  Box, Text, VStack, HStack, Input, IconButton, Button, Spinner, Alert, AlertIcon,
} from '@chakra-ui/react'
import { ArrowForwardIcon, DeleteIcon, CheckIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'
import { useAIStore } from '../../stores/aiStore'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import { getGarmentType } from '../../catalog'
import { buildSuggestionsSystemPrompt } from '../../utils/aiPrompts'
import { sendChatMessage, parseActionsFromResponse } from '../../services/openrouter'
import { pushSnapshot } from '../../stores/canvasHistoryRef'
import ActionPreview from './ActionPreview'
import type { ChatMessage, AIAction, FabricType, PatternType, DecorationType, CanvasElement } from '../../types'

export default function DesignSuggestions() {
  const { t } = useTranslation()
  const apiKey = useAIStore(s => s.apiKey)
  const suggestionsLoading = useAIStore(s => s.suggestionsLoading)
  const suggestionsError = useAIStore(s => s.suggestionsError)
  const setSuggestionsLoading = useAIStore(s => s.setSuggestionsLoading)
  const setSuggestionsError = useAIStore(s => s.setSuggestionsError)
  const addChatMessage = useAIStore(s => s.addChatMessage)
  const clearChat = useAIStore(s => s.clearChat)
  const markActionApplied = useAIStore(s => s.markActionApplied)
  const getChatHistory = useAIStore(s => s.getChatHistory)

  const design = useDesignStore(s => s.getCurrentDesign())
  const updateDesign = useDesignStore(s => s.updateCurrentDesign)
  const locale = useUIStore(s => s.locale)
  const setDirty = useUIStore(s => s.setDirty)

  const [inputValue, setInputValue] = useState('')
  const [previewingAction, setPreviewingAction] = useState<{ messageId: string; actionId: string } | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const designId = design?.id
  const messages = designId ? getChatHistory(designId) : []

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages.length])

  const handleSend = async () => {
    if (!apiKey || !design || !designId || !inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: uuid(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    }

    addChatMessage(designId, userMessage)
    setInputValue('')
    setSuggestionsLoading(true)
    setSuggestionsError(null)

    try {
      const garmentType = getGarmentType(design.garmentTypeId)
      const garmentTypeName = garmentType?.nameKey ? t(garmentType.nameKey) : design.garmentTypeId
      const systemPrompt = buildSuggestionsSystemPrompt(design, garmentTypeName, locale)

      const history = getChatHistory(designId)
      const recentHistory = history.slice(-20)
      const apiMessages = [
        { role: 'system' as const, content: systemPrompt },
        ...recentHistory.map(m => ({ role: m.role, content: m.content })),
      ]

      const responseText = await sendChatMessage(apiKey, apiMessages)
      const actions = parseActionsFromResponse(responseText)

      const assistantMessage: ChatMessage = {
        id: uuid(),
        role: 'assistant',
        content: responseText,
        actions: actions.length > 0 ? actions : undefined,
        timestamp: new Date().toISOString(),
      }

      addChatMessage(designId, assistantMessage)
    } catch (err) {
      setSuggestionsError(err instanceof Error ? err.message : t('ai.suggestions.error'))
    } finally {
      setSuggestionsLoading(false)
    }
  }

  const handleApplyAction = (action: AIAction, messageId: string) => {
    if (!design || !designId) return

    pushSnapshot(design.elements)

    switch (action.type) {
      case 'fabric':
        updateDesign({ fabric: action.value as FabricType })
        break
      case 'pattern':
        updateDesign({ pattern: action.value as PatternType })
        break
      case 'decoration': {
        const val = action.value as DecorationType
        const exists = design.decorations.includes(val)
        updateDesign({
          decorations: exists
            ? design.decorations.filter(d => d !== val)
            : [...design.decorations, val],
        })
        break
      }
      case 'color': {
        if (action.target === 'all') {
          updateDesign({
            elements: design.elements.map(el => ({
              ...el,
              color: action.value as string,
            })) as CanvasElement[],
          })
        } else if (action.target) {
          updateDesign({
            elements: design.elements.map(el =>
              el.id === action.target
                ? { ...el, color: action.value as string }
                : el
            ) as CanvasElement[],
          })
        }
        break
      }
      case 'palette': {
        const colors = action.value as string[]
        updateDesign({
          elements: design.elements.map((el, i) => ({
            ...el,
            color: colors[i % colors.length],
          })) as CanvasElement[],
        })
        break
      }
    }

    markActionApplied(designId, messageId, action.id)
    setPreviewingAction(null)
    setDirty(true)
  }

  const getDisplayContent = (content: string): string => {
    // Strip the JSON block from display
    return content.replace(/```json\s*\n?[\s\S]*?```/g, '').trim()
  }

  if (!design) {
    return (
      <Text fontSize="xs" color="gray.400" textAlign="center">
        {t('ai.suggestions.noDesign')}
      </Text>
    )
  }

  return (
    <Box display="flex" flexDir="column" h="100%">
      <HStack justify="space-between" mb={2}>
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="gray.500">
          {t('ai.suggestions.title')}
        </Text>
        {messages.length > 0 && (
          <IconButton
            aria-label={t('ai.suggestions.clearChat')}
            icon={<DeleteIcon />}
            size="xs"
            variant="ghost"
            onClick={() => designId && clearChat(designId)}
          />
        )}
      </HStack>

      {/* Messages area */}
      <Box ref={scrollRef} flex={1} overflowY="auto" mb={2} minH={0}>
        <VStack spacing={2} align="stretch">
          {messages.filter(m => m.role !== 'system').map(msg => (
            <Box key={msg.id}>
              <Box
                bg={msg.role === 'user' ? 'brand.50' : 'gray.50'}
                borderRadius="lg"
                px={3}
                py={2}
                maxW="85%"
                ml={msg.role === 'user' ? 'auto' : 0}
                mr={msg.role === 'assistant' ? 'auto' : 0}
              >
                <Text fontSize="xs" whiteSpace="pre-wrap">
                  {msg.role === 'assistant' ? getDisplayContent(msg.content) : msg.content}
                </Text>
              </Box>

              {/* Action buttons for assistant messages */}
              {msg.role === 'assistant' && msg.actions && msg.actions.length > 0 && (
                <VStack spacing={1} mt={1} align="stretch" pl={1}>
                  {msg.actions.map(action => (
                    <Box key={action.id}>
                      {action.applied ? (
                        <HStack spacing={1}>
                          <CheckIcon color="green.500" boxSize={3} />
                          <Text fontSize="2xs" color="green.600">{action.label} — {t('ai.suggestions.applied')}</Text>
                        </HStack>
                      ) : (
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => setPreviewingAction({ messageId: msg.id, actionId: action.id })}
                        >
                          {action.label} — {t('ai.suggestions.apply')}
                        </Button>
                      )}

                      {previewingAction?.messageId === msg.id && previewingAction?.actionId === action.id && (
                        <ActionPreview
                          action={action}
                          design={design}
                          onConfirm={() => handleApplyAction(action, msg.id)}
                          onCancel={() => setPreviewingAction(null)}
                        />
                      )}
                    </Box>
                  ))}
                </VStack>
              )}
            </Box>
          ))}

          {suggestionsLoading && (
            <HStack spacing={2} py={2}>
              <Spinner size="xs" color="gray.400" />
              <Text fontSize="xs" color="gray.500">{t('ai.suggestions.loading')}</Text>
            </HStack>
          )}

          {suggestionsError && (
            <Alert status="error" fontSize="xs" borderRadius="md">
              <AlertIcon />
              {suggestionsError}
            </Alert>
          )}
        </VStack>
      </Box>

      {/* Input area */}
      <HStack>
        <Input
          size="sm"
          placeholder={t('ai.suggestions.placeholder')}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
          isDisabled={!apiKey || suggestionsLoading}
        />
        <IconButton
          aria-label={t('ai.suggestions.send')}
          icon={<ArrowForwardIcon />}
          size="sm"
          colorScheme="brand"
          onClick={handleSend}
          isDisabled={!apiKey || !inputValue.trim() || suggestionsLoading}
        />
      </HStack>
    </Box>
  )
}
