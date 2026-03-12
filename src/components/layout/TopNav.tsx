import { HStack, Text, Button, ButtonGroup, Spacer } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUIStore } from '../../stores/uiStore'

export default function TopNav() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { locale, toggleLocale } = useUIStore()

  const handleLocaleToggle = () => {
    const next = locale === 'fr' ? 'en' : 'fr'
    i18n.changeLanguage(next)
    toggleLocale()
  }

  const isAtelier = location.pathname.startsWith('/atelier')
  const isGallery = location.pathname === '/gallery'

  return (
    <HStack
      px={6} py={3}
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.100"
      boxShadow="sm"
    >
      <Text fontSize="xl" fontWeight="800" color="brand.500">
        Soul Lab
      </Text>
      <Text fontSize="sm" color="gray.400" fontStyle="italic">
        {t('app.subtitle')}
      </Text>
      <Spacer />
      <ButtonGroup size="sm" variant="ghost" spacing={1}>
        <Button
          onClick={() => navigate('/atelier')}
          colorScheme={isAtelier ? 'brand' : 'gray'}
          variant={isAtelier ? 'solid' : 'ghost'}
        >
          {t('nav.atelier')}
        </Button>
        <Button
          onClick={() => navigate('/gallery')}
          colorScheme={isGallery ? 'brand' : 'gray'}
          variant={isGallery ? 'solid' : 'ghost'}
        >
          {t('nav.gallery')}
        </Button>
      </ButtonGroup>
      <Button size="sm" variant="outline" onClick={handleLocaleToggle}>
        {locale === 'fr' ? 'EN' : 'FR'}
      </Button>
    </HStack>
  )
}
