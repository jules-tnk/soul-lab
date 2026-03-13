import { Box, Text, SimpleGrid, Button, Tabs, TabList, Tab } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { getCategories, getGarmentTypesForCategory, getGarmentType } from '../../catalog'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import { createTemplateElements } from '../../utils/templateLayouts'

export default function TemplateButtons() {
  const { t } = useTranslation()
  const categories = getCategories()
  const activeCategoryId = useUIStore(s => s.activeCategoryId)
  const setActiveCategory = useUIStore(s => s.setActiveCategory)
  const createDesign = useDesignStore(s => s.createDesign)
  const updateDesign = useDesignStore(s => s.updateCurrentDesign)
  const setDirty = useUIStore(s => s.setDirty)
  const clearSelection = useUIStore(s => s.clearSelection)
  const design = useDesignStore(s => s.getCurrentDesign())

  const types = getGarmentTypesForCategory(activeCategoryId)
  const catIndex = categories.findIndex(c => c.id === activeCategoryId)

  const handleSelectType = (typeId: string) => {
    const gt = getGarmentType(typeId)
    if (!gt) return
    const elements = createTemplateElements(gt)

    if (!design) {
      createDesign(typeId, t(gt.nameKey), elements)
    } else {
      updateDesign({
        garmentTypeId: typeId,
        elements,
      })
      setDirty(true)
    }
    clearSelection()
  }

  return (
    <Box>
      <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="brand.500" mb={2}>
        {t('canvas.templates', 'Templates')}
      </Text>
      <Tabs
        index={catIndex}
        onChange={i => setActiveCategory(categories[i].id)}
        size="xs"
        variant="soft-rounded"
        colorScheme="brand"
        mb={2}
      >
        <TabList flexWrap="wrap" gap={1}>
          {categories.map(c => (
            <Tab key={c.id} fontSize="2xs" px={2} py={1}>{t(c.nameKey)}</Tab>
          ))}
        </TabList>
      </Tabs>
      <SimpleGrid columns={2} spacing={1}>
        {types.map(gt => (
          <Button
            key={gt.id}
            size="xs"
            variant={design?.garmentTypeId === gt.id ? 'solid' : 'outline'}
            colorScheme={design?.garmentTypeId === gt.id ? 'brand' : 'gray'}
            onClick={() => handleSelectType(gt.id)}
            fontSize="2xs"
            h="auto"
            py={1}
            whiteSpace="normal"
          >
            {t(gt.nameKey)}
          </Button>
        ))}
      </SimpleGrid>
    </Box>
  )
}
