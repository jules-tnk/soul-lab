import { Box, HStack, Text, Divider } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

interface MenuItem {
  label: string
  shortcut?: string
  onClick: () => void
  disabled?: boolean
  danger?: boolean
}

interface Props {
  x: number
  y: number
  items: MenuItem[]
  onClose: () => void
}

export default function ContextMenu({ x, y, items, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('mousedown', handleClick)
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('mousedown', handleClick)
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <Box
      ref={ref}
      position="fixed"
      left={`${x}px`}
      top={`${y}px`}
      bg="white"
      borderRadius="md"
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.100"
      py={1}
      minW="200px"
      zIndex={1000}
    >
      {items.map((item, i) =>
        item.label === '---' ? (
          <Divider key={i} my={1} />
        ) : (
          <HStack
            key={i}
            px={3}
            py={1.5}
            cursor={item.disabled ? 'default' : 'pointer'}
            opacity={item.disabled ? 0.4 : 1}
            color={item.danger ? 'red.500' : undefined}
            _hover={item.disabled ? {} : { bg: 'gray.50' }}
            onClick={() => {
              if (!item.disabled) {
                item.onClick()
                onClose()
              }
            }}
          >
            <Text fontSize="sm" flex={1}>{item.label}</Text>
            {item.shortcut && (
              <Text fontSize="xs" color="gray.400">{item.shortcut}</Text>
            )}
          </HStack>
        )
      )}
    </Box>
  )
}
