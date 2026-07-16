import { describe, expect, it } from 'vitest';
import { DEFAULT_TALA_ID } from './talas';
import { createAdiVarnamDocument, createAtaVarnamDocument, createBlankDocument, getTemplateOptions } from './templates';
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

  it('creates an adi tala varnam template with the requested structure', () => {
    const document = createAdiVarnamDocument();

    expect(document.talaId).toBe(DEFAULT_TALA_ID);
    expect(document.metadata.talam).toBe('Ādi tālam');
    expect(document.blocks.map((block) => (block.type === 'heading' ? block.text : block.type))).toEqual([
      'Pallavi',
      'avartanam',
      'avartanam',
      'Anupallavi',
      'avartanam',
      'avartanam',
      'Muktāyi Svara',
      'swara-avartanam',
      'swara-avartanam',
      'Charanam',
      '1.',
      'swara-avartanam',
      '2.',
      'swara-avartanam',
      '3.',
      'swara-avartanam',
      'swara-avartanam',
      '4.',
      'swara-avartanam',
      'swara-avartanam',
      'swara-avartanam',
      'swara-avartanam'
    ]);
  });

  it('creates an ata tala varnam template using khanda ata 2 kalai cells', () => {
    const document = createAtaVarnamDocument();
    const cellBlocks = document.blocks.filter(isCellBlock);

    expect(document.talaId).toBe('khanda-ata-2-kalai');
    expect(document.metadata.talam).toBe('Khaṇḍa Aṭa tālam');
    expect(cellBlocks).toHaveLength(14);
    expect(cellBlocks.every((block) => block.talaId === 'khanda-ata-2-kalai')).toBe(true);
    expect(cellBlocks.every((block) => block.cells.length === 56)).toBe(true);
  });

  it('exposes varnam templates in the template options', () => {
    expect(getTemplateOptions().map((option) => option.id)).toEqual(['blank', 'adi-varnam', 'ata-varnam', 'krithi', 'krithi-with-sangatis']);
  });
});
