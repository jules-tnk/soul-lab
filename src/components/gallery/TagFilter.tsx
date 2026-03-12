import { HStack, Tag } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'

export default function TagFilter() {
  const designs = useDesignStore(s => s.designs)
  const { tagFilter, setTagFilter } = useUIStore()

  const allTags = useMemo(() => {
    const set = new Set<string>()
    designs.forEach(d => d.tags.forEach(t => set.add(t)))
    return [...set].sort()
  }, [designs])

  const toggle = (tag: string) => {
    setTagFilter(
      tagFilter.includes(tag)
        ? tagFilter.filter(t => t !== tag)
        : [...tagFilter, tag]
    )
  }

  if (allTags.length === 0) return null

  return (
    <HStack wrap="wrap" spacing={2}>
      {allTags.map(tag => (
        <Tag
          key={tag}
          size="sm"
          borderRadius="full"
          cursor="pointer"
          colorScheme={tagFilter.includes(tag) ? 'brand' : 'gray'}
          variant={tagFilter.includes(tag) ? 'solid' : 'subtle'}
          onClick={() => toggle(tag)}
        >
          {tag}
        </Tag>
      ))}
    </HStack>
  )
}
