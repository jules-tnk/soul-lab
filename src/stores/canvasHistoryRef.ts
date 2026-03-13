import type { CanvasElement } from '../types'

let snapshotFn: ((elements: CanvasElement[]) => void) | null = null

export function setSnapshotFn(fn: (elements: CanvasElement[]) => void) {
  snapshotFn = fn
}

export function clearSnapshotFn() {
  snapshotFn = null
}

export function pushSnapshot(elements: CanvasElement[]) {
  snapshotFn?.(elements)
}
