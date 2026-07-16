import { AvartanamBlock } from './notation/AvartanamBlock';
import { HeadingBlock } from './notation/HeadingBlock';
import { IntroBlock } from './notation/IntroBlock';
import { isCellBlock, type CellBlockType, type NotationBlock, type NotationDocument, type NotationMetadata } from '../types/notation';

type EditorWorkspaceProps = {
  document: NotationDocument;
  onUpdateMetadata: (metadata: NotationMetadata) => void;
  onUpdateBlock: (blockId: string, block: NotationBlock) => void;
  onRemoveBlock: (blockId: string) => void;
  onInsertAfter: (blockId: string, type: 'heading' | CellBlockType) => void;
};

export const EditorWorkspace = ({ document, onUpdateMetadata, onUpdateBlock, onRemoveBlock, onInsertAfter }: EditorWorkspaceProps) => (
  <div className="print-workspace ml-56 w-full p-12 flex justify-center">
    <div className="w-[900px] print:w-full print:max-w-full transition-all">
      {document.introVisible && <IntroBlock metadata={document.metadata} onUpdate={onUpdateMetadata} />}

      <div className="w-full flex flex-col items-center mt-4">
        {document.blocks.map((block) => {
          if (block.type === 'heading') {
            return (
              <HeadingBlock
                key={block.id}
                block={block}
                onUpdate={onUpdateBlock}
                onRemove={onRemoveBlock}
                onInsertAfter={onInsertAfter}
              />
            );
          }

          if (isCellBlock(block)) {
            return (
              <AvartanamBlock
                key={block.id}
                block={block}
                onUpdate={onUpdateBlock}
                onRemove={onRemoveBlock}
                onInsertAfter={onInsertAfter}
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  </div>
);
