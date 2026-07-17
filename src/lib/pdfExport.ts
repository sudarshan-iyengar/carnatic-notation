import type { NotationDocument } from '../types/notation';

const EXPORT_CLASS = 'pdf-exporting';
const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;
const PAGE_MARGIN_MM = 7;
const BLOCK_GAP_MM = 1.2;
const EXPORT_PAGE_WIDTH_PX = 1240;
const CAPTURE_PADDING_PX = 8;

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

const prepareCloneForExport = (clonedDocument: Document) => {
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
};

const addCanvasPadding = (canvas: HTMLCanvasElement) => {
  const paddedCanvas = window.document.createElement('canvas');
  paddedCanvas.width = canvas.width + CAPTURE_PADDING_PX * 2;
  paddedCanvas.height = canvas.height + CAPTURE_PADDING_PX * 2;

  const context = paddedCanvas.getContext('2d');
  if (!context) throw new Error('Could not prepare PDF section.');

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);
  context.drawImage(canvas, CAPTURE_PADDING_PX, CAPTURE_PADDING_PX);

  return paddedCanvas;
};

const getExportSections = () =>
  Array.from(
    window.document.querySelectorAll<HTMLElement>(
      '.editor-page > .intro-block, .notation-stack > .heading-block:not(.print-hidden-block), .notation-stack > .notation-block:not(.print-hidden-block)'
    )
  ).filter((section) => section.offsetParent !== null);

const getExportGroups = () => {
  const sections = getExportSections();
  const groups: HTMLElement[][] = [];

  for (let index = 0; index < sections.length; index += 1) {
    const section = sections[index];
    const nextSection = sections[index + 1];

    if (section.classList.contains('heading-block') && nextSection?.classList.contains('notation-block')) {
      groups.push([section, nextSection]);
      index += 1;
      continue;
    }

    groups.push([section]);
  }

  return groups;
};

export const exportNotationPdf = async (document: NotationDocument) => {
  const page = window.document.querySelector<HTMLElement>('.editor-page');
  if (!page) throw new Error('Could not find notation page to export.');

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')]);

  await waitForPaint();

  try {
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const contentWidthMm = PAGE_WIDTH_MM - PAGE_MARGIN_MM * 2;
    const contentHeightMm = PAGE_HEIGHT_MM - PAGE_MARGIN_MM * 2;
    const groups = getExportGroups();
    if (groups.length === 0) throw new Error('There is no filled notation to export.');

    let cursorY = PAGE_MARGIN_MM;

    const addCanvasToPdf = (canvas: HTMLCanvasElement) => {
      const sectionHeightMm = (canvas.height * contentWidthMm) / canvas.width;

      if (cursorY > PAGE_MARGIN_MM && cursorY + sectionHeightMm > PAGE_MARGIN_MM + contentHeightMm) {
        pdf.addPage();
        cursorY = PAGE_MARGIN_MM;
      }

      if (sectionHeightMm <= contentHeightMm) {
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', PAGE_MARGIN_MM, cursorY, contentWidthMm, sectionHeightMm);
        cursorY += sectionHeightMm + BLOCK_GAP_MM;
        return;
      }

      const pxPerMm = canvas.width / contentWidthMm;
      const sliceHeightPx = Math.floor(contentHeightMm * pxPerMm);
      let sourceY = 0;

      while (sourceY < canvas.height) {
        const currentSliceHeightPx = Math.min(sliceHeightPx, canvas.height - sourceY);
        const pageCanvas = window.document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = currentSliceHeightPx;

        const context = pageCanvas.getContext('2d');
        if (!context) throw new Error('Could not prepare PDF page.');

        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        context.drawImage(canvas, 0, sourceY, canvas.width, currentSliceHeightPx, 0, 0, canvas.width, currentSliceHeightPx);

        if (cursorY > PAGE_MARGIN_MM || sourceY > 0) {
          pdf.addPage();
          cursorY = PAGE_MARGIN_MM;
        }

        const currentSliceHeightMm = currentSliceHeightPx / pxPerMm;
        pdf.addImage(pageCanvas.toDataURL('image/jpeg', 0.95), 'JPEG', PAGE_MARGIN_MM, cursorY, contentWidthMm, currentSliceHeightMm);
        cursorY += currentSliceHeightMm + BLOCK_GAP_MM;
        sourceY += currentSliceHeightPx;
      }
    };

    for (const group of groups) {
      const canvases = await Promise.all(
        group.map(async (section) => {
          const sectionCanvas = await html2canvas(section, {
            backgroundColor: '#ffffff',
            scale: Math.max(1.5, Math.min(1.8, window.devicePixelRatio || 1.5)),
            useCORS: true,
            logging: false,
            windowWidth: Math.max(page.scrollWidth, EXPORT_PAGE_WIDTH_PX),
            windowHeight: section.scrollHeight,
            onclone: prepareCloneForExport
          });

          return addCanvasPadding(sectionCanvas);
        })
      );

      const groupHeightMm =
        canvases.reduce((height, canvas) => height + (canvas.height * contentWidthMm) / canvas.width, 0) +
        BLOCK_GAP_MM * Math.max(0, canvases.length - 1);

      if (groupHeightMm <= contentHeightMm && cursorY > PAGE_MARGIN_MM && cursorY + groupHeightMm > PAGE_MARGIN_MM + contentHeightMm) {
        pdf.addPage();
        cursorY = PAGE_MARGIN_MM;
      }

      canvases.forEach(addCanvasToPdf);
    }

    pdf.save(getFileName(document));
  } finally {
    await waitForPaint();
  }
};
