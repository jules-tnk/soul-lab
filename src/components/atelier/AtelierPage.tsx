import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, HStack } from '@chakra-ui/react'
import { useDesignStore } from '../../stores/designStore'
import { getGarmentType } from '../../catalog'
import { createTemplateElements } from '../../utils/templateLayouts'
import PartsLibrary from '../sidebar/PartsLibrary'
import DesignCanvas from '../canvas/DesignCanvas'
import PropertiesPanel from '../properties/PropertiesPanel'
import ActionBar from './ActionBar'
import UnsavedChangesGuard from '../common/UnsavedChangesGuard'

export default function AtelierPage() {
  const { id } = useParams<{ id?: string }>()

  const designs = useDesignStore(s => s.designs)
  const currentDesignId = useDesignStore(s => s.currentDesignId)
  const createDesign = useDesignStore(s => s.createDesign)
  const loadDesign = useDesignStore(s => s.loadDesign)

  useEffect(() => {
    if (id) {
      const found = designs.find(d => d.id === id)
      if (found) loadDesign(id)
    } else if (!currentDesignId) {
      const garmentType = getGarmentType('shirt')
      if (garmentType) {
        const elements = createTemplateElements(garmentType)
        createDesign('shirt', 'New Shirt', elements)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Box h="calc(100vh - 64px)" overflow="hidden">
      <UnsavedChangesGuard />
      <HStack h="100%" spacing={0} align="stretch">
        {/* Left sidebar */}
        <PartsLibrary />

        {/* Center: canvas + action bar */}
        <Box flex={1} display="flex" flexDir="column" overflow="hidden">
          <Box flex={1} overflow="auto" display="flex" justifyContent="center" alignItems="flex-start" p={4}>
            <DesignCanvas />
          </Box>
          <Box px={4} pb={3}>
            <ActionBar />
          </Box>
        </Box>

        {/* Right: properties panel */}
        <Box
          w="260px"
          minW="260px"
          h="100%"
          overflowY="auto"
          bg="white"
          borderLeft="1px solid"
          borderColor="gray.100"
          p={3}
        >
          <PropertiesPanel />
        </Box>
      </HStack>
    </Box>
  )
}
