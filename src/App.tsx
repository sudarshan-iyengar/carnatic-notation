import { useState } from 'react';
import { EditorWorkspace } from './components/EditorWorkspace';
import { Sidebar } from './components/Sidebar';
import { createId } from './lib/id';
import { createBlankDocument, createCellBlock } from './lib/templates';
import type { CellBlockType, NotationBlock, NotationDocument, NotationMetadata } from './types/notation';

const touchDocument = (document: NotationDocument): NotationDocument => ({
  ...document,
  updatedAt: new Date().toISOString()
});

const App = () => {
  const [document, setDocument] = useState<NotationDocument>(() => createBlankDocument());

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

  return (
    <div className="min-h-screen flex">
      <Sidebar
        introVisible={document.introVisible}
        onToggleIntro={toggleIntro}
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
