import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Grid,
  Input,
  VStack,
} from '@chakra-ui/react'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import { getGarmentType, getDefaultParts } from '../../catalog'
import GarmentPreview from './GarmentPreview'
import ConfigPanel from './ConfigPanel'
import ActionBar from './ActionBar'

export default function AtelierPage() {
  const { id } = useParams<{ id?: string }>()

  const designs = useDesignStore(s => s.designs)
  const currentDesignId = useDesignStore(s => s.currentDesignId)
  const createDesign = useDesignStore(s => s.createDesign)
  const loadDesign = useDesignStore(s => s.loadDesign)
  const updateCurrentDesign = useDesignStore(s => s.updateCurrentDesign)

  const setDirty = useUIStore(s => s.setDirty)

  const design = designs.find(d => d.id === currentDesignId)

  useEffect(() => {
    if (id) {
      const found = designs.find(d => d.id === id)
      if (found) {
        loadDesign(id)
      }
    } else if (!currentDesignId) {
      const garmentType = getGarmentType('shirt')
      const newId = createDesign('shirt', 'New Shirt')
      if (garmentType) {
        const store = useDesignStore.getState()
        const created = store.designs.find(d => d.id === newId)
        if (created) {
          store.updateCurrentDesign({ parts: getDefaultParts(garmentType) })
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCurrentDesign({ name: e.target.value })
    setDirty(true)
  }

  return (
    <Box px={{ base: 3, md: 6 }} py={4} maxW="1100px" mx="auto">
      <VStack spacing={4} align="stretch">
        <Input
          value={design?.name ?? ''}
          onChange={handleNameChange}
          variant="flushed"
          textAlign="center"
          fontSize="xl"
          fontWeight="semibold"
          placeholder="Design name"
          isDisabled={!design}
          maxW="400px"
          mx="auto"
        />
        <Grid
          templateColumns={{ base: '1fr', md: '3fr 2fr' }}
          gap={6}
          alignItems="start"
        >
          <GarmentPreview />
          <ConfigPanel />
        </Grid>
        <ActionBar />
      </VStack>
    </Box>
  )
}
