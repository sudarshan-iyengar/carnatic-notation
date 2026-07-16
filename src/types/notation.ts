export const NOTATION_SCHEMA_VERSION = 1;

export type NotationSchemaVersion = typeof NOTATION_SCHEMA_VERSION;

export type OctaveMarker = -1 | 0 | 1;

export type NotationMetadata = {
  title: string;
  ragam: string;
  talam: string;
  composer: string;
  janyam: string;
  arohanam: string;
  avarohanam: string;
};

export type NotationCell = {
  swara: string;
  lyric: string;
  octave: OctaveMarker;
  annotations?: string[];
};

export type HeadingBlock = {
  id: string;
  type: 'heading';
  text: string;
};

export type CellBlockType = 'avartanam' | 'swara-avartanam';

export type CellBlock = {
  id: string;
  type: CellBlockType;
  talaId: string;
  cells: NotationCell[];
};

export type NotationBlock = HeadingBlock | CellBlock;

export type NotationDocument = {
  schemaVersion: NotationSchemaVersion;
  id: string;
  metadata: NotationMetadata;
  talaId: string;
  introVisible: boolean;
  blocks: NotationBlock[];
  createdAt: string;
  updatedAt: string;
};

export const isCellBlock = (block: NotationBlock): block is CellBlock =>
  block.type === 'avartanam' || block.type === 'swara-avartanam';
