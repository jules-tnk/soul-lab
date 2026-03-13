import { useEffect, useState, useCallback, useRef } from 'react'
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

const MIN_PANEL_W = 220
const MAX_PANEL_W = 480
const DEFAULT_PANEL_W = 260

export default function AtelierPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id?: string }>()

  const designs = useDesignStore(s => s.designs)
  const currentDesignId = useDesignStore(s => s.currentDesignId)
  const createDesign = useDesignStore(s => s.createDesign)
  const loadDesign = useDesignStore(s => s.loadDesign)

  const [panelW, setPanelW] = useState(DEFAULT_PANEL_W)
  const dragging = useRef(false)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    dragging.current = true
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    const newW = window.innerWidth - e.clientX
    setPanelW(Math.min(MAX_PANEL_W, Math.max(MIN_PANEL_W, newW)))
  }, [])

  const onPointerUp = useCallback(() => {
    dragging.current = false
  }, [])

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

        {/* Resize handle */}
        <Box
          w="4px"
          cursor="col-resize"
          bg="transparent"
          _hover={{ bg: 'brand.200' }}
          transition="background 0.15s"
          flexShrink={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />

        {/* Right: properties + AI panel */}
        <Box w={`${panelW}px`} minW={`${MIN_PANEL_W}px`} h="100%" bg="white" borderLeft="1px solid" borderColor="gray.100">
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
