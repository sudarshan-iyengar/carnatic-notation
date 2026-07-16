import { parseDocument, serializeDocument } from './importExport';
import type { NotationDocument } from '../types/notation';

const sanitizeFilenamePart = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0100-\uFFFF]+/gi, '-')
    .replace(/^-+|-+$/g, '');

export const createDocumentFilename = (document: NotationDocument) => {
  const label =
    sanitizeFilenamePart(document.metadata.title) ||
    sanitizeFilenamePart(document.metadata.ragam) ||
    sanitizeFilenamePart(document.metadata.composer) ||
    'carnatic-notation';

  const date = new Date(document.updatedAt).toISOString().slice(0, 10);
  return `${label}-${date}.json`;
};

export const downloadDocumentFile = (document: NotationDocument) => {
  const blob = new Blob([serializeDocument(document)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = window.document.createElement('a');

  anchor.href = url;
  anchor.download = createDocumentFilename(document);
  anchor.click();
  URL.revokeObjectURL(url);
};

const readFileAsText = (file: File) => {
  if (typeof file.text === 'function') {
    return file.text();
  }

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(reader.error ?? new Error('Could not read file.'));
    reader.readAsText(file);
  });
};

export const readDocumentFile = async (file: File) => parseDocument(await readFileAsText(file));
