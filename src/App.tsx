import { useEffect, useState } from 'react';
import { EditorWorkspace } from './components/EditorWorkspace';
import { Sidebar } from './components/Sidebar';
import { getDemoDocument } from './lib/demoDocuments';
import { downloadDocumentFile, readDocumentFile } from './lib/localFiles';
import { exportNotationPdf } from './lib/pdfExport';
import { clearDraft, loadDraft, saveDraft } from './lib/storage';
import { applyTalaToDocument, getTalaOptions } from './lib/talas';
import { createBlankDocument, createCellBlock, createDocumentFromTemplate, createHeadingBlock, getTemplateOptions } from './lib/templates';
import type { CellBlockType, NotationBlock, NotationDocument, NotationMetadata } from './types/notation';

const touchDocument = (document: NotationDocument): NotationDocument => ({
  ...document,
  updatedAt: new Date().toISOString()
});

const App = () => {
  const [document, setDocument] = useState<NotationDocument>(() => {
    const demoDocument = getDemoDocument(new URLSearchParams(window.location.search).get('demo'));
    return demoDocument ?? loadDraft() ?? createBlankDocument();
  });
  const [statusMessage, setStatusMessage] = useState('Autosaves locally');

  useEffect(() => {
    saveDraft(document);
    setStatusMessage('Autosaved locally');
  }, [document]);

  const updateMetadata = (metadata: NotationMetadata) => {
    setDocument((current) => touchDocument({ ...current, metadata }));
  };

  const toggleIntro = () => {
    setDocument((current) => touchDocument({ ...current, introVisible: !current.introVisible }));
  };

  const addHeading = () => {
    setDocument((current) =>
      touchDocument({
        ...current,
        blocks: [...current.blocks, createHeadingBlock()]
      })
    );
  };

  const addCellBlock = (type: CellBlockType) => {
    setDocument((current) =>
      touchDocument({
        ...current,
        blocks: [...current.blocks, createCellBlock(type, current.talaId)]
      })
    );
  };

  const updateBlock = (blockId: string, nextBlock: NotationBlock) => {
    setDocument((current) =>
      touchDocument({
        ...current,
        blocks: current.blocks.map((block) => (block.id === blockId ? nextBlock : block))
      })
    );
  };

  const removeBlock = (blockId: string) => {
    setDocument((current) =>
      touchDocument({
        ...current,
        blocks: current.blocks.filter((block) => block.id !== blockId)
      })
    );
  };

  const insertBlockAfter = (blockId: string, type: 'heading' | CellBlockType) => {
    setDocument((current) => {
      const insertIndex = current.blocks.findIndex((block) => block.id === blockId);
      const nextBlock = type === 'heading' ? createHeadingBlock() : createCellBlock(type, current.talaId);

      if (insertIndex === -1) {
        return touchDocument({ ...current, blocks: [...current.blocks, nextBlock] });
      }

      return touchDocument({
        ...current,
        blocks: [...current.blocks.slice(0, insertIndex + 1), nextBlock, ...current.blocks.slice(insertIndex + 1)]
      });
    });
  };

  const exportPdf = async () => {
    try {
      setStatusMessage('Preparing PDF...');
      await exportNotationPdf(document);
      setStatusMessage('Downloaded PDF');
    } catch (error) {
      setStatusMessage('Could not export PDF');
      window.alert(error instanceof Error ? error.message : 'Could not export PDF.');
    }
  };

  const changeTala = (talaId: string) => {
    setDocument((current) => touchDocument(applyTalaToDocument(current, talaId)));
    setStatusMessage('Tālam changed');
  };

  const newDocument = () => {
    const hasContent =
      document.metadata.ragam ||
      document.metadata.composer ||
      document.blocks.some((block) => (block.type === 'heading' ? block.text : block.cells.some((cell) => cell.swara || cell.lyric)));

    if (hasContent && !window.confirm('Start a new notation? Your current draft will be replaced, so save a JSON copy first if you need it.')) {
      return;
    }

    clearDraft();
    setDocument(createBlankDocument());
    setStatusMessage('New notation started');
  };

  const startTemplate = (templateId: string) => {
    const hasContent =
      document.metadata.ragam ||
      document.metadata.composer ||
      document.blocks.some((block) => (block.type === 'heading' ? block.text : block.cells.some((cell) => cell.swara || cell.lyric)));

    if (hasContent && !window.confirm('Start this template? Your current draft will be replaced, so save a JSON copy first if you need it.')) {
      return;
    }

    clearDraft();
    setDocument(createDocumentFromTemplate(templateId));
    setStatusMessage('Template started');
  };

  const saveJsonFile = () => {
    downloadDocumentFile(document);
    setStatusMessage('Downloaded JSON copy');
  };

  const openJsonFile = async (file: File) => {
    try {
      const nextDocument = await readDocumentFile(file);
      setDocument(touchDocument(nextDocument));
      setStatusMessage(`Opened ${file.name}`);
    } catch (error) {
      setStatusMessage('Could not open file');
      window.alert(error instanceof Error ? error.message : 'Could not open notation file.');
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar
        introVisible={document.introVisible}
        statusMessage={statusMessage}
        talaId={document.talaId}
        talaOptions={getTalaOptions()}
        templateOptions={getTemplateOptions()}
        onToggleIntro={toggleIntro}
        onChangeTala={changeTala}
        onStartTemplate={startTemplate}
        onNewDocument={newDocument}
        onSaveFile={saveJsonFile}
        onOpenFile={openJsonFile}
        onAddHeading={addHeading}
        onAddAvartanam={() => addCellBlock('avartanam')}
        onAddSwaraLine={() => addCellBlock('swara-avartanam')}
        onPrint={exportPdf}
      />
      <EditorWorkspace
        document={document}
        onUpdateMetadata={updateMetadata}
        onUpdateBlock={updateBlock}
        onRemoveBlock={removeBlock}
        onInsertAfter={insertBlockAfter}
      />
    </div>
  );
};

export default App;
