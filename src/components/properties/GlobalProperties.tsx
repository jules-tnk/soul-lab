import { VStack, Box, Text, Input, Select, HStack, Tag, TagLabel, TagCloseButton, Textarea } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FABRICS, PATTERNS, DECORATIONS } from '../../types'
import type { FabricType, PatternType, DecorationType } from '../../types'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'

export default function GlobalProperties() {
  const { t } = useTranslation()
  const design = useDesignStore(s => s.getCurrentDesign())
  const updateDesign = useDesignStore(s => s.updateCurrentDesign)
  const setDirty = useUIStore(s => s.setDirty)

  if (!design) return null

  const update = (patch: Record<string, unknown>) => {
    updateDesign(patch)
    setDirty(true)
  }

  return (
    <VStack align="stretch" spacing={3}>
      <Box>
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="gray.500" mb={1}>
          {t('metadata.designName', 'Name')}
        </Text>
        <Input size="sm" value={design.name} onChange={e => update({ name: e.target.value })} />
      </Box>

      <Box>
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="accent.blue" mb={1}>
          {t('metadata.fabric')}
        </Text>
        <Select size="sm" value={design.fabric} onChange={e => update({ fabric: e.target.value as FabricType })}>
          {FABRICS.map(f => <option key={f} value={f}>{t(`fabrics.${f}`)}</option>)}
        </Select>
      </Box>

      <Box>
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="accent.teal" mb={1}>
          {t('metadata.pattern')}
        </Text>
        <HStack wrap="wrap" spacing={1}>
          {PATTERNS.map(p => (
            <Tag key={p} size="sm" cursor="pointer" borderRadius="full" fontSize="2xs"
              colorScheme={design.pattern === p ? 'teal' : 'gray'}
              variant={design.pattern === p ? 'solid' : 'subtle'}
              onClick={() => update({ pattern: p as PatternType })}
            >
              {t(`patterns.${p}`)}
            </Tag>
          ))}
        </HStack>
      </Box>

      <Box>
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="accent.purple" mb={1}>
          {t('metadata.decorations')}
        </Text>
        <HStack wrap="wrap" spacing={1}>
          {DECORATIONS.map(d => {
            const sel = design.decorations.includes(d)
            return (
              <Tag key={d} size="sm" cursor="pointer" borderRadius="full" fontSize="2xs"
                colorScheme={sel ? 'purple' : 'gray'}
                variant={sel ? 'solid' : 'subtle'}
                onClick={() => update({
                  decorations: sel
                    ? design.decorations.filter(x => x !== d)
                    : [...design.decorations, d as DecorationType]
                })}
              >
                {t(`decorations.${d}`)}
              </Tag>
            )
          })}
        </HStack>
      </Box>

      {/* Tags */}
      <Box>
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="accent.orange" mb={1}>
          {t('metadata.tags')}
        </Text>
        <HStack wrap="wrap" spacing={1} mb={1}>
          {design.tags.map(tag => (
            <Tag key={tag} size="sm" colorScheme="brand" borderRadius="full">
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => update({ tags: design.tags.filter(t2 => t2 !== tag) })} />
            </Tag>
          ))}
        </HStack>
        <Input
          size="sm"
          placeholder={t('canvas.addTag', 'Add tag...')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const val = (e.target as HTMLInputElement).value.trim().toLowerCase()
              if (val && !design.tags.includes(val)) {
                update({ tags: [...design.tags, val] })
              }
              ;(e.target as HTMLInputElement).value = ''
            }
          }}
        />
      </Box>

      <Box>
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="gray.500" mb={1}>
          {t('metadata.notes')}
        </Text>
        <Textarea size="sm" value={design.notes} onChange={e => update({ notes: e.target.value })} rows={3} />
      </Box>
    </VStack>
  )
}
