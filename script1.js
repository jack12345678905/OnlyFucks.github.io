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
  BALTO:       { row: 7, col: 7, len: 5, dx: 1, dy: -1 }, //corretto           
  BOLT:        { row: 4, col: 7, len: 4, dx: 1, dy: 0 },// corretto
  WODOLETO:    { row: 0, col: 6, len: 8, dx: 0, dy: 1 }, // corretto
  TRANS:       { row: 6, col: 6, len: 5, dx: -1, dy: 1 },// corretto
  TAZZINA:     { row: 6, col: 6, len: 7, dx: -1, dy: 0 },// corretto
  PROCESSO:    { row: 10, col: 7, len: 8, dx: -1, dy: 0 },// corretto
  PAPABOYS:    { row: 8, col: 11, len: 8, dx: 0, dy: -1 },// corretto
  GENITORI:    { row: 5, col: 7, len: 8, dx: -1, dy: 0 },// corretto
  EBREI:       { row: 7, col: 9, len: 5, dx: 0, dy: 1 },// corretto
  DINKLEBERG:  { row: 11, col: 10, len: 10, dx: -1, dy: 0 },// corretto
  BLACKOUT:    { row: 4, col: 7, len: 8, dx: -1, dy: 0 }, // corretto
  SUPERPOTERI: { row: 3, col: 0, len: 11, dx: 1, dy: 0 }, // corretto
  OMERO:       { row: 7, col: 2, len: 5, dx: 1, dy: 0 }, // corretto
  DUCE:        { row: 8, col: 6, len: 4, dx: -1, dy: 1 }, // corretto
  FANTA:       { row: 6, col: 9, len: 5, dx: -1, dy: 0 } // corretto
};
let completed = false;
// ===============================
// 4️⃣ PRECALCOLO CELLE DI OGNI PAROLA
// ===============================
Object.keys(words).forEach(word => {
  const data = words[word];
  data.cells = [];
  data.active = false;

  for (let i = 0; i < data.len; i++) {
    const r = data.row + i * data.dy;
    const c = data.col + i * data.dx;

    const cell = document.querySelector(
      `.cell[data-row="${r}"][data-col="${c}"]`
    );

    if (cell) data.cells.push(cell);
  }
});

// ===============================
// 5️⃣ CLICK SULLE DOMANDE
// → mostra/nasconde TUTTE le risposte
// ===============================
document.querySelectorAll(".question").forEach(q => {
  q.addEventListener("click", () => {
    const answers = q.parentElement.querySelectorAll(".answer");
    answers.forEach(a => a.classList.toggle("hidden"));
  });
});


// ===============================
// 6️⃣ CLICK SULLE RISPOSTE
// → evidenzia parola nel crucipuzzle
// ===============================
document.querySelectorAll(".answer").forEach(ans => {
  ans.addEventListener("click", () => {
    const word = ans.dataset.word;
    const data = words[word];
    if (!data) return;

    // toggle stato parola
    data.active = !data.active;
    ans.classList.toggle("found");

    // aggiorna celle
    data.cells.forEach(cell => {
      let count = parseInt(cell.dataset.count);

      if (data.active) count++;
      else count--;

      cell.dataset.count = count;

      if (count > 0) cell.classList.add("highlight");
      else cell.classList.remove("highlight");
    });

    // controllo completamento (UNA VOLTA)
    if (
      !completed &&
      Object.values(words).every(w => w.active)
    ) {
      completed = true;
      alert("🎉 Complimenti! Hai completato il crucipuzzle 🎓\nOra leggi le lettere non evidenziate…");
    }
  });
});
