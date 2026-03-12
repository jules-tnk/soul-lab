import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export default function AtelierPage() {
  const { t } = useTranslation()
  return (
    <Box p={6} textAlign="center">
      <Text fontSize="lg" color="gray.500">{t('nav.atelier')} — loading...</Text>
    </Box>
  )
}
