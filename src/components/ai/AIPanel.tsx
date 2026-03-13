import { Box, VStack, Divider, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useDesignStore } from '../../stores/designStore'
import ApiKeySettings from './ApiKeySettings'
import DesignPreview from './DesignPreview'
import DesignSuggestions from './DesignSuggestions'

export default function AIPanel() {
  const { t } = useTranslation()
  const design = useDesignStore(s => s.getCurrentDesign())

  if (!design) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" h="100%" p={4}>
        <Text fontSize="sm" color="gray.400" textAlign="center">
          {t('ai.preview.noDesign')}
        </Text>
      </Box>
    )
  }

  return (
    <VStack align="stretch" spacing={3} h="100%">
      <ApiKeySettings />
      <Divider />
      <DesignPreview />
      <Divider />
      <Box flex={1} minH={0} display="flex" flexDir="column">
        <DesignSuggestions />
      </Box>
    </VStack>
  )
}
