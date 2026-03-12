import {
  Box,
  VStack,
  Text,
  Select,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  Textarea,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FABRICS, PATTERNS, DECORATIONS } from '../../types'
import type { FabricType, PatternType, DecorationType } from '../../types'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import TagInput from './TagInput'

const JEANS_PATTERNS = ['raw', 'light-wash', 'medium-wash', 'dark-wash', 'distressed', 'acid-wash']

export default function MetadataPanel() {
  const { t } = useTranslation()
  const design = useDesignStore(s => s.designs.find(d => d.id === s.currentDesignId))
  const updateCurrentDesign = useDesignStore(s => s.updateCurrentDesign)
  const setDirty = useUIStore(s => s.setDirty)

  if (!design) return null

  const update = <K extends keyof typeof design>(key: K, val: (typeof design)[K]) => {
    updateCurrentDesign({ [key]: val })
    setDirty(true)
  }

  const isJeans = design.garmentTypeId === 'jeans'
  const availablePatterns = isJeans
    ? [...PATTERNS, ...JEANS_PATTERNS]
    : [...PATTERNS]

  const toggleDecoration = (dec: DecorationType) => {
    const current = design.decorations
    const next = current.includes(dec) ? current.filter(d => d !== dec) : [...current, dec]
    update('decorations', next)
  }

  const sectionLabel = (key: string) => (
    <Text fontSize="xs" fontWeight="semibold" color="gray.500" textTransform="uppercase" letterSpacing="wide" mb={1}>
      {t(`metadata.${key}`)}
    </Text>
  )

  const card = (children: React.ReactNode) => (
    <Box bg="white" borderRadius="md" p={3} border="1px solid" borderColor="gray.200" w="100%">
      {children}
    </Box>
  )

  return (
    <VStack spacing={3} align="stretch" w="100%">
      {card(
        <>
          {sectionLabel('fabric')}
          <Select
            size="sm"
            value={design.fabric}
            onChange={e => update('fabric', e.target.value as FabricType)}
          >
            {FABRICS.map(f => (
              <option key={f} value={f}>
                {t(`fabrics.${f}`, { defaultValue: f })}
              </option>
            ))}
          </Select>
        </>
      )}
      {card(
        <>
          {sectionLabel('pattern')}
          <Wrap spacing={2}>
            {availablePatterns.map(p => (
              <WrapItem key={p}>
                <Tag
                  size="sm"
                  cursor="pointer"
                  variant={design.pattern === p ? 'solid' : 'outline'}
                  colorScheme={design.pattern === p ? 'brand' : 'gray'}
                  onClick={() => update('pattern', p as PatternType)}
                  _hover={{ opacity: 0.8 }}
                >
                  <TagLabel>{t(`patterns.${p}`, { defaultValue: p })}</TagLabel>
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </>
      )}
      {card(
        <>
          {sectionLabel('decorations')}
          <Wrap spacing={2}>
            {DECORATIONS.map(dec => (
              <WrapItem key={dec}>
                <Tag
                  size="sm"
                  cursor="pointer"
                  variant={design.decorations.includes(dec) ? 'solid' : 'outline'}
                  colorScheme={design.decorations.includes(dec) ? 'brand' : 'gray'}
                  onClick={() => toggleDecoration(dec)}
                  _hover={{ opacity: 0.8 }}
                >
                  <TagLabel>{t(`decorations.${dec}`, { defaultValue: dec })}</TagLabel>
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </>
      )}
      {card(
        <>
          {sectionLabel('tags')}
          <TagInput
            value={design.tags}
            onChange={tags => update('tags', tags)}
            suggestions={[]}
          />
        </>
      )}
      {card(
        <>
          {sectionLabel('notes')}
          <Textarea
            size="sm"
            value={design.notes}
            onChange={e => update('notes', e.target.value)}
            rows={3}
            resize="vertical"
            placeholder={t('metadata.notes')}
          />
        </>
      )}
    </VStack>
  )
}
