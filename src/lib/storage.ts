import { parseDocument, serializeDocument } from './importExport';
import type { NotationDocument } from '../types/notation';

const DRAFT_STORAGE_KEY = 'carnatic-notation:draft';

export const saveDraft = (document: NotationDocument) => {
  window.localStorage.setItem(DRAFT_STORAGE_KEY, serializeDocument(document));
};

export const loadDraft = (): NotationDocument | null => {
  const draft = window.localStorage.getItem(DRAFT_STORAGE_KEY);
  if (!draft) return null;

  try {
    return parseDocument(draft);
  } catch {
    return null;
  }
};

export const clearDraft = () => {
  window.localStorage.removeItem(DRAFT_STORAGE_KEY);
};
