# Carnatic Notation Editor

A browser-based editor for quickly laying out, writing, and printing Carnatic music notation.

**Live Site:** [sudarshan-iyengar.github.io/carnatic-notation](https://sudarshan-iyengar.github.io/carnatic-notation/)

> **No accounts, no cloud, no hassle.** Everything runs locally in your browser. Save your work as a local JSON file and load it back whenever you want.

---

## ⚡ Features

* **Grid-Based Input:** Write swara and sahitya notations seamlessly with automatic font resizing for fast speed phrases (e.g., `SRGM` fits in a single cell).
* **Tālam Layouts:** Support for Adi (1 & 2 kalai), Khanda Ata (2 kalai), Rupaka, Misra Chapu, and Khanda Chapu. Layout changes preserve your existing work!
* **Varnam Templates:** Instant structures for Adi and Ata tala varnams (Pallavi, Anupallavi, Muktayi, Charanams) to get you started.
* **PDF Export:** Print or export highly styled, clean notation sheets directly from your browser.

---

## 🎹 Reference Guide

### Keyboard Shortcuts
While editing swara or sahityam cells:
* `Tab` / `Shift + Tab` — Move to next/previous cell
* `Arrow Keys` — Navigate cells when at the start/end of text
* `Up` / `Down` Arrow (Swaras only) — Toggle upper/lower octave dots

### Transliteration Shortcuts
Type these shortcuts in lyrics or intro fields to automatically insert diacritics:

| Type | Shortcut | Result |
| :--- | :--- | :--- |
| **Vowels** | `aa`/`ii`/`uu`/`ee`/`oo` (or capitalized) | ā / ī / ū / ē / ō |
| **Consonants** | `T` / `D` / `N` / `L` | ṭ / ḍ / ṇ / ḷ |
| **Sibilants** | `sh` / `Sh` | ś / ṣ |
| **Swarasthanas** | `1`, `2`, `3` (in Arohanam/Avarohanam) | Subscripts |
| **Octaves** | `^` / `_` (in Arohanam/Avarohanam) | Upper / lower dots |

---

## 🤝 Contributing

Want to add new features, fix bugs, or build your own version?
### How to Get Started

1. **Fork the Repository:** Click the **Fork** button at the top-right of this page.
2. **Clone Your Fork:** Clone your personal copy of the repository:
```bash
git clone [https://github.com/your-username/carnatic-notation.git](https://github.com/your-username/carnatic-notation.git)
cd carnatic-notation

```

3. **Set Up Upstream:** Keep your fork in sync with the main project by adding the original repository as a remote:
```bash
git remote add upstream [https://github.com/sudarshan-iyengar/carnatic-notation.git](https://github.com/sudarshan-iyengar/carnatic-notation.git)

```

4. **Create a Branch:** Create a branch for your changes:
```bash
git checkout -b feature/my-cool-feature

```

5. **Run & Test Locally:** Install dependencies, make your changes, and make sure existing tests still pass:
```bash
npm install
npm run dev
npm test

```

### Submitting Your Changes (Pull Requests)

Once your changes are tested and ready, you can submit them to be integrated into the official project:

1. Push your branch to your personal fork:
```bash
git push origin feature/my-cool-feature

```

2. Go to the original [sudarshan-iyengar/carnatic-notation](https://www.google.com/search?q=https://github.com/sudarshan-iyengar/carnatic-notation) repository on GitHub.
3. You will see a green **"Compare & pull request"** button at the top. Click it!
4. Write a brief description of the features or bug fixes you made, and submit the PR. We will review it, discuss any adjustments together, and merge it in.

---

## License

This project is licensed under the MIT License.
