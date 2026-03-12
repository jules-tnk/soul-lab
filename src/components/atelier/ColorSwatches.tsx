import {
  Box,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { COLOR_SWATCHES } from '../../types'

interface ColorSwatchesProps {
  value: string
  onChange: (color: string) => void
}

export default function ColorSwatches({ value, onChange }: ColorSwatchesProps) {
  return (
    <HStack spacing={2} flexWrap="wrap" justify="center">
      {COLOR_SWATCHES.map(swatch => (
        <Tooltip key={swatch.id} label={swatch.id} placement="top" hasArrow>
          <Box
            as="button"
            w="24px"
            h="24px"
            borderRadius="full"
            bg={swatch.hex}
            border="2px solid"
            borderColor={value === swatch.hex ? 'gray.700' : 'transparent'}
            boxShadow={value === swatch.hex ? '0 0 0 2px white, 0 0 0 4px' + swatch.hex : 'none'}
            outline={value === swatch.hex ? '2px solid' : 'none'}
            outlineColor={value === swatch.hex ? 'gray.600' : 'transparent'}
            cursor="pointer"
            transition="transform 0.1s"
            _hover={{ transform: 'scale(1.2)' }}
            onClick={() => onChange(swatch.hex)}
            aria-label={swatch.id}
          />
        </Tooltip>
      ))}
      <Popover placement="top" isLazy>
        <PopoverTrigger>
          <IconButton
            aria-label="Custom color"
            icon={<AddIcon />}
            size="xs"
            variant="outline"
            borderRadius="full"
            w="24px"
            h="24px"
            minW="24px"
          />
        </PopoverTrigger>
        <PopoverContent w="auto">
          <PopoverBody p={2}>
            <Box
              as="input"
              type="color"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
              w="48px"
              h="32px"
              cursor="pointer"
              border="none"
              p={0}
              bg="transparent"
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </HStack>
  )
}
