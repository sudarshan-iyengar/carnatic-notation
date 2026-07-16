import { useRef } from 'react';
import type { TalaOption } from '../lib/talas';
import type { TemplateOption } from '../lib/templates';

type SidebarProps = {
  introVisible: boolean;
  statusMessage: string;
  talaId: string;
  talaOptions: TalaOption[];
  templateOptions: TemplateOption[];
  onToggleIntro: () => void;
  onChangeTala: (talaId: string) => void;
  onStartTemplate: (templateId: string) => void;
  onNewDocument: () => void;
  onSaveFile: () => void;
  onOpenFile: (file: File) => void;
  onAddHeading: () => void;
  onAddAvartanam: () => void;
  onAddSwaraLine: () => void;
  onPrint: () => void;
};

export const Sidebar = ({
  introVisible,
  statusMessage,
  talaId,
  talaOptions,
  templateOptions,
  onToggleIntro,
  onChangeTala,
  onStartTemplate,
  onNewDocument,
  onSaveFile,
  onOpenFile,
  onAddHeading,
  onAddAvartanam,
  onAddSwaraLine,
  onPrint
}: SidebarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="no-print fixed left-0 top-0 h-full w-56 bg-gray-50 border-r border-gray-200 p-4 flex flex-col space-y-3 shadow-sm z-50">
      <h1 className="text-lg font-bold font-sans text-gray-800 mb-2 border-b pb-2">Notation Editor</h1>
      <p className="text-xs text-gray-500 mb-4 pb-2 border-b leading-relaxed">
        <strong>Arrow Keys:</strong> Navigate grid
        <br />
        <strong>↑ / ↓:</strong> Swara Octave Dots
        <br />
        <strong>1, 2, 3:</strong> Subscripts (Scale)
        <br />
        <strong>^ / _:</strong> Scale Dots (e.g. S^)
      </p>

    <button
      onClick={onToggleIntro}
      className={`px-4 py-2 rounded font-sans text-sm font-semibold transition ${
        introVisible ? 'bg-blue-100 text-blue-700' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
      }`}
      >
        {introVisible ? 'Hide Intro' : 'Show Intro'}
      </button>

      <label className="space-y-1 border-b border-gray-200 pb-3 font-sans">
        <span className="block text-xs font-semibold text-gray-700">Tālam Layout</span>
        <select
          className="w-full rounded border border-gray-300 bg-white px-2 py-2 text-sm text-gray-700 shadow-sm"
          value={talaId}
          onChange={(event) => onChangeTala(event.target.value)}
        >
          {talaOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="block text-xs text-gray-500 leading-relaxed">{talaOptions.find((option) => option.id === talaId)?.description}</span>
      </label>

      <div className="space-y-3 border-b border-gray-200 pb-3 font-sans">
        <p className="text-xs font-semibold text-gray-700">Templates</p>
        {templateOptions
          .filter((option) => option.id === 'adi-varnam' || option.id === 'ata-varnam')
          .map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onStartTemplate(option.id)}
              className="w-full rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition hover:bg-gray-100"
              title={option.description}
            >
              {option.label}
            </button>
          ))}
      </div>

      <div className="space-y-3 border-b border-gray-200 pb-3">
      <button
        onClick={onNewDocument}
        className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded font-sans text-sm shadow-sm transition"
      >
        New Notation
      </button>

      <button
        onClick={onSaveFile}
        className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded font-sans text-sm shadow-sm transition"
      >
        Save JSON
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded font-sans text-sm shadow-sm transition"
      >
        Open JSON
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onOpenFile(file);
          event.target.value = '';
        }}
      />

      <p className="text-xs text-gray-500 font-sans leading-relaxed">{statusMessage}</p>
    </div>

    <hr className="border-gray-300 my-2" />

    <button
      onClick={onAddHeading}
      className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded font-sans text-sm shadow-sm transition"
    >
      + Add Heading
    </button>

    <button
      onClick={onAddAvartanam}
      className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded font-sans text-sm shadow-sm transition"
    >
      + Add Avartanam
    </button>

    <button
      onClick={onAddSwaraLine}
      className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded font-sans text-sm shadow-sm transition"
    >
      + Add Swara Line
    </button>

    <div className="flex-grow" />

    <button
      onClick={onPrint}
      className="px-4 py-3 bg-gray-800 text-white hover:bg-black rounded font-sans font-semibold text-sm shadow-sm transition flex justify-center items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
        />
      </svg>
      Export to PDF
    </button>
  </div>
  );
};
