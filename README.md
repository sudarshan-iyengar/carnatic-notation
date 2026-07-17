# Carnatic Notation Editor

A browser-based editor for writing Carnatic music notation.

Live site: https://sudarshan-iyengar.github.io/carnatic-notation/

The editor is designed for quickly laying out swaras, sahityam, octave dots, talam divisions, varnam templates, and printable notation sheets. Everything runs locally in the browser; there is no account, backend, or cloud storage.

## What You Can Do

- Write Carnatic swara notation in grid form.
- Add sahityam under swaras.
- Mark upper and lower octave dots.
- Choose common talam layouts.
- Start from Adi tala or Ata tala varnam templates.
- Save your work as a local JSON file.
- Reopen saved JSON notation files later.
- Export a styled PDF from the editor.

## Basic Use

Open the live site and start typing into the notation grid.

The page starts with:

- an intro section for ragam, arohanam, avarohanam, talam, composer, and janyam
- a heading
- one notation avartanam

Use the sidebar to add more material:

- `+ Add Heading`
- `+ Add Swara + Sahitya`
- `+ Add Swara`

You can also hover over existing blocks and use the inline insert controls to add headings, swara+sahitya avartanams, or swara-only lines exactly where you need them.

## Keyboard Controls

In swara and sahityam cells:

- `Tab`: move to the next cell
- `Shift + Tab`: move to the previous cell
- `Right Arrow`: move to the next cell when the cursor is at the end
- `Left Arrow`: move to the previous cell when the cursor is at the beginning

In swara cells:

- `Up Arrow`: add/move to upper octave dot
- `Down Arrow`: add/move to lower octave dot

## Swaras and Speed Phrases

Each swara cell can hold more than one swara.

For example, if four swaras should be sung in the time of one notation position, enter them together:

```text
SRGM
```

The editor automatically reduces the font size for longer swara phrases so they remain inside the cell.

## Sahityam

Sahityam is entered under the swara row.

If a sahityam cell is empty, the editor shows a dot placeholder for readability.

## Transliteration Shortcuts

For lyrics and intro fields:

- `aa` or `A` -> `ā`
- `ii` or `I` -> `ī`
- `uu` or `U` -> `ū`
- `ee` or `E` -> `ē`
- `oo` or `O` -> `ō`
- `T` -> `ṭ`
- `D` -> `ḍ`
- `N` -> `ṇ`
- `L` -> `ḷ`
- `sh` -> `ś`
- `Sh` -> `ṣ`

For arohanam and avarohanam:

- `1`, `2`, `3` become swara-sthana subscripts
- `^` adds an upper dot
- `_` adds a lower dot

## Talam Layouts

Use the `Tālam Layout` selector in the sidebar.

Currently supported:

- Adi tala, 2 kalai
- Adi tala, 1 kalai
- Rupaka tala
- Misra chapu
- Khanda chapu
- Khanda Ata tala, 2 kalai

Changing the talam updates the document layout and the intro talam field. Existing notation is preserved as much as possible. If you switch to a smaller talam, overflow cells are hidden rather than deleted; switching back to a larger layout restores them.

## Templates

The sidebar includes varnam templates:

- `Adi tala varnam`
- `Ata tala varnam`

The varnam structure is:

- Pallavi: 2 avartanams
- Anupallavi: 2 avartanams
- Muktāyi Svara: 2 swara avartanams
- Charanam:
  - `1.`: 1 swara avartanam
  - `2.`: 1 swara avartanam
  - `3.`: 2 swara avartanams
  - `4.`: 4 swara avartanams

Templates are only starting points. You can add or remove headings, avartanams, and swara lines after creating the template.

## Saving and Opening Files

The editor autosaves your current draft in the browser.

For long-term storage:

1. Click `Save JSON`.
2. Store the downloaded `.json` file on your computer.
3. Later, click `Open JSON` to continue editing it.

The JSON file is the editable project format.

## Exporting to PDF

Click `Export to PDF`.

The editor generates a styled A4 PDF and downloads it locally.

The PDF export hides editor controls, preserves the notation layout, uses the available page width, and keeps the intro metadata, headings, swaras, sahityam, tala dividers, and octave dots aligned for reading.

## Releases

- `v2.1.0`: Refines the post-2.0 PDF export and documentation, including tighter notation spacing, full-width export rows, improved heading alignment, better intro metadata alignment, and clearer sidebar labels.
- `v2.0.0`: Major release with styled PDF export, varnam templates, talam selection, local JSON save/open, and the modular React/TypeScript architecture.

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Build for production:

```bash
npm run build
```

## License

This project is licensed under the MIT License.

MIT is a good fit for this project because it is simple and permissive: people can use, copy, modify, distribute, and build on the editor, including in their own projects, as long as they preserve the copyright and license notice. It also includes a warranty and liability disclaimer.

If you want the editor to stay maximally easy for musicians, teachers, students, and developers to reuse, MIT is the right default. If you later decide that all modified versions must remain open source, then a copyleft license such as GPLv3 would be the stronger choice, but it would also be more restrictive.
