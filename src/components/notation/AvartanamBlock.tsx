import { Fragment } from 'react';
import { BlockInsertControls } from './BlockInsertControls';
import { DividerSlot } from './DividerSlot';
import { SubBeat } from './SubBeat';
import { DEFAULT_TALA_SPACING, getTala, getTalaRows, type TalaSegment } from '../../lib/talas';
import type { CellBlock, CellBlockType, NotationBlock, NotationCell } from '../../types/notation';

type AvartanamBlockProps = {
  block: CellBlock;
  onUpdate: (blockId: string, block: NotationBlock) => void;
  onRemove: (blockId: string) => void;
  onInsertAfter: (blockId: string, type: 'heading' | CellBlockType) => void;
};

export const AvartanamBlock = ({ block, onUpdate, onRemove, onInsertAfter }: AvartanamBlockProps) => {
  const isSwaraOnly = block.type === 'swara-avartanam';
  const tala = getTala(block.talaId);
  const spacing = tala.spacing ?? DEFAULT_TALA_SPACING;
  const rows = getTalaRows(block.talaId);

  const updateCell = (cellIndex: number, newData: NotationCell) => {
    const cells = [...block.cells];
    cells[cellIndex] = newData;
    onUpdate(block.id, { ...block, cells });
  };

  const renderBeatGroup = (start: number, count: number) => (
    <div
      className="flex flex-row shrink-0 justify-between"
      style={{
        width: `${count * spacing.cellWidthRem}rem`,
        marginRight: `${spacing.groupGapRem}rem`
      }}
    >
      {Array.from({ length: count }, (_, offset) => {
        const cellIndex = start + offset;
        return (
          <SubBeat
            key={cellIndex}
            data={block.cells[cellIndex] ?? { swara: '', lyric: '', octave: 0 }}
            blockId={block.id}
            cellIndex={cellIndex}
            totalCells={tala.totalCells}
            widthRem={spacing.cellWidthRem}
            update={(cell) => updateCell(cellIndex, cell)}
            hideSahitya={isSwaraOnly}
          />
        );
      })}
    </div>
  );

  const renderSegment = (segment: TalaSegment, segmentIndex: number) => {
    if (segment.type === 'group') {
      return <Fragment key={segmentIndex}>{renderBeatGroup(segment.start, segment.count)}</Fragment>;
    }

    if (segment.type === 'spacer') {
      return <div key={segmentIndex} className={`${segment.widthClass} shrink-0 transition-all`} />;
    }

    return <DividerSlot key={segmentIndex} char={segment.char} widthClass={segment.widthClass} isSwaraOnly={isSwaraOnly} />;
  };

  return (
    <div className="block-container relative w-full mb-10 pb-4 border-b border-gray-100 print:border-none print:mb-6">
      <button
        onClick={() => onRemove(block.id)}
        className="delete-btn absolute -right-8 top-0 text-gray-400 hover:text-red-500 font-sans text-xl px-2 z-20"
      >
        ✕
      </button>

      {rows.map((row) => (
        <div key={row.id} className={`flex flex-row items-center w-full ${row.className}`}>
          {row.segments.map(renderSegment)}
        </div>
      ))}
      <BlockInsertControls blockId={block.id} onInsertAfter={onInsertAfter} />
    </div>
  );
};
