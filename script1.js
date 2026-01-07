// 1️⃣ DEFINIZIONE DELLA GRIGLIA
const gridLetters = [
  "SENIMOWNDOES",
  "ISTESSOEUNPS",
  "ODIBENDEEOGY",
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
    cell.dataset.count = 0; // contatore parole attive
    grid.appendChild(cell);
  });
});

// 3️⃣ SOLUZIONI CON COORDINATE
const words = {
  BALTO:        { row: 4, col: 8, len: 5, dx: -1, dy: 0 },
  SUPERPOTERI: { row: 3, col: 0, len: 11, dx: 1, dy: 0 },
  OMERO:       { row: 7, col: 1, len: 5, dx: 1, dy: 1 },
  DUCE:        { row: 1, col: 10, len: 4, dx: 0, dy: 1 },
  FANTA:       { row: 6, col: 6, len: 5, dx: -1, dy: 1 }
};

// 4️⃣ SALVO LE CELLE PER OGNI PAROLA
Object.keys(words).forEach(word => {
  const data = words[word];
  const cells = [];
  for (let i = 0; i < data.len; i++) {
    const r = data.row + i * data.dy;
    const c = data.col + i * data.dx;
    const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
    if (cell) cells.push(cell);
  }
  data.cells = cells;
  data.active = false; // stato parola
});

// 5️⃣ CLICK SU OGNI PAROLA (toggle sicuro)
document.querySelectorAll("#word-list li").forEach(li => {
  li.addEventListener("click", () => {
    const word = li.textContent;
    const data = words[word];
    if (!data) return;

    // toggle stato parola
    data.active = !data.active;
    li.classList.toggle("found");

    // aggiorno ogni cella della parola
    data.cells.forEach(cell => {
      let count = parseInt(cell.dataset.count);
      if (data.active) {
        count++; // parola attiva
      } else {
        count--; // parola disattiva
      }
      cell.dataset.count = count;

      if (count > 0) {
        cell.classList.add("highlight");
      } else {
        cell.classList.remove("highlight");
      }
    });
  });
});
