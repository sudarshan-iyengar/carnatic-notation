import type { CellBlockType } from '../../types/notation';

type BlockInsertControlsProps = {
  blockId: string;
  onInsertAfter: (blockId: string, type: 'heading' | CellBlockType) => void;
};

export const BlockInsertControls = ({ blockId, onInsertAfter }: BlockInsertControlsProps) => (
  <div className="no-print delete-btn absolute -bottom-5 left-1/2 flex -translate-x-1/2 gap-2 font-sans text-xs">
    <button
      type="button"
      onClick={() => onInsertAfter(blockId, 'heading')}
      className="rounded border border-gray-300 bg-white px-2 py-1 text-gray-500 shadow-sm hover:bg-gray-100"
    >
      + Heading
    </button>
    <button
      type="button"
      onClick={() => onInsertAfter(blockId, 'avartanam')}
      className="rounded border border-gray-300 bg-white px-2 py-1 text-gray-500 shadow-sm hover:bg-gray-100"
    >
      + Avartanam
    </button>
    <button
      type="button"
      onClick={() => onInsertAfter(blockId, 'swara-avartanam')}
      className="rounded border border-gray-300 bg-white px-2 py-1 text-gray-500 shadow-sm hover:bg-gray-100"
    >
      + Swara
    </button>
  </div>
);
