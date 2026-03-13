import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, HStack, Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useDesignStore } from '../../stores/designStore'
import { getGarmentType } from '../../catalog'
import { createTemplateElements } from '../../utils/templateLayouts'
import PartsLibrary from '../sidebar/PartsLibrary'
import DesignCanvas from '../canvas/DesignCanvas'
import PropertiesPanel from '../properties/PropertiesPanel'
import AIPanel from '../ai/AIPanel'
import ActionBar from './ActionBar'
import UnsavedChangesGuard from '../common/UnsavedChangesGuard'

export default function AtelierPage() {
  const { t } = useTranslation()
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

        {/* Right: properties + AI panel */}
        <Box w="260px" minW="260px" h="100%" bg="white" borderLeft="1px solid" borderColor="gray.100">
          <Tabs variant="enclosed" size="sm" h="100%" display="flex" flexDir="column">
            <TabList flexShrink={0}>
              <Tab fontSize="xs">{t('panel.properties')}</Tab>
              <Tab fontSize="xs">{t('panel.ai')}</Tab>
            </TabList>
            <TabPanels flex={1} minH={0} overflowY="auto">
              <TabPanel p={3} h="100%">
                <PropertiesPanel />
              </TabPanel>
              <TabPanel p={3} h="100%">
                <AIPanel />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </HStack>
    </Box>
  )
}
