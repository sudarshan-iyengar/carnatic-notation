import { describe, expect, it } from 'vitest';
import { getSwaraFontSize } from './SubBeat';

describe('SubBeat', () => {
  it('shrinks swara phrase text as more swaras are entered in one cell', () => {
    expect(getSwaraFontSize('S')).toBe('1.125rem');
    expect(getSwaraFontSize('SRGM')).toBe('0.95rem');
    expect(getSwaraFontSize('SRGMPD')).toBe('0.8rem');
    expect(getSwaraFontSize('SRGMPDNS')).toBe('0.68rem');
    expect(getSwaraFontSize('SRGMPDNSRG')).toBe('0.58rem');
  });
});
