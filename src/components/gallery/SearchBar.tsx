import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { useUIStore } from '../../stores/uiStore'

export default function SearchBar() {
  const { t } = useTranslation()
  const { searchQuery, setSearch } = useUIStore()
  return (
    <InputGroup size="sm" maxW="250px">
      <InputLeftElement><SearchIcon color="gray.400" /></InputLeftElement>
      <Input
        placeholder={t('gallery.search')}
        value={searchQuery}
        onChange={e => setSearch(e.target.value)}
        borderRadius="full"
        bg="white"
      />
    </InputGroup>
  )
}
