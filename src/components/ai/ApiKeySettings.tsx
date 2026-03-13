import { useState } from 'react'
import {
  Box, Text, Input, InputGroup, InputRightElement,
  Button, IconButton, HStack, useToast,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon, SettingsIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { useAIStore } from '../../stores/aiStore'

export default function ApiKeySettings() {
  const { t } = useTranslation()
  const apiKey = useAIStore(s => s.apiKey)
  const setApiKey = useAIStore(s => s.setApiKey)
  const clearApiKey = useAIStore(s => s.clearApiKey)
  const toast = useToast()

  const [isOpen, setIsOpen] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const maskedKey = apiKey
    ? `${apiKey.slice(0, 3)}...${apiKey.slice(-4)}`
    : null

  const handleSave = () => {
    if (!inputValue.trim()) return
    setApiKey(inputValue.trim())
    setInputValue('')
    setIsOpen(false)
    toast({
      title: t('ai.apiKey.saved'),
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const handleRemove = () => {
    clearApiKey()
    setInputValue('')
  }

  return (
    <Box>
      <HStack justify="space-between">
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="gray.500">
          {t('ai.apiKey.label')}
        </Text>
        <IconButton
          aria-label="Settings"
          icon={<SettingsIcon />}
          size="xs"
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
        />
      </HStack>

      {!isOpen && maskedKey && (
        <Text fontSize="xs" color="gray.600" mt={1}>{maskedKey}</Text>
      )}

      {!isOpen && !apiKey && (
        <Text fontSize="xs" color="orange.500" mt={1}>{t('ai.apiKey.missing')}</Text>
      )}

      {isOpen && (
        <Box mt={2}>
          {apiKey ? (
            <HStack>
              <Text fontSize="xs" color="gray.600" flex={1}>{maskedKey}</Text>
              <Button size="xs" colorScheme="red" variant="outline" onClick={handleRemove}>
                {t('ai.apiKey.remove')}
              </Button>
            </HStack>
          ) : (
            <>
              <InputGroup size="sm">
                <Input
                  type={showKey ? 'text' : 'password'}
                  placeholder={t('ai.apiKey.placeholder')}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSave()}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showKey ? t('ai.apiKey.hide') : t('ai.apiKey.show')}
                    icon={showKey ? <ViewOffIcon /> : <ViewIcon />}
                    size="xs"
                    variant="ghost"
                    onClick={() => setShowKey(!showKey)}
                  />
                </InputRightElement>
              </InputGroup>
              <Button size="sm" colorScheme="brand" mt={2} onClick={handleSave} isDisabled={!inputValue.trim()}>
                {t('ai.apiKey.save')}
              </Button>
            </>
          )}
        </Box>
      )}
    </Box>
  )
}
