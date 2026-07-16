import type { NotationDocument } from '../types/notation';

const EXPORT_CLASS = 'pdf-exporting';
const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;
const PAGE_MARGIN_MM = 14;

const getFileName = (document: NotationDocument) => {
  const title = document.metadata.title || document.metadata.ragam || 'carnatic-notation';
  return `${title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '') || 'carnatic-notation'}.pdf`;
};

const waitForPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

export const exportNotationPdf = async (document: NotationDocument) => {
  const page = window.document.querySelector<HTMLElement>('.editor-page');
  if (!page) throw new Error('Could not find notation page to export.');

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')]);

  window.document.body.classList.add(EXPORT_CLASS);
  await waitForPaint();

  try {
    const canvas = await html2canvas(page, {
      backgroundColor: '#ffffff',
      scale: Math.max(2, Math.min(2.5, window.devicePixelRatio || 2)),
      useCORS: true,
      logging: false,
      windowWidth: page.scrollWidth,
      windowHeight: page.scrollHeight,
      onclone: (clonedDocument) => {
        clonedDocument.body.classList.add(EXPORT_CLASS);
        clonedDocument.querySelectorAll<HTMLInputElement>('input').forEach((input) => {
          if (input.classList.contains('swara-edit-input')) {
            input.style.visibility = 'hidden';
            return;
          }

          if (!input.value) {
            input.style.visibility = 'hidden';
            return;
          }

          const replacement = clonedDocument.createElement('span');
          replacement.className = `${input.className} pdf-export-value`;
          replacement.textContent = input.value;
          input.replaceWith(replacement);
        });
      }
    });

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const contentWidthMm = PAGE_WIDTH_MM - PAGE_MARGIN_MM * 2;
    const contentHeightMm = PAGE_HEIGHT_MM - PAGE_MARGIN_MM * 2;
    const pxPerMm = canvas.width / contentWidthMm;
    const pageSliceHeightPx = Math.floor(contentHeightMm * pxPerMm);
    let sourceY = 0;
    let pageIndex = 0;

    while (sourceY < canvas.height) {
      const sliceHeightPx = Math.min(pageSliceHeightPx, canvas.height - sourceY);
      const pageCanvas = window.document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = sliceHeightPx;

      const context = pageCanvas.getContext('2d');
      if (!context) throw new Error('Could not prepare PDF page.');

      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      context.drawImage(canvas, 0, sourceY, canvas.width, sliceHeightPx, 0, 0, canvas.width, sliceHeightPx);

      if (pageIndex > 0) pdf.addPage();

      const sliceHeightMm = sliceHeightPx / pxPerMm;
      pdf.addImage(pageCanvas.toDataURL('image/png'), 'PNG', PAGE_MARGIN_MM, PAGE_MARGIN_MM, contentWidthMm, sliceHeightMm);

      sourceY += sliceHeightPx;
      pageIndex += 1;
    }

    pdf.save(getFileName(document));
  } finally {
    window.document.body.classList.remove(EXPORT_CLASS);
  }
};
