import { useRef } from 'react'
import { VStack, Button, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import { pushSnapshot } from '../../stores/canvasHistoryRef'
import type { TextElement, ShapeElement, ImageElement } from '../../types'

export default function ExtrasPanel() {
  const { t } = useTranslation()
  const design = useDesignStore(s => s.getCurrentDesign())
  const updateDesign = useDesignStore(s => s.updateCurrentDesign)
  const setDirty = useUIStore(s => s.setDirty)
  const setSelected = useUIStore(s => s.setSelectedElements)
  const fileRef = useRef<HTMLInputElement>(null)

  const addElement = (el: TextElement | ShapeElement | ImageElement) => {
    if (!design) return
    pushSnapshot(design.elements)
    updateDesign({ elements: [...design.elements, el] })
    setDirty(true)
    setSelected([el.id])
  }

  const handleAddText = () => {
    const el: TextElement = {
      id: uuid(),
      type: 'text',
      text: 'Text',
      fontSize: 24,
      fontFamily: 'Inter, sans-serif',
      x: 250,
      y: 380,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      color: '#000000',
      opacity: 1,
      zIndex: 100,
      locked: false,
      visible: true,
      groupId: null,
    }
    addElement(el)
  }

  const handleAddShape = (shapeType: 'rect' | 'circle' | 'star' | 'line') => {
    const el: ShapeElement = {
      id: uuid(),
      type: 'shape',
      shapeType,
      width: 80,
      height: 80,
      strokeColor: '#000000',
      strokeWidth: 2,
      x: 260,
      y: 360,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      color: '#E63946',
      opacity: 1,
      zIndex: 100,
      locked: false,
      visible: true,
      groupId: null,
    }
    addElement(el)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const img = new Image()
      img.onload = () => {
        const maxDim = 200
        const scale = Math.min(maxDim / img.width, maxDim / img.height, 1)
        const el: ImageElement = {
          id: uuid(),
          type: 'image',
          dataUrl,
          width: img.width * scale,
          height: img.height * scale,
          x: 250,
          y: 350,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          color: '#000000',
          opacity: 1,
          zIndex: 100,
          locked: false,
          visible: true,
          groupId: null,
        }
        addElement(el)
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <VStack align="stretch" spacing={1}>
      <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="accent.purple" mb={1}>
        {t('canvas.extras', 'Extras')}
      </Text>
      <Button
        size="xs" variant="ghost" leftIcon={<AddIcon />} justifyContent="flex-start"
        onClick={handleAddText}
        draggable
        onDragStart={(e: React.DragEvent) => {
          e.dataTransfer.setData('application/soul-lab-element', JSON.stringify({ type: 'text' }))
          e.dataTransfer.effectAllowed = 'copy'
        }}
      >
        {t('canvas.addText', 'Text')}
      </Button>
      <Menu>
        <MenuButton as={Button} size="xs" variant="ghost" leftIcon={<AddIcon />} textAlign="left">
          {t('canvas.addShape', 'Shape')}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleAddShape('rect')} draggable onDragStart={(e: React.DragEvent) => { e.dataTransfer.setData('application/soul-lab-element', JSON.stringify({ type: 'shape', shapeType: 'rect' })); e.dataTransfer.effectAllowed = 'copy' }}>{t('canvas.shapes.rect', 'Rectangle')}</MenuItem>
          <MenuItem onClick={() => handleAddShape('circle')} draggable onDragStart={(e: React.DragEvent) => { e.dataTransfer.setData('application/soul-lab-element', JSON.stringify({ type: 'shape', shapeType: 'circle' })); e.dataTransfer.effectAllowed = 'copy' }}>{t('canvas.shapes.circle', 'Circle')}</MenuItem>
          <MenuItem onClick={() => handleAddShape('star')} draggable onDragStart={(e: React.DragEvent) => { e.dataTransfer.setData('application/soul-lab-element', JSON.stringify({ type: 'shape', shapeType: 'star' })); e.dataTransfer.effectAllowed = 'copy' }}>{t('canvas.shapes.star', 'Star')}</MenuItem>
          <MenuItem onClick={() => handleAddShape('line')} draggable onDragStart={(e: React.DragEvent) => { e.dataTransfer.setData('application/soul-lab-element', JSON.stringify({ type: 'shape', shapeType: 'line' })); e.dataTransfer.effectAllowed = 'copy' }}>{t('canvas.shapes.line', 'Line')}</MenuItem>
        </MenuList>
      </Menu>
      <Button size="xs" variant="ghost" leftIcon={<AddIcon />} justifyContent="flex-start" onClick={() => fileRef.current?.click()}>
        {t('canvas.addImage', 'Image')}
      </Button>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
    </VStack>
  )
}
