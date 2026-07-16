import type { KeyboardEvent } from 'react';
import { transliterate } from '../../lib/transliteration';
import type { NotationCell } from '../../types/notation';

type SubBeatProps = {
  data: NotationCell;
  update: (cell: NotationCell) => void;
  blockId: string;
  cellIndex: number;
  totalCells: number;
  widthRem: number;
  hideSahitya: boolean;
};

export const getSwaraFontSize = (swara: string) => {
  const length = swara.trim().length;

  if (length <= 2) return '1.125rem';
  if (length <= 4) return '0.95rem';
  if (length <= 6) return '0.8rem';
  if (length <= 8) return '0.68rem';
  return '0.58rem';
};

export const SubBeat = ({ data, update, blockId, cellIndex, totalCells, widthRem, hideSahitya }: SubBeatProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, type: 'swara' | 'sahityam') => {
    let moveCol: number | null = null;

    if (event.key === 'Tab') {
      event.preventDefault();
      moveCol = event.shiftKey ? cellIndex - 1 : cellIndex + 1;
    } else if (event.key === 'ArrowRight' && event.currentTarget.selectionStart === event.currentTarget.value.length) {
      event.preventDefault();
      moveCol = cellIndex + 1;
    } else if (event.key === 'ArrowLeft' && event.currentTarget.selectionEnd === 0) {
      event.preventDefault();
      moveCol = cellIndex - 1;
    }

    if (moveCol !== null) {
      let nextCol = moveCol;
      if (nextCol >= totalCells) nextCol = 0;
      if (nextCol < 0) nextCol = totalCells - 1;

      const nextElement = document.getElementById(`${type}-${blockId}-${nextCol}`) as HTMLInputElement | null;
      if (nextElement) {
        nextElement.focus();
        nextElement.select();
      }
    } else if (type === 'swara') {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        update({ ...data, octave: data.octave === 1 ? 1 : ((data.octave + 1) as NotationCell['octave']) });
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        update({ ...data, octave: data.octave === -1 ? -1 : ((data.octave - 1) as NotationCell['octave']) });
      }
    }
  };

  return (
    <div className="flex flex-col items-center print:w-8 transition-all" style={{ width: `${widthRem}rem` }}>
      <div className="h-2 w-full flex justify-center items-end">
        {data.octave === 1 && <div className="w-1.5 h-1.5 print:w-1 print:h-1 rounded-full mb-0.5 print-exact" />}
      </div>

      <input
        id={`swara-${blockId}-${cellIndex}`}
        type="text"
        className="grid-input w-full text-center font-semibold uppercase relative z-10 swara-input"
        style={{
          fontSize: getSwaraFontSize(data.swara)
        }}
        value={data.swara}
        onChange={(event) => update({ ...data, swara: event.target.value })}
        onKeyDown={(event) => handleKeyDown(event, 'swara')}
      />

      <div className="h-2 w-full flex justify-center items-start">
        {data.octave === -1 && <div className="w-1.5 h-1.5 print:w-1 print:h-1 rounded-full mt-0.5 print-exact" />}
      </div>

      {!hideSahitya && (
        <div className="relative w-full flex justify-center mt-1">
          {data.lyric === '' && <span className="print-dot absolute text-[15px] pointer-events-none">.</span>}
          <input
            id={`sahityam-${blockId}-${cellIndex}`}
            type="text"
            className="grid-input relative z-10 w-full text-center text-[15px] text-gray-900"
            value={data.lyric}
            onChange={(event) => update({ ...data, lyric: transliterate(event.target.value) })}
            onKeyDown={(event) => handleKeyDown(event, 'sahityam')}
          />
        </div>
      )}
    </div>
  );
};
