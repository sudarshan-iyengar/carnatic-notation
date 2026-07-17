import type { CellBlockType, NotationCell, NotationDocument } from '../types/notation';

const TALA_ID = 'adi-2-kalai-current';

const emptyCell = (): NotationCell => ({ swara: '', lyric: '', octave: 0 });

const cells = (entries: Array<[number, string, string?, NotationCell['octave']?]>) => {
  const nextCells = Array.from({ length: 32 }, emptyCell);

  entries.forEach(([index, swara, lyric = '', octave = 0]) => {
    nextCells[index] = { swara, lyric, octave };
  });

  return nextCells;
};

const heading = (id: string, text: string) => ({ id, type: 'heading' as const, text });

const notationBlock = (id: string, type: CellBlockType, entries: Array<[number, string, string?, NotationCell['octave']?]>) => ({
  id,
  type,
  talaId: TALA_ID,
  cells: cells(entries)
});

const pallaviOne: Array<[number, string, string?, NotationCell['octave']?]> = [
  [0, 'P', 'vE'],
  [1, ',', '.'],
  [2, ',', '.'],
  [3, 'D', 'da'],
  [4, 'P', '.'],
  [5, 'M', '.'],
  [6, 'R', 'ppo'],
  [7, 'G', '.'],
  [8, 'R', '.'],
  [9, 'S', 'ru'],
  [10, ',', '.'],
  [11, 'S', 'LE'],
  [12, 'D', '.'],
  [13, 'N', '.'],
  [14, 'D', '.'],
  [15, 'D', '.'],
  [16, 'S', 'vE'],
  [17, ',', '.'],
  [18, ',', '.'],
  [19, 'R', 'Ru^'],
  [20, 'G', '.'],
  [21, 'R', '.'],
  [22, 'M', 'tu'],
  [23, ',', '.'],
  [24, 'R', 'Nai'],
  [25, 'G', '.'],
  [26, 'R', '.'],
  [27, 'S', 'yA'],
  [28, 'R', '.'],
  [29, 'G', '.'],
  [30, 'R', '.'],
  [31, 'M', 'r']
];

const pallaviTwo: Array<[number, string, string?, NotationCell['octave']?]> = [
  [0, 'P', 'pA'],
  [1, 'D', '.'],
  [2, 'P', '.'],
  [3, 'M', 'dam'],
  [4, 'P', '.'],
  [5, 'M', '.'],
  [6, 'R', 'pa'],
  [7, 'G', '.'],
  [8, 'R', '.'],
  [9, 'S', 'Ni'],
  [10, 'R', 'n'],
  [11, 'G', '.'],
  [12, 'R', 'dhi'],
  [13, 'R', '.'],
  [14, 'M', 'Du'],
  [15, ',', 'm'],
  [16, 'P', 'Bha'],
  [17, 'D', 'k'],
  [18, 'N', '.'],
  [19, 'D', 'ta'],
  [20, 'N', '.'],
  [21, 'D', '.'],
  [22, 'P', 'rai'],
  [23, ',', '.'],
  [24, 'M', 'kkA'],
  [25, 'P', '.'],
  [26, 'M', '.'],
  [27, 'R', 'thu^'],
  [28, 'G', '.'],
  [29, 'R', '.'],
  [30, 'S', '.'],
  [31, 'R', '.']
];

const swaraOne: Array<[number, string, string?, NotationCell['octave']?]> = [
  [0, 'M'],
  [1, ','],
  [2, 'P'],
  [3, 'D'],
  [4, 'P'],
  [5, 'D'],
  [6, 'M'],
  [7, 'P'],
  [8, 'M'],
  [9, 'R'],
  [10, 'G'],
  [11, 'G'],
  [12, 'R'],
  [13, 'R'],
  [14, 'S'],
  [15, 'S'],
  [16, 'P'],
  [17, ','],
  [18, 'D'],
  [19, 'P'],
  [20, 'D'],
  [21, 'N'],
  [22, 'D'],
  [23, 'D'],
  [24, 'S,'],
  [25, ','],
  [26, 'R'],
  [27, 'G'],
  [28, 'R'],
  [29, 'R'],
  [30, 'M'],
  [31, ',']
];

const swaraTwo: Array<[number, string, string?, NotationCell['octave']?]> = [
  [0, 'SSRS'],
  [1, 'RSND'],
  [2, 'PDMP'],
  [3, 'M'],
  [4, 'P'],
  [5, 'D'],
  [6, 'N'],
  [7, 'S'],
  [8, 'SNDP'],
  [9, 'DPMG'],
  [10, 'MGRS'],
  [11, ','],
  [12, 'R'],
  [13, 'G'],
  [14, 'M'],
  [15, 'P'],
  [16, 'D'],
  [17, 'N'],
  [18, 'S'],
  [19, 'R'],
  [20, 'G'],
  [21, 'M'],
  [22, 'P'],
  [23, 'D'],
  [24, 'N'],
  [25, 'D'],
  [26, 'P'],
  [27, 'M'],
  [28, 'G'],
  [29, 'R'],
  [30, 'S'],
  [31, ',']
];

export const createAdiVarnamDemoDocument = (): NotationDocument => {
  const now = new Date().toISOString();

  return {
    schemaVersion: 1,
    id: 'adi-varnam-export-demo',
    metadata: {
      title: 'Adi Varnam Export Demo',
      ragam: 'Kokilavarali',
      talam: 'Adi',
      composer: 'Demo',
      janyam: '20 Natabhairavi',
      arohanam: 'S R G M P D N S',
      avarohanam: 'S N D P M G R S'
    },
    talaId: TALA_ID,
    introVisible: true,
    createdAt: now,
    updatedAt: now,
    blocks: [
      heading('demo-pallavi', 'Pallavi'),
      notationBlock('demo-pallavi-1', 'avartanam', pallaviOne),
      notationBlock('demo-pallavi-2', 'avartanam', pallaviTwo),
      heading('demo-anupallavi', 'Anupallavi'),
      notationBlock('demo-anupallavi-1', 'avartanam', pallaviOne),
      notationBlock('demo-anupallavi-2', 'avartanam', pallaviTwo),
      heading('demo-muktai', 'Muktai Swaram'),
      notationBlock('demo-muktai-1', 'swara-avartanam', swaraOne),
      notationBlock('demo-muktai-2', 'swara-avartanam', swaraTwo),
      heading('demo-charanam', 'Charanam'),
      notationBlock('demo-charanam-1', 'avartanam', pallaviOne),
      heading('demo-ettugada-1', '1.'),
      notationBlock('demo-ettugada-1-swara', 'swara-avartanam', swaraOne),
      heading('demo-ettugada-2', '2.'),
      notationBlock('demo-ettugada-2-swara', 'swara-avartanam', swaraTwo)
    ]
  };
};

export const getDemoDocument = (demoId: string | null) => {
  if (demoId === 'adi-varnam') return createAdiVarnamDemoDocument();
  return null;
};
