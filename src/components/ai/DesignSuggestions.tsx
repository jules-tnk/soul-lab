import { useState, useRef, useEffect } from 'react'
import {
  Box, Text, VStack, HStack, Input, IconButton, Spinner, Alert, AlertIcon,
} from '@chakra-ui/react'
import { ArrowForwardIcon, DeleteIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import Markdown from 'react-markdown'
import { v4 as uuid } from 'uuid'
import { useAIStore } from '../../stores/aiStore'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import { getGarmentType } from '../../catalog'
import { buildSuggestionsSystemPrompt } from '../../utils/aiPrompts'
import { sendChatMessage } from '../../services/openrouter'
import type { ChatMessage } from '../../types'

export default function DesignSuggestions() {
  const { t } = useTranslation()
  const apiKey = useAIStore(s => s.apiKey)
  const suggestionsLoading = useAIStore(s => s.suggestionsLoading)
  const suggestionsError = useAIStore(s => s.suggestionsError)
  const setSuggestionsLoading = useAIStore(s => s.setSuggestionsLoading)
  const setSuggestionsError = useAIStore(s => s.setSuggestionsError)
  const addChatMessage = useAIStore(s => s.addChatMessage)
  const clearChat = useAIStore(s => s.clearChat)
  const getChatHistory = useAIStore(s => s.getChatHistory)

  const design = useDesignStore(s => s.getCurrentDesign())
  const locale = useUIStore(s => s.locale)

  const [inputValue, setInputValue] = useState('')
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

      const assistantMessage: ChatMessage = {
        id: uuid(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toISOString(),
      }

      addChatMessage(designId, assistantMessage)
    } catch (err) {
      setSuggestionsError(err instanceof Error ? err.message : t('ai.suggestions.error'))
    } finally {
      setSuggestionsLoading(false)
    }
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
            <Box
              key={msg.id}
              bg={msg.role === 'user' ? 'brand.50' : 'gray.50'}
              borderRadius="lg"
              px={3}
              py={2}
              maxW="85%"
              ml={msg.role === 'user' ? 'auto' : 0}
              mr={msg.role === 'assistant' ? 'auto' : 0}
            >
              {msg.role === 'assistant' ? (
                <Box className="ai-markdown" fontSize="xs">
                  <Markdown>{msg.content}</Markdown>
                </Box>
              ) : (
                <Text fontSize="xs" whiteSpace="pre-wrap">{msg.content}</Text>
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
