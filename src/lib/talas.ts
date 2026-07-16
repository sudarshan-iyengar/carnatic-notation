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
  totalCells: number;
  rows: TalaRow[];
};

export const talaRegistry: Record<string, TalaDefinition> = {
  'adi-2-kalai-current': {
    id: 'adi-2-kalai-current',
    label: 'Adi tala, 2 kalai current layout',
    totalCells: 32,
    rows: [
      {
        id: 'laghu',
        className: 'mb-6',
        segments: [
          { type: 'divider', char: '||', widthClass: 'w-10 print:w-6' },
          { type: 'group', start: 0, count: 4 },
          { type: 'spacer', widthClass: 'w-10 print:w-4' },
          { type: 'group', start: 4, count: 4 },
          { type: 'divider', char: '', widthClass: 'w-14 print:w-6' },
          { type: 'group', start: 8, count: 4 },
          { type: 'spacer', widthClass: 'w-10 print:w-4' },
          { type: 'group', start: 12, count: 4 },
          { type: 'divider', char: '|', widthClass: 'w-10 print:w-6' }
        ]
      },
      {
        id: 'dhrutams',
        className: '',
        segments: [
          { type: 'divider', char: '', widthClass: 'w-10 print:w-6' },
          { type: 'group', start: 16, count: 4 },
          { type: 'spacer', widthClass: 'w-10 print:w-4' },
          { type: 'group', start: 20, count: 4 },
          { type: 'divider', char: '|', widthClass: 'w-14 print:w-6' },
          { type: 'group', start: 24, count: 4 },
          { type: 'spacer', widthClass: 'w-10 print:w-4' },
          { type: 'group', start: 28, count: 4 },
          { type: 'divider', char: '||', widthClass: 'w-10 print:w-6' }
        ]
      }
    ]
  }
};

export const DEFAULT_TALA_ID = 'adi-2-kalai-current';

export const getTala = (talaId: string) => talaRegistry[talaId] ?? talaRegistry[DEFAULT_TALA_ID];

export const getTalaRows = (talaId: string) => getTala(talaId).rows;
