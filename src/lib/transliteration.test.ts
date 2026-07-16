import { describe, expect, it } from 'vitest';
import { transliterate, transliterateScale } from './transliteration';

describe('transliteration', () => {
  it('transliterates lyric and metadata input', () => {
    expect(transliterate('raagam shakti Shakti TDN')).toBe('rāgam śakti ṣakti ṭḍṇ');
  });

  it('transliterates scale shorthand', () => {
    expect(transliterateScale('S1 R2 G3 S^ N_')).toBe('S₁ R₂ G₃ Ṡ Ṇ');
  });
});
