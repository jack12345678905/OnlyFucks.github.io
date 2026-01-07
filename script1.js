// 1️⃣ DEFINIZIONE DELLA GRIGLIA
const gridLetters = [
  "SENIMOWNDOESO",
  "ISTESSOEUNPSS",
  "ODIBENDEEOOGY",
  "SUPERPOTERIO",
  "TUOKCALBOLTB",
  "IROTINEGNLUA",
  "ANIZZATNAFNP",
  "OSOMEROBIECA",
  "ONSIADDERBAP",
  "SSENSUUOFRRA",
  "OSSECORPTEEL",
  "LGREBELKNIDO"
];

// 2️⃣ CREAZIONE HTML DELLA GRIGLIA
const grid = document.getElementById("grid");

gridLetters.forEach((rowStr, r) => {
  rowStr.split("").forEach((letter, c) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = letter;
    cell.dataset.row = r;
    cell.dataset.col = c;
    grid.appendChild(cell);
  });
});

// 3️⃣ PULIZIA EVIDENZIAZIONI
function clearHighlight() {
  document
    .querySelectorAll(".cell.highlight")
    .forEach(c => c.classList.remove("highlight"));
}

// 4️⃣ EVIDENZIA PAROLA
function highlightWord({ row, col, len, dx, dy }) {
  clearHighlight();

  for (let i = 0; i < len; i++) {
    const r = row + i * dy;
    const c = col + i * dx;

    const cell = document.querySelector(
      `.cell[data-row="${r}"][data-col="${c}"]`
    );

    if (cell) cell.classList.add("highlight");
  }
}

// 5️⃣ SOLUZIONI
const words = {
  BALTO:        { row: 4, col: 8, len: 5, dx: -1, dy: 0 }, // ←
  SUPERPOTERI: { row: 3, col: 0, len: 11, dx: 1, dy: 0 }, // →
  OMERO:       { row: 7, col: 1, len: 5, dx: 1, dy: 1 },  // ↘
  DUCE:        { row: 1, col: 10, len: 4, dx: 0, dy: 1 }, // ↓
  FANTA:       { row: 6, col: 6, len: 5, dx: -1, dy: 1 }  // ↙
};

// 6️⃣ CLICK SULLE PAROLE
document.querySelectorAll("#word-list li").forEach(li => {
  li.addEventListener("click", () => {
    if (li.classList.contains("found")) return;

    const word = li.textContent;
    const data = words[word];
    if (!data) return;

    highlightWord(data);
    li.classList.add("found");
  });
});
