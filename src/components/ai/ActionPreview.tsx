import { Box, Text, HStack, Button, Circle } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import type { AIAction, Design } from '../../types'

interface Props {
  action: AIAction
  design: Design
  onConfirm: () => void
  onCancel: () => void
}

export default function ActionPreview({ action, design, onConfirm, onCancel }: Props) {
  const { t } = useTranslation()

  const renderChangeDescription = () => {
    switch (action.type) {
      case 'fabric':
        return (
          <Text fontSize="xs">
            {t('ai.action.fabricChange', { from: design.fabric, to: action.value })}
          </Text>
        )
      case 'pattern':
        return (
          <Text fontSize="xs">
            {t('ai.action.patternChange', { from: design.pattern, to: action.value })}
          </Text>
        )
      case 'decoration': {
        const exists = design.decorations.includes(action.value as typeof design.decorations[number])
        return (
          <Text fontSize="xs">
            {exists
              ? t('ai.action.decorationRemove', { value: action.value })
              : t('ai.action.decorationAdd', { value: action.value })}
          </Text>
        )
      }
      case 'color': {
        const targetEl = action.target === 'all'
          ? undefined
          : design.elements.find(el => el.id === action.target)
        const fromColor = targetEl?.color ?? t('ai.action.colorAll')
        return (
          <HStack spacing={2}>
            <Text fontSize="xs">{t('ai.action.colorChange', { from: fromColor, to: action.value })}</Text>
            {typeof action.value === 'string' && (
              <Circle size="14px" bg={action.value} border="1px solid" borderColor="gray.300" />
            )}
          </HStack>
        )
      }
      case 'palette':
        return (
          <HStack spacing={1} flexWrap="wrap">
            <Text fontSize="xs" mr={1}>Palette:</Text>
            {Array.isArray(action.value) && action.value.map((color, i) => (
              <Circle key={i} size="14px" bg={color} border="1px solid" borderColor="gray.300" />
            ))}
          </HStack>
        )
    }
  }

  return (
    <Box bg="yellow.50" border="1px solid" borderColor="yellow.200" borderRadius="md" p={2} mt={1}>
      <Text fontSize="2xs" fontWeight="700" color="gray.600" mb={1}>
        {t('ai.action.previewTitle')}
      </Text>
      {renderChangeDescription()}
      <HStack mt={2} spacing={2}>
        <Button size="xs" variant="ghost" onClick={onCancel}>
          {t('ai.action.cancel')}
        </Button>
        <Button size="xs" colorScheme="brand" onClick={onConfirm}>
          {t('ai.action.confirm')}
        </Button>
      </HStack>
    </Box>
  )
}
