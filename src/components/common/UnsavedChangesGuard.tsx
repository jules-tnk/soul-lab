import { useEffect, useRef } from 'react'
import { useBlocker } from 'react-router-dom'
import { useUIStore } from '../../stores/uiStore'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export default function UnsavedChangesGuard() {
  const { t } = useTranslation()
  const isDirty = useUIStore(s => s.isDirty)
  const setDirty = useUIStore(s => s.setDirty)
  const cancelRef = useRef<HTMLButtonElement>(null!)

  const blocker = useBlocker(isDirty)

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  if (blocker.state !== 'blocked') return null

  return (
    <AlertDialog
      isOpen
      leastDestructiveRef={cancelRef}
      onClose={() => blocker.reset()}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            {t('unsaved.title', 'Unsaved changes')}
          </AlertDialogHeader>
          <AlertDialogBody>
            {t('unsaved.message', 'You have unsaved changes. Discard them?')}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => blocker.reset()}>
              {t('actions.cancel')}
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                setDirty(false)
                blocker.proceed()
              }}
            >
              {t('unsaved.discard', 'Discard')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
