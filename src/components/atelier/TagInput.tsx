import { useState, useRef } from 'react'
import {
  Box,
  HStack,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  List,
  ListItem,
} from '@chakra-ui/react'

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  suggestions?: string[]
}

export default function TagInput({ value, onChange, suggestions = [] }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addTag = (raw: string) => {
    const tag = raw.trim().toLowerCase()
    if (!tag || value.includes(tag)) return
    onChange([...value, tag])
    setInputValue('')
    setShowSuggestions(false)
  }

  const removeTag = (tag: string) => {
    onChange(value.filter(t => t !== tag))
  }

  const filteredSuggestions = suggestions.filter(
    s => s.toLowerCase().includes(inputValue.toLowerCase()) && !value.includes(s)
  )

  return (
    <Box position="relative">
      <Wrap spacing={1} mb={value.length ? 2 : 0}>
        {value.map(tag => (
          <WrapItem key={tag}>
            <Tag size="sm" colorScheme="gray" variant="subtle">
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => removeTag(tag)} />
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
      <Input
        ref={inputRef}
        size="sm"
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value)
          setShowSuggestions(e.target.value.length > 0)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            addTag(inputValue)
          } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
            removeTag(value[value.length - 1])
          }
        }}
        onFocus={() => setShowSuggestions(inputValue.length > 0)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        placeholder="Add tag…"
        borderRadius="md"
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <List
          position="absolute"
          zIndex={10}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="sm"
          maxH="120px"
          overflowY="auto"
          w="100%"
          mt={1}
        >
          {filteredSuggestions.slice(0, 8).map(s => (
            <ListItem
              key={s}
              px={3}
              py={1}
              fontSize="sm"
              cursor="pointer"
              _hover={{ bg: 'gray.50' }}
              onMouseDown={() => addTag(s)}
            >
              {s}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}
