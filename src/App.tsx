import { useEffect, useState } from 'react';
import { EditorWorkspace } from './components/EditorWorkspace';
import { Sidebar } from './components/Sidebar';
import { createId } from './lib/id';
import { downloadDocumentFile, readDocumentFile } from './lib/localFiles';
import { clearDraft, loadDraft, saveDraft } from './lib/storage';
import { applyTalaToDocument, getTalaOptions } from './lib/talas';
import { createBlankDocument, createCellBlock } from './lib/templates';
import type { CellBlockType, NotationBlock, NotationDocument, NotationMetadata } from './types/notation';

const touchDocument = (document: NotationDocument): NotationDocument => ({
  ...document,
  updatedAt: new Date().toISOString()
});

const App = () => {
  const [document, setDocument] = useState<NotationDocument>(() => loadDraft() ?? createBlankDocument());
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
        blocks: [...current.blocks, { id: createId(), type: 'heading', text: '' }]
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

  const triggerPrint = () => {
    window.print();
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
        onToggleIntro={toggleIntro}
        onChangeTala={changeTala}
        onNewDocument={newDocument}
        onSaveFile={saveJsonFile}
        onOpenFile={openJsonFile}
        onAddHeading={addHeading}
        onAddAvartanam={() => addCellBlock('avartanam')}
        onAddSwaraLine={() => addCellBlock('swara-avartanam')}
        onPrint={triggerPrint}
      />
      <EditorWorkspace
        document={document}
        onUpdateMetadata={updateMetadata}
        onUpdateBlock={updateBlock}
        onRemoveBlock={removeBlock}
      />
    </div>
  );
};

export default App;
