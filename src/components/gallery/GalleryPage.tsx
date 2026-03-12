import { Box, SimpleGrid, Text, VStack, Button, HStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import DesignCard from './DesignCard'
import TagFilter from './TagFilter'
import SearchBar from './SearchBar'

export default function GalleryPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const designs = useDesignStore(s => s.designs)
  const { tagFilter, searchQuery, setTagFilter, setSearch } = useUIStore()

  const filtered = designs.filter(d => {
    if (tagFilter.length > 0 && !tagFilter.every(tag => d.tags.includes(tag))) return false
    if (searchQuery && !d.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <Box px={6} py={6} maxW="1200px" mx="auto">
      <HStack justify="space-between" mb={6}>
        <Text fontSize="xl" fontWeight="700" color="brand.500">
          {t('nav.gallery')}
        </Text>
        <HStack spacing={4}>
          <TagFilter />
          <SearchBar />
        </HStack>
      </HStack>

      {designs.length === 0 ? (
        <VStack py={20} spacing={4}>
          <Text color="gray.500">{t('gallery.empty')}</Text>
          <Button colorScheme="brand" onClick={() => navigate('/atelier')}>
            {t('nav.atelier')}
          </Button>
        </VStack>
      ) : filtered.length === 0 ? (
        <VStack py={20} spacing={4}>
          <Text color="gray.500">{t('gallery.noResults')}</Text>
          <Button variant="outline" size="sm" onClick={() => { setTagFilter([]); setSearch('') }}>
            {t('gallery.clearFilters')}
          </Button>
        </VStack>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
          {filtered.map(d => <DesignCard key={d.id} design={d} />)}
        </SimpleGrid>
      )}
    </Box>
  )
}
