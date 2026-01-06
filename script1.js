const gridLetters = [
  \"SENIMOWNDOES\",
  \"ISTESSOEUNPS\",
  \"ODIBENDEEOGY\".replace(' ', ''),
  \"SUPERPOTERIO\",
  \"TUOKCALBOLTB\",
  \"IROTINEGNLUA\",
  \"ANIZZATNAFNP\",
  \"OSOMEROBIECA\",
  \"ONSIADDERBAP\",
  \"SSENSUUOFRRA\",
  \"OSSECORPTEEL\",
  \"LGREBELKNIDO\"
];

{
  row: 3,
  col: 2,
  len: 7,
  dx: 1,
  dy: 0
}
function highlightWord({ row, col, len, dx, dy }) {
  clearHighlight();

  for (let i = 0; i < len; i++) {
    const r = row + i * dy;
    const c = col + i * dx;

    const cell = document.querySelector(
      `.cell[data-row="${r}"][data-col="${c}"]`
    );

    if (cell) cell.classList.add('highlight');
  }
}

const words = {
  BALTO:        { row: 4, col: 8, len: 5, dx: -1, dy: 0 }, // ←
  SUPERPOTERI: { row: 3, col: 0, len: 11, dx: 1, dy: 0 }, // →
  OMERO:       { row: 7, col: 1, len: 5, dx: 1, dy: 1 },  // ↘
  DUCE:        { row: 1, col: 10, len: 4, dx: 0, dy: 1 }, // ↓
  FANTA:       { row: 6, col: 6, len: 5, dx: -1, dy: 1 }  // ↙
};

document.querySelectorAll('#word-list li').forEach(li => {
  li.addEventListener('click', () => {
    const word = li.textContent;
    const data = words[word];
    if (!data) return;

    highlightWord(data);
    li.classList.add('found');
  });
});
