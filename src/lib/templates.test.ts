import { describe, expect, it } from 'vitest';
import { DEFAULT_TALA_ID } from './talas';
import { createBlankDocument } from './templates';
import { isCellBlock } from '../types/notation';

describe('templates', () => {
  it('creates a blank document matching the original app shape', () => {
    const document = createBlankDocument();
    const cellBlock = document.blocks.find(isCellBlock);

    expect(document.schemaVersion).toBe(1);
    expect(document.talaId).toBe(DEFAULT_TALA_ID);
    expect(document.introVisible).toBe(true);
    expect(document.blocks[0]).toMatchObject({ type: 'heading', text: '' });
    expect(cellBlock?.cells).toHaveLength(32);
  });
});
