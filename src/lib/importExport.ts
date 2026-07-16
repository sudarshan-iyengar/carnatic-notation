import { NOTATION_SCHEMA_VERSION, type NotationDocument } from '../types/notation';

export const serializeDocument = (document: NotationDocument) => JSON.stringify(document, null, 2);

export const parseDocument = (json: string): NotationDocument => {
  const parsed = JSON.parse(json) as Partial<NotationDocument>;

  if (parsed.schemaVersion !== NOTATION_SCHEMA_VERSION) {
    throw new Error('Unsupported notation document schema version.');
  }

  if (!parsed.id || !parsed.metadata || !parsed.talaId || !Array.isArray(parsed.blocks)) {
    throw new Error('Invalid notation document.');
  }

  return parsed as NotationDocument;
};
