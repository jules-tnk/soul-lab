import {
  Box,
  HStack,
  Tag,
  TagLabel,
  Tabs,
  TabList,
  Tab,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import {
  getCategories,
  getGarmentTypesForCategory,
  getGarmentType,
  getDefaultParts,
} from '../../catalog'

export default function GarmentTypeSelector() {
  const { t } = useTranslation()
  const categories = getCategories()

  const activeCategoryId = useUIStore(s => s.activeCategoryId)
  const setActiveCategory = useUIStore(s => s.setActiveCategory)

  const design = useDesignStore(s => s.designs.find(d => d.id === s.currentDesignId))
  const createDesign = useDesignStore(s => s.createDesign)
  const updateCurrentDesign = useDesignStore(s => s.updateCurrentDesign)

  const activeCategoryIndex = categories.findIndex(c => c.id === activeCategoryId)
  const garmentTypes = getGarmentTypesForCategory(activeCategoryId)

  const handleTabChange = (index: number) => {
    setActiveCategory(categories[index]?.id ?? categories[0].id)
  }

  const handleTypeSelect = (garmentTypeId: string) => {
    if (!design) {
      createDesign(garmentTypeId, t(`garments.${activeCategoryId}.${garmentTypeId}.name`, { defaultValue: garmentTypeId }))
      return
    }
    if (design.garmentTypeId === garmentTypeId) return
    const garmentType = getGarmentType(garmentTypeId)
    const defaultParts = garmentType ? getDefaultParts(garmentType) : {}
    updateCurrentDesign({ garmentTypeId, parts: defaultParts })
  }

  return (
    <Box>
      <Tabs
        index={activeCategoryIndex >= 0 ? activeCategoryIndex : 0}
        onChange={handleTabChange}
        size="sm"
        variant="soft-rounded"
        colorScheme="brand"
        mb={3}
      >
        <TabList flexWrap="wrap" gap={1}>
          {categories.map(cat => (
            <Tab key={cat.id} fontSize="xs" px={3} py={1}>
              {t(cat.nameKey)}
            </Tab>
          ))}
        </TabList>
      </Tabs>
      <HStack spacing={2} flexWrap="wrap">
        {garmentTypes.map(gt => {
          const isSelected = design?.garmentTypeId === gt.id
          return (
            <Tag
              key={gt.id}
              size="md"
              variant={isSelected ? 'solid' : 'outline'}
              colorScheme="brand"
              cursor="pointer"
              onClick={() => handleTypeSelect(gt.id)}
              _hover={{ opacity: 0.8 }}
              transition="all 0.15s"
            >
              <TagLabel>{t(gt.nameKey)}</TagLabel>
            </Tag>
          )
        })}
      </HStack>
    </Box>
  )
}
