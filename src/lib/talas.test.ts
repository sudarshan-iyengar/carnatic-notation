import { describe, expect, it } from 'vitest';
import { DEFAULT_TALA_ID, getTala, getTalaRows } from './talas';

describe('talas', () => {
  it('exposes the current 32-cell layout as data', () => {
    const tala = getTala(DEFAULT_TALA_ID);

    expect(tala.totalCells).toBe(32);
    expect(getTalaRows(DEFAULT_TALA_ID)).toHaveLength(2);
  });

  it('keeps group segments within the cell count', () => {
    const tala = getTala(DEFAULT_TALA_ID);
    const groups = tala.rows.flatMap((row) => row.segments.filter((segment) => segment.type === 'group'));

    expect(groups).toHaveLength(8);
    expect(groups[groups.length - 1]).toMatchObject({ start: 28, count: 4 });
    for (const segment of groups) {
      if (segment.type === 'group') {
        expect(segment.start + segment.count).toBeLessThanOrEqual(tala.totalCells);
      }
    }
  });
});
