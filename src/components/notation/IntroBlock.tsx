import { transliterate, transliterateScale } from '../../lib/transliteration';
import type { NotationMetadata } from '../../types/notation';

type IntroBlockProps = {
  metadata: NotationMetadata;
  onUpdate: (metadata: NotationMetadata) => void;
};

export const IntroBlock = ({ metadata, onUpdate }: IntroBlockProps) => (
  <div className="flex justify-between items-start mb-12 text-[15px] leading-relaxed w-full border-b border-gray-200 pb-8">
    <div className="space-y-1 w-1/2 pr-4">
      <div className="flex items-center">
        <strong className="w-24 shrink-0">Rāgam:</strong>
        <input
          className="grid-input w-full"
          value={metadata.ragam}
          onChange={(event) => onUpdate({ ...metadata, ragam: transliterate(event.target.value) })}
          placeholder="Ragam"
        />
      </div>
      <div className="flex items-center">
        <strong className="w-24 shrink-0">Ārōhanam:</strong>
        <input
          className="grid-input w-full uppercase tracking-wider"
          value={metadata.arohanam}
          onChange={(event) => onUpdate({ ...metadata, arohanam: transliterateScale(event.target.value) })}
          placeholder="S R G M P D N S"
        />
      </div>
      <div className="flex items-center">
        <strong className="w-24 shrink-0">Tālam:</strong>
        <input
          className="grid-input w-full"
          value={metadata.talam}
          onChange={(event) => onUpdate({ ...metadata, talam: transliterate(event.target.value) })}
          placeholder="Talam"
        />
      </div>
    </div>
    <div className="space-y-1 w-1/2 pl-4">
      <div className="flex items-center">
        <strong className="w-24 shrink-0">Janyam of:</strong>
        <input
          className="grid-input w-full"
          value={metadata.janyam}
          onChange={(event) => onUpdate({ ...metadata, janyam: transliterate(event.target.value) })}
          placeholder="Melakarta"
        />
      </div>
      <div className="flex items-center">
        <strong className="w-28 shrink-0">Avarōhanam:</strong>
        <input
          className="grid-input w-full uppercase tracking-wider"
          value={metadata.avarohanam}
          onChange={(event) => onUpdate({ ...metadata, avarohanam: transliterateScale(event.target.value) })}
          placeholder="S N D P M G R S"
        />
      </div>
      <div className="flex items-center">
        <strong className="w-24 shrink-0">Composer:</strong>
        <input
          className="grid-input w-full"
          value={metadata.composer}
          onChange={(event) => onUpdate({ ...metadata, composer: transliterate(event.target.value) })}
          placeholder="Composer"
        />
      </div>
    </div>
  </div>
);
