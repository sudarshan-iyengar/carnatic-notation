import { describe, expect, it } from 'vitest';
import { getPrintSwaraFontSize, getSwaraFontSize } from './SubBeat';

describe('SubBeat', () => {
  it('shrinks swara phrase text as more swaras are entered in one cell', () => {
    expect(getSwaraFontSize('S')).toBe('1.125rem');
    expect(getSwaraFontSize('SRGM')).toBe('0.82rem');
    expect(getSwaraFontSize('SRGMPD')).toBe('0.7rem');
    expect(getSwaraFontSize('SRGMPDNS')).toBe('0.6rem');
    expect(getSwaraFontSize('SRGMPDNSRG')).toBe('0.52rem');
  });

  it('uses stricter sizing in compact tala cells so four swaras stay visible', () => {
    expect(getSwaraFontSize('SRGM', 2)).toBe('0.72rem');
    expect(getSwaraFontSize('SRGMPD', 2)).toBe('0.62rem');
    expect(getSwaraFontSize('SRGMPDNS', 2)).toBe('0.54rem');
    expect(getSwaraFontSize('SRGMPDNSRG', 2)).toBe('0.48rem');
  });

  it('uses print-specific sizing for compact exported notation', () => {
    expect(getPrintSwaraFontSize('S')).toBe('10.5pt');
    expect(getPrintSwaraFontSize('SRGM')).toBe('8.8pt');
    expect(getPrintSwaraFontSize('SRGMPD')).toBe('7.4pt');
    expect(getPrintSwaraFontSize('SRGMPDNS')).toBe('6.6pt');
    expect(getPrintSwaraFontSize('SRGMPDNSRG')).toBe('5.8pt');
  });
});
