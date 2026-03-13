const MAX_SNAPSHOT_BYTES = 4 * 1024 * 1024

export function captureCanvasSnapshot(pixelRatio = 1): string | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stage = (window as any).__soulLabStage
  if (!stage) return null
  try {
    let dataUrl: string = stage.toDataURL({ pixelRatio })
    if (dataUrl.length > MAX_SNAPSHOT_BYTES) {
      dataUrl = stage.toDataURL({ pixelRatio: 0.5 })
    }
    return dataUrl
  } catch {
    return null
  }
}
