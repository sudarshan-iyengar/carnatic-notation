import { isCellBlock, type NotationCell, type NotationDocument } from '../types/notation';

export type TalaGroupSegment = {
  type: 'group';
  start: number;
  count: number;
};

export type TalaDividerSegment = {
  type: 'divider';
  char: string;
  widthClass: string;
};

export type TalaSpacerSegment = {
  type: 'spacer';
  widthClass: string;
};

export type TalaSegment = TalaGroupSegment | TalaDividerSegment | TalaSpacerSegment;

export type TalaRow = {
  id: string;
  className: string;
  segments: TalaSegment[];
};

export type TalaDefinition = {
  id: string;
  label: string;
  displayName: string;
  description: string;
  totalCells: number;
  rows: TalaRow[];
};

export type TalaOption = Pick<TalaDefinition, 'id' | 'label' | 'displayName' | 'description' | 'totalCells'>;

const divider = (char: string, widthClass = 'w-10 print:w-6'): TalaDividerSegment => ({
  type: 'divider',
  char,
  widthClass
});

const spacer = (widthClass = 'w-10 print:w-4'): TalaSpacerSegment => ({
  type: 'spacer',
  widthClass
});

const group = (start: number, count: number): TalaGroupSegment => ({
  type: 'group',
  start,
  count
});

export const talaRegistry: Record<string, TalaDefinition> = {
  'adi-2-kalai-current': {
    id: 'adi-2-kalai-current',
    label: 'Adi tala, 2 kalai current layout',
    displayName: 'Ādi tālam',
    description: '8 aksharas, 2 kalai, 32 notation cells',
    totalCells: 32,
    rows: [
      {
        id: 'laghu',
        className: 'mb-6',
        segments: [
          divider('||'),
          group(0, 4),
          spacer(),
          group(4, 4),
          divider('', 'w-14 print:w-6'),
          group(8, 4),
          spacer(),
          group(12, 4),
          divider('|')
        ]
      },
      {
        id: 'dhrutams',
        className: '',
        segments: [
          divider(''),
          group(16, 4),
          spacer(),
          group(20, 4),
          divider('|', 'w-14 print:w-6'),
          group(24, 4),
          spacer(),
          group(28, 4),
          divider('||')
        ]
      }
    ]
  },
  'adi-1-kalai': {
    id: 'adi-1-kalai',
    label: 'Adi tala, 1 kalai',
    displayName: 'Ādi tālam',
    description: '8 aksharas, 1 kalai, 16 notation cells',
    totalCells: 16,
    rows: [
      {
        id: 'adi-1-kalai-row',
        className: '',
        segments: [divider('||'), group(0, 4), spacer(), group(4, 4), divider('|'), group(8, 4), spacer(), group(12, 4), divider('||')]
      }
    ]
  },
  rupaka: {
    id: 'rupaka',
    label: 'Rupaka tala',
    displayName: 'Rūpaka tālam',
    description: '6 aksharas, 12 notation cells',
    totalCells: 12,
    rows: [
      {
        id: 'rupaka-row',
        className: '',
        segments: [divider('||'), group(0, 4), divider('|'), group(4, 4), divider('|'), group(8, 4), divider('||')]
      }
    ]
  },
  'misra-chapu': {
    id: 'misra-chapu',
    label: 'Misra chapu',
    displayName: 'Miśra chāpu',
    description: '7 counts grouped 3 + 2 + 2, 14 notation cells',
    totalCells: 14,
    rows: [
      {
        id: 'misra-chapu-row',
        className: '',
        segments: [divider('||'), group(0, 6), divider('|'), group(6, 4), divider('|'), group(10, 4), divider('||')]
      }
    ]
  },
  'khanda-chapu': {
    id: 'khanda-chapu',
    label: 'Khanda chapu',
    displayName: 'Khaṇḍa chāpu',
    description: '5 counts grouped 2 + 3, 10 notation cells',
    totalCells: 10,
    rows: [
      {
        id: 'khanda-chapu-row',
        className: '',
        segments: [divider('||'), group(0, 4), divider('|'), group(4, 6), divider('||')]
      }
    ]
  }
};

export const DEFAULT_TALA_ID = 'adi-2-kalai-current';

export const getTala = (talaId: string) => talaRegistry[talaId] ?? talaRegistry[DEFAULT_TALA_ID];

export const getTalaRows = (talaId: string) => getTala(talaId).rows;

export const getTalaOptions = (): TalaOption[] =>
  Object.values(talaRegistry).map(({ id, label, displayName, description, totalCells }) => ({
    id,
    label,
    displayName,
    description,
    totalCells
  }));

const createEmptyCell = (): NotationCell => ({
  swara: '',
  lyric: '',
  octave: 0
});

export const resizeCellsForTala = (cells: NotationCell[], talaId: string): NotationCell[] => {
  const totalCells = getTala(talaId).totalCells;
  if (cells.length >= totalCells) return cells;

  return [...cells, ...Array.from({ length: totalCells - cells.length }, createEmptyCell)];
};

export const applyTalaToDocument = (document: NotationDocument, talaId: string): NotationDocument => {
  const tala = getTala(talaId);

  return {
    ...document,
    talaId: tala.id,
    metadata: {
      ...document.metadata,
      talam: tala.displayName
    },
    blocks: document.blocks.map((block) =>
      isCellBlock(block)
        ? {
            ...block,
            talaId: tala.id,
            cells: resizeCellsForTala(block.cells, tala.id)
          }
        : block
    )
  };
};
