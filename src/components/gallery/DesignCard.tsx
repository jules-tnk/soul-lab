import { Box, Text, HStack, Tag, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { DeleteIcon, CopyIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDesignStore } from '../../stores/designStore'
import MiniGarmentPreview from './MiniGarmentPreview'
import type { Design } from '../../types'

interface DesignCardProps {
  design: Design
}

export default function DesignCard({ design }: DesignCardProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { deleteDesign, duplicateDesign, loadDesign } = useDesignStore()

  const handleClick = () => {
    loadDesign(design.id)
    navigate(`/atelier/${design.id}`)
  }

  return (
    <Box
      bg="white"
      borderRadius="lg"
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
      p={4}
      cursor="pointer"
      onClick={handleClick}
      _hover={{ shadow: 'md', borderColor: 'brand.200' }}
      transition="all 0.2s"
      position="relative"
    >
      {/* Mini SVG thumbnail */}
      <Box
        w="80px" h="120px"
        mx="auto" mb={3}
        border="1.5px solid"
        borderColor={design.color}
        borderRadius="md"
        bg={`${design.color}08`}
        position="relative"
        color={design.color}
        overflow="hidden"
      >
        <MiniGarmentPreview design={design} />
      </Box>
      <Text fontSize="sm" fontWeight="600" textAlign="center" noOfLines={1}>
        {design.name}
      </Text>
      <HStack justify="center" mt={2} wrap="wrap" spacing={1}>
        {design.tags.slice(0, 3).map(tag => (
          <Tag key={tag} size="xs" borderRadius="full" colorScheme="gray">{tag}</Tag>
        ))}
      </HStack>

      {/* Context menu */}
      <Box position="absolute" top={2} right={2} onClick={e => e.stopPropagation()}>
        <Menu>
          <MenuButton as={IconButton} icon={<HamburgerIcon />} size="xs" variant="ghost" />
          <MenuList>
            <MenuItem icon={<CopyIcon />} onClick={() => duplicateDesign(design.id)}>
              {t('actions.duplicate')}
            </MenuItem>
            <MenuItem icon={<DeleteIcon />} color="red.500" onClick={() => deleteDesign(design.id)}>
              {t('actions.delete')}
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  )
}
