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
  createDocument: () => NotationDocument;
};

export const createEmptyCell = (): NotationCell => ({
  swara: '',
  lyric: '',
  octave: 0
});

export const createCellsForTala = (talaId: string) =>
  Array.from({ length: getTala(talaId).totalCells }, createEmptyCell);

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
    blocks: [
      { id: createId(), type: 'heading', text: '' },
      createCellBlock('avartanam', DEFAULT_TALA_ID)
    ],
    createdAt: now,
    updatedAt: now
  };
};

export const templateRegistry: Record<string, CompositionTemplate> = {
  blank: {
    id: 'blank',
    label: 'Blank notation',
    createDocument: createBlankDocument
  },
  varnam: {
    id: 'varnam',
    label: 'Varnam',
    createDocument: createBlankDocument
  },
  krithi: {
    id: 'krithi',
    label: 'Krithi',
    createDocument: createBlankDocument
  },
  'krithi-with-sangatis': {
    id: 'krithi-with-sangatis',
    label: 'Krithi with sangatis',
    createDocument: createBlankDocument
  }
};
