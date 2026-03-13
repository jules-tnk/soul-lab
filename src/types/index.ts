// === Garment Catalog Types (Layer 1 — static) ===

export interface GarmentCategory {
  id: string
  nameKey: string
  garmentTypeIds: string[]
}

export interface GarmentType {
  id: string
  categoryId: string
  nameKey: string
  svgViewBox: string
  parts: GarmentPart[]
}

export interface GarmentPart {
  id: string
  nameKey: string
  required: boolean
  layerOrder: number
  variants: PartVariant[]
  defaultVariantId: string
}

export interface PartVariant {
  id: string
  nameKey: string
  svgPath: string
}

// === Metadata Constants ===

export const FABRICS = [
  'cotton', 'linen', 'silk', 'wool', 'cashmere', 'polyester',
  'denim', 'chiffon', 'satin', 'velvet', 'tweed', 'jersey',
  'organza', 'lace', 'leather', 'suede'
] as const
export type FabricType = typeof FABRICS[number]

export const PATTERNS = [
  'solid', 'stripes', 'plaid', 'checks', 'houndstooth',
  'herringbone', 'polka-dots', 'floral', 'paisley', 'animal-print',
  'camouflage', 'tie-dye', 'ombre', 'color-block', 'geometric'
] as const
export type PatternType = typeof PATTERNS[number]

export const DECORATIONS = [
  'embroidery', 'beading', 'sequins', 'applique', 'lace-trim',
  'fringe', 'piping', 'pleats', 'ruffles', 'buttons-decorative',
  'studs', 'rhinestones', 'patches', 'ribbon', 'tassels'
] as const
export type DecorationType = typeof DECORATIONS[number]

// === Color Swatches ===

export const COLOR_SWATCHES = [
  { id: 'black', hex: '#000000' },
  { id: 'white', hex: '#FFFFFF' },
  { id: 'navy', hex: '#1B2A4A' },
  { id: 'red', hex: '#E63946' },
  { id: 'burgundy', hex: '#800020' },
  { id: 'forest-green', hex: '#2D6A4F' },
  { id: 'camel', hex: '#C19A6B' },
  { id: 'blush-pink', hex: '#F2C4CE' },
  { id: 'royal-blue', hex: '#4169E1' },
  { id: 'charcoal', hex: '#36454F' },
  { id: 'ivory', hex: '#FFFFF0' },
  { id: 'coral', hex: '#FF7F50' },
] as const

// === Canvas Element Types (NEW) ===

export interface BaseCanvasElement {
  id: string
  x: number
  y: number
  scaleX: number
  scaleY: number
  rotation: number
  color: string
  opacity: number
  zIndex: number
  locked: boolean
  visible: boolean
  groupId: string | null
}

export interface GarmentPartElement extends BaseCanvasElement {
  type: 'garment-part'
  partId: string
  variantId: string
  garmentTypeId: string
}

export interface TextElement extends BaseCanvasElement {
  type: 'text'
  text: string
  fontSize: number
  fontFamily: string
}

export interface ShapeElement extends BaseCanvasElement {
  type: 'shape'
  shapeType: 'rect' | 'circle' | 'star' | 'line'
  width: number
  height: number
  strokeColor: string
  strokeWidth: number
}

export interface ImageElement extends BaseCanvasElement {
  type: 'image'
  dataUrl: string
  width: number
  height: number
}

export type CanvasElement = GarmentPartElement | TextElement | ShapeElement | ImageElement

// === Design Type (Layer 2 — v2) ===

export interface Design {
  id: string
  version: 2
  name: string
  garmentTypeId: string
  elements: CanvasElement[]
  thumbnail: string
  canvasWidth: number
  canvasHeight: number
  fabric: FabricType
  pattern: PatternType
  decorations: DecorationType[]
  tags: string[]
  notes: string
  createdAt: string
  updatedAt: string
}

// === Import/Export ===
export interface ExportEnvelope {
  version: 1
  designs: Design[]
}

// === AI Types ===

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
}
