export const transliterate = (text: string) =>
  text
    .replace(/aa/g, 'ā')
    .replace(/A/g, 'ā')
    .replace(/ii/g, 'ī')
    .replace(/I/g, 'ī')
    .replace(/uu/g, 'ū')
    .replace(/U/g, 'ū')
    .replace(/ee/g, 'ē')
    .replace(/E/g, 'ē')
    .replace(/oo/g, 'ō')
    .replace(/O/g, 'ō')
    .replace(/T/g, 'ṭ')
    .replace(/D/g, 'ḍ')
    .replace(/N/g, 'ṇ')
    .replace(/L/g, 'ḷ')
    .replace(/sh/g, 'ś')
    .replace(/Sh/g, 'ṣ');

export const transliterateScale = (text: string) =>
  text
    .replace(/1/g, '₁')
    .replace(/2/g, '₂')
    .replace(/3/g, '₃')
    .replace(/\^/g, '\u0307')
    .replace(/_/g, '\u0323');
