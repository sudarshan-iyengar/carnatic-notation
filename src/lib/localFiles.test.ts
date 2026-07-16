import { describe, expect, it, vi } from 'vitest';
import { createDocumentFilename, downloadDocumentFile, readDocumentFile } from './localFiles';
import { serializeDocument } from './importExport';
import { createBlankDocument } from './templates';

describe('localFiles', () => {
  it('creates a stable filename from document metadata', () => {
    const document = {
      ...createBlankDocument(),
      metadata: { ...createBlankDocument().metadata, ragam: 'Mōhanam' },
      updatedAt: '2026-07-16T12:00:00.000Z'
    };

    expect(createDocumentFilename(document)).toBe('mōhanam-2026-07-16.json');
  });

  it('reads a notation document from a local JSON file', async () => {
    const document = createBlankDocument();
    const file = new File([serializeDocument(document)], 'notation.json', { type: 'application/json' });

    await expect(readDocumentFile(file)).resolves.toEqual(document);
  });

  it('downloads the current document as JSON', () => {
    const document = createBlankDocument();
    const click = vi.fn();
    const anchor = { href: '', download: '', click };
    const createElement = vi.spyOn(window.document, 'createElement').mockReturnValue(anchor as unknown as HTMLAnchorElement);
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: vi.fn()
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: vi.fn()
    });
    const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:notation');
    const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);

    downloadDocumentFile(document);

    expect(createElement).toHaveBeenCalledWith('a');
    expect(createObjectURL).toHaveBeenCalled();
    expect(anchor.download).toMatch(/carnatic-notation-\d{4}-\d{2}-\d{2}\.json/);
    expect(click).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:notation');
  });
});
