import {
  Box, Text, Button, ButtonGroup, Spinner, Alert, AlertIcon, VStack, Image,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useAIStore } from '../../stores/aiStore'
import { useDesignStore } from '../../stores/designStore'
import { getGarmentType } from '../../catalog'
import { captureCanvasSnapshot } from '../../utils/canvasSnapshot'
import { buildPreviewPrompt } from '../../utils/aiPrompts'
import { generateDesignPreview } from '../../services/openrouter'

export default function DesignPreview() {
  const { t } = useTranslation()
  const apiKey = useAIStore(s => s.apiKey)
  const previewLoading = useAIStore(s => s.previewLoading)
  const previewImage = useAIStore(s => s.previewImage)
  const previewError = useAIStore(s => s.previewError)
  const setPreviewState = useAIStore(s => s.setPreviewState)
  const design = useDesignStore(s => s.getCurrentDesign())

  const handleGenerate = async () => {
    if (!apiKey || !design) return

    const snapshot = captureCanvasSnapshot(1)
    if (!snapshot) {
      setPreviewState({ error: 'Could not capture canvas.' })
      return
    }

    const garmentType = getGarmentType(design.garmentTypeId)
    const garmentTypeName = garmentType?.nameKey
      ? t(garmentType.nameKey)
      : design.garmentTypeId

    const prompt = buildPreviewPrompt(design, garmentTypeName)

    setPreviewState({ loading: true, error: null, image: null })

    try {
      const imageUrl = await generateDesignPreview(apiKey, prompt, snapshot)
      setPreviewState({ loading: false, image: imageUrl })
    } catch (err) {
      setPreviewState({ loading: false, error: err instanceof Error ? err.message : t('ai.preview.error') })
    }
  }

  const handleDownload = () => {
    if (!previewImage || !design) return
    const a = document.createElement('a')
    a.href = previewImage
    a.download = `${design.name}-preview.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  if (!design) {
    return (
      <Text fontSize="xs" color="gray.400" textAlign="center">
        {t('ai.preview.noDesign')}
      </Text>
    )
  }

  return (
    <Box>
      <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="1px" color="gray.500" mb={2}>
        {t('ai.preview.title')}
      </Text>

      {!apiKey && (
        <Text fontSize="xs" color="orange.500">{t('ai.apiKey.missing')}</Text>
      )}

      {previewLoading ? (
        <VStack py={4}>
          <Spinner size="md" color="brand.500" />
          <Text fontSize="xs" color="gray.500">{t('ai.preview.loading')}</Text>
        </VStack>
      ) : (
        <>
          {previewError && (
            <Alert status="error" fontSize="xs" borderRadius="md" mb={2}>
              <AlertIcon />
              {previewError}
            </Alert>
          )}

          {previewImage && (
            <Image
              src={previewImage}
              alt="Design preview"
              maxW="100%"
              borderRadius="md"
              mb={2}
            />
          )}

          {previewImage ? (
            <ButtonGroup size="sm" w="100%">
              <Button flex={1} onClick={handleGenerate} isDisabled={!apiKey}>
                {t('ai.preview.regenerate')}
              </Button>
              <Button flex={1} variant="outline" onClick={handleDownload}>
                {t('ai.preview.download')}
              </Button>
            </ButtonGroup>
          ) : (
            <Button
              size="sm"
              colorScheme="brand"
              w="100%"
              onClick={handleGenerate}
              isDisabled={!apiKey}
            >
              {t('ai.preview.generate')}
            </Button>
          )}
        </>
      )}
    </Box>
  )
}
