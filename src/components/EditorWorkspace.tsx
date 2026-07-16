import { AvartanamBlock } from './notation/AvartanamBlock';
import { HeadingBlock } from './notation/HeadingBlock';
import { IntroBlock } from './notation/IntroBlock';
import { isCellBlock, type CellBlock, type CellBlockType, type NotationBlock, type NotationDocument, type NotationMetadata } from '../types/notation';

type EditorWorkspaceProps = {
  document: NotationDocument;
  onUpdateMetadata: (metadata: NotationMetadata) => void;
  onUpdateBlock: (blockId: string, block: NotationBlock) => void;
  onRemoveBlock: (blockId: string) => void;
  onInsertAfter: (blockId: string, type: 'heading' | CellBlockType) => void;
};

const hasPrintableCellContent = (block: CellBlock) =>
  block.cells.some((cell) => cell.swara.trim() || cell.lyric.trim() || cell.octave !== 0);

const isNumberedHeading = (block: NotationBlock) => block.type === 'heading' && /^\d+\.$/.test(block.text.trim());

const hasPrintableContentInHeadingSection = (blocks: NotationBlock[], headingIndex: number) => {
  const headingIsNumbered = isNumberedHeading(blocks[headingIndex]);

  for (let index = headingIndex + 1; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (block.type === 'heading' && (headingIsNumbered || !isNumberedHeading(block))) return false;
    if (isCellBlock(block) && hasPrintableCellContent(block)) return true;
  }

  return false;
};

export const EditorWorkspace = ({ document, onUpdateMetadata, onUpdateBlock, onRemoveBlock, onInsertAfter }: EditorWorkspaceProps) => {
  const printHiddenBlockIds = new Set(
    document.blocks.flatMap((block, index) => {
      if (isCellBlock(block)) return hasPrintableCellContent(block) ? [] : [block.id];
      if (block.type === 'heading') return hasPrintableContentInHeadingSection(document.blocks, index) ? [] : [block.id];
      return [];
    })
  );

  return (
    <div className="print-workspace ml-56 w-full p-12 flex justify-center">
      <div className="editor-page w-[900px] print:w-full print:max-w-full transition-all">
        {document.introVisible && <IntroBlock metadata={document.metadata} onUpdate={onUpdateMetadata} />}

        <div className="notation-stack w-full flex flex-col items-center mt-4">
          {document.blocks.map((block) => {
            if (block.type === 'heading') {
              return (
                <HeadingBlock
                  key={block.id}
                  block={block}
                  printHidden={printHiddenBlockIds.has(block.id)}
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
                  printHidden={printHiddenBlockIds.has(block.id)}
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
};
