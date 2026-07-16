import { describe, expect, it } from 'vitest';
import { parseDocument, serializeDocument } from './importExport';
import { createBlankDocument } from './templates';

describe('importExport', () => {
  it('round-trips a notation document through JSON', () => {
    const document = createBlankDocument();
    const serialized = serializeDocument(document);

    expect(parseDocument(serialized)).toEqual(document);
  });

  it('rejects unsupported schema versions', () => {
    const document = createBlankDocument();
    const serialized = JSON.stringify({ ...document, schemaVersion: 999 });

    expect(() => parseDocument(serialized)).toThrow('Unsupported notation document schema version.');
  });
});
