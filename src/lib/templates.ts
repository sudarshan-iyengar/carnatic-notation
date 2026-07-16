import { createId } from './id';
import { DEFAULT_TALA_ID, getTala } from './talas';
import {
  NOTATION_SCHEMA_VERSION,
  type CellBlock,
  type CellBlockType,
  type NotationCell,
  type NotationDocument,
  type NotationMetadata
} from '../types/notation';

export type CompositionTemplate = {
  id: string;
  label: string;
  description: string;
  createDocument: () => NotationDocument;
};

export type TemplateOption = Pick<CompositionTemplate, 'id' | 'label' | 'description'>;

export const createEmptyCell = (): NotationCell => ({
  swara: '',
  lyric: '',
  octave: 0
});

export const createCellsForTala = (talaId: string) =>
  Array.from({ length: getTala(talaId).totalCells }, createEmptyCell);

export const createHeadingBlock = (text = '') => ({
  id: createId(),
  type: 'heading' as const,
  text
});

export const createCellBlock = (type: CellBlockType, talaId = DEFAULT_TALA_ID): CellBlock => ({
  id: createId(),
  type,
  talaId,
  cells: createCellsForTala(talaId)
});

export const createEmptyMetadata = (): NotationMetadata => ({
  title: '',
  ragam: '',
  talam: '',
  composer: '',
  janyam: '',
  arohanam: '',
  avarohanam: ''
});

export const createBlankDocument = (): NotationDocument => {
  const now = new Date().toISOString();

  return {
    schemaVersion: NOTATION_SCHEMA_VERSION,
    id: createId(),
    metadata: createEmptyMetadata(),
    talaId: DEFAULT_TALA_ID,
    introVisible: true,
    blocks: [createHeadingBlock(), createCellBlock('avartanam', DEFAULT_TALA_ID)],
    createdAt: now,
    updatedAt: now
  };
};

const createDocument = (talaId: string, blocks: NotationDocument['blocks']): NotationDocument => {
  const now = new Date().toISOString();
  const tala = getTala(talaId);

  return {
    schemaVersion: NOTATION_SCHEMA_VERSION,
    id: createId(),
    metadata: {
      ...createEmptyMetadata(),
      talam: tala.displayName
    },
    talaId,
    introVisible: true,
    blocks,
    createdAt: now,
    updatedAt: now
  };
};

const createVarnamBlocks = (talaId: string): NotationDocument['blocks'] => [
  createHeadingBlock('Pallavi'),
  createCellBlock('avartanam', talaId),
  createCellBlock('avartanam', talaId),
  createHeadingBlock('Anupallavi'),
  createCellBlock('avartanam', talaId),
  createCellBlock('avartanam', talaId),
  createHeadingBlock('Muktāyi Svara'),
  createCellBlock('swara-avartanam', talaId),
  createCellBlock('swara-avartanam', talaId),
  createHeadingBlock('Charanam'),
  createHeadingBlock('1.'),
  createCellBlock('swara-avartanam', talaId),
  createHeadingBlock('2.'),
  createCellBlock('swara-avartanam', talaId),
  createHeadingBlock('3.'),
  createCellBlock('swara-avartanam', talaId),
  createCellBlock('swara-avartanam', talaId),
  createHeadingBlock('4.'),
  createCellBlock('swara-avartanam', talaId),
  createCellBlock('swara-avartanam', talaId),
  createCellBlock('swara-avartanam', talaId),
  createCellBlock('swara-avartanam', talaId)
];

export const createAdiVarnamDocument = () => createDocument(DEFAULT_TALA_ID, createVarnamBlocks(DEFAULT_TALA_ID));

export const createAtaVarnamDocument = () => createDocument('khanda-ata-2-kalai', createVarnamBlocks('khanda-ata-2-kalai'));

export const templateRegistry: Record<string, CompositionTemplate> = {
  blank: {
    id: 'blank',
    label: 'Blank notation',
    description: 'One heading and one notation line',
    createDocument: createBlankDocument
  },
  'adi-varnam': {
    id: 'adi-varnam',
    label: 'Adi tala varnam',
    description: 'Pallavi, anupallavi, muktāyi svara, and charanam swaras',
    createDocument: createAdiVarnamDocument
  },
  'ata-varnam': {
    id: 'ata-varnam',
    label: 'Ata tala varnam',
    description: 'Khanda Ata 2-kalai varnam structure',
    createDocument: createAtaVarnamDocument
  },
  krithi: {
    id: 'krithi',
    label: 'Krithi',
    description: 'Placeholder for a future kriti template',
    createDocument: createBlankDocument
  },
  'krithi-with-sangatis': {
    id: 'krithi-with-sangatis',
    label: 'Krithi with sangatis',
    description: 'Placeholder for a future kriti template with sangatis',
    createDocument: createBlankDocument
  }
};

export const getTemplateOptions = (): TemplateOption[] =>
  Object.values(templateRegistry).map(({ id, label, description }) => ({ id, label, description }));

export const createDocumentFromTemplate = (templateId: string) => (templateRegistry[templateId] ?? templateRegistry.blank).createDocument();
