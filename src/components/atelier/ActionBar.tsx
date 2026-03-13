import { useRef } from 'react'
import { HStack, Button, IconButton, Tooltip, useToast } from '@chakra-ui/react'
import { DownloadIcon, AddIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { useDesignStore } from '../../stores/designStore'
import { useUIStore } from '../../stores/uiStore'
import { exportDesigns, parseImportFile } from '../../utils/importExport'
import { getGarmentType } from '../../catalog'
import { createTemplateElements } from '../../utils/templateLayouts'
import { captureCanvasSnapshot } from '../../utils/canvasSnapshot'

export default function ActionBar() {
  const { t } = useTranslation()
  const toast = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const designs = useDesignStore(s => s.designs)
  const createDesign = useDesignStore(s => s.createDesign)
  const importDesigns = useDesignStore(s => s.importDesigns)
  const updateCurrentDesign = useDesignStore(s => s.updateCurrentDesign)
  const currentDesignId = useDesignStore(s => s.currentDesignId)

  const isDirty = useUIStore(s => s.isDirty)
  const setDirty = useUIStore(s => s.setDirty)

  const handleSave = () => {
    const thumbnail = captureCanvasSnapshot(0.5)
    updateCurrentDesign({ thumbnail: thumbnail ?? undefined, updatedAt: new Date().toISOString() })
    setDirty(false)
  }

  const handleExport = () => {
    exportDesigns(designs)
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const imported = await parseImportFile(file)
      importDesigns(imported)
      toast({ title: t('import.success'), status: 'success', duration: 3000, isClosable: true })
    } catch {
      toast({ title: t('errors.importFailed'), status: 'error', duration: 4000, isClosable: true })
    }
    e.target.value = ''
  }

  const handleNew = () => {
    const gt = getGarmentType('shirt')
    if (gt) {
      const elements = createTemplateElements(gt)
      createDesign('shirt', 'New Design', elements)
    }
  }

  return (
    <HStack spacing={2} justify="flex-end" pt={3} borderTop="1px solid" borderColor="gray.200">
      <input ref={fileInputRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleFileChange} />
      <Button size="sm" variant="solid" colorScheme="brand" isDisabled={!isDirty || !currentDesignId} onClick={handleSave}>
        {t('actions.save')}
      </Button>
      <Tooltip label={t('actions.export')}>
        <IconButton aria-label={t('actions.export')} icon={<DownloadIcon />} size="sm" variant="outline" onClick={handleExport} />
      </Tooltip>
      <Button size="sm" variant="outline" onClick={handleImportClick}>
        {t('actions.import')}
      </Button>
      <Tooltip label={t('actions.new')}>
        <IconButton aria-label={t('actions.new')} icon={<AddIcon />} size="sm" variant="ghost" onClick={handleNew} />
      </Tooltip>
    </HStack>
  )
}
