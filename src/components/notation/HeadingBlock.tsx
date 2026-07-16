import type { HeadingBlock as HeadingBlockType, NotationBlock } from '../../types/notation';

type HeadingBlockProps = {
  block: HeadingBlockType;
  onUpdate: (blockId: string, block: NotationBlock) => void;
  onRemove: (blockId: string) => void;
};

export const HeadingBlock = ({ block, onUpdate, onRemove }: HeadingBlockProps) => (
  <div className="block-container relative w-full mb-8 bg-gray-50 rounded py-1 print:bg-transparent">
    <input
      type="text"
      className="grid-input w-full text-center text-xl font-bold tracking-wide bg-transparent"
      value={block.text}
      onChange={(event) => onUpdate(block.id, { ...block, text: event.target.value })}
      placeholder="Section Heading (e.g. Pallavi)"
    />
    <button
      onClick={() => onRemove(block.id)}
      className="delete-btn absolute -right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 font-sans text-xl px-2"
    >
      ✕
    </button>
  </div>
);
