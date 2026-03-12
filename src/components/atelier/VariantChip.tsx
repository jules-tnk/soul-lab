import { Tag, TagLabel } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import type { PartVariant } from '../../types'

interface VariantChipProps {
  variant: PartVariant
  isSelected: boolean
  accentColor: string
  onSelect: () => void
}

export default function VariantChip({ variant, isSelected, accentColor, onSelect }: VariantChipProps) {
  const { t } = useTranslation()
  const label = t(variant.nameKey, { defaultValue: variant.id })

  return (
    <Tag
      size="sm"
      cursor="pointer"
      onClick={onSelect}
      bg={isSelected ? accentColor : 'gray.100'}
      color={isSelected ? 'white' : 'gray.700'}
      borderWidth="1px"
      borderColor={isSelected ? accentColor : 'gray.200'}
      _hover={{ opacity: 0.85, transform: 'scale(1.03)' }}
      transition="all 0.15s"
      userSelect="none"
    >
      <TagLabel>{label}</TagLabel>
    </Tag>
  )
}
