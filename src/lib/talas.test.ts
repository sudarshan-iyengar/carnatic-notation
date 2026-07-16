import { describe, expect, it } from 'vitest';
import { applyTalaToDocument, DEFAULT_TALA_ID, getTala, getTalaOptions, getTalaRows, resizeCellsForTala, talaRegistry } from './talas';
import { createBlankDocument, createCellBlock } from './templates';
import { isCellBlock } from '../types/notation';

describe('talas', () => {
  it('exposes the current 32-cell layout as data', () => {
    const tala = getTala(DEFAULT_TALA_ID);

    expect(tala.totalCells).toBe(32);
    expect(getTalaRows(DEFAULT_TALA_ID)).toHaveLength(2);
  });

  it('keeps group segments within the cell count', () => {
    for (const tala of Object.values(talaRegistry)) {
      const groups = tala.rows.flatMap((row) => row.segments.filter((segment) => segment.type === 'group'));

      for (const segment of groups) {
        if (segment.type === 'group') {
          expect(segment.start + segment.count).toBeLessThanOrEqual(tala.totalCells);
        }
      }
    }
  });

  it('exposes selector options for the supported fixed talas', () => {
    expect(getTalaOptions().map((option) => option.id)).toEqual([
      'adi-2-kalai-current',
      'adi-1-kalai',
      'rupaka',
      'misra-chapu',
      'khanda-chapu'
    ]);
  });

  it('resizes up by appending blank cells while preserving existing data', () => {
    const cells = createCellBlock('avartanam', 'khanda-chapu').cells;
    cells[0] = { swara: 'S', lyric: 'sa', octave: 1 };

    const resized = resizeCellsForTala(cells, DEFAULT_TALA_ID);

    expect(resized).toHaveLength(32);
    expect(resized[0]).toEqual({ swara: 'S', lyric: 'sa', octave: 1 });
    expect(resized[31]).toEqual({ swara: '', lyric: '', octave: 0 });
  });

  it('does not delete overflow cells when resizing down', () => {
    const cells = createCellBlock('avartanam', DEFAULT_TALA_ID).cells;
    cells[20] = { swara: 'P', lyric: 'pa', octave: -1 };

    const resized = resizeCellsForTala(cells, 'khanda-chapu');

    expect(resized).toHaveLength(32);
    expect(resized[20]).toEqual({ swara: 'P', lyric: 'pa', octave: -1 });
  });

  it('restores hidden overflow when switching back to a larger tala', () => {
    const cells = createCellBlock('avartanam', DEFAULT_TALA_ID).cells;
    cells[20] = { swara: 'P', lyric: 'pa', octave: -1 };

    const small = resizeCellsForTala(cells, 'khanda-chapu');
    const large = resizeCellsForTala(small, DEFAULT_TALA_ID);

    expect(large[20]).toEqual({ swara: 'P', lyric: 'pa', octave: -1 });
  });

  it('applies tala changes to document and notation blocks', () => {
    const document = createBlankDocument();
    const applied = applyTalaToDocument(document, 'rupaka');
    const cellBlock = applied.blocks.find(isCellBlock);

    expect(applied.talaId).toBe('rupaka');
    expect(applied.metadata.talam).toBe('Rūpaka tālam');
    expect(cellBlock?.talaId).toBe('rupaka');
    expect(cellBlock?.cells).toHaveLength(32);
  });
});
