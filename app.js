const Display = (() => {

  function getCellDiv(cellObj) {
    const div = document.createElement('div');
    document.getElementById('game-board').append(div);
    div.classList.add('cell', 'text-center');
    return div;
  };

  function updateScore(winner) {
    const scores = Array.from(document.querySelectorAll('li'))

    let index = !winner ? 3 : winner === 'X' ? 1 : 2;
    let score = scores[index].children[0]

    score.textContent = parseInt(score.textContent) + 1

  };

  function getModal() {
    const modal = document.getElementById('game-over-modal');
    modal.style.display = 'block'

    window.onclick = e => { if (e.target==modal) modal.style.display ='none' };
    
    setTimeout(function name() { modal.style.display = 'none' }, 4750);
    
    return modal;
  };

  function gameOver(shape) {
    const modal = getModal();
    const body = document.getElementById('modal-body')

    body.textContent = !shape ? 'No Winner' : (shape + ' WINS!!');
    
    return;
  };
  
  return { getCellDiv, gameOver, updateScore }
})();

const Game = (() => {

  let players = [{ shape: 'X' }, { shape: 'O' }];
  let current = players[0];

  let scores = { 'X': 0, 'O': 0, 'D': 0 };

  function changeScore(winner) {
    Display.updateScore(winner);
    if (!winner) scores['D']++
    else scores[winner]++
  };

  function getMove() {
    current = current.shape === players[0].shape ? players[1] : players[0]
    return current.shape
  };

  function lookForLine(cells, cell) {
    let shape = cell.state

    if ((cells[0].state === shape && cells[1].state === shape && cells[2].state === shape) ||
      (cells[0].state === shape && cells[3].state === shape && cells[6].state === shape) ||
      (cells[0].state === shape && cells[4].state === shape && cells[8].state === shape) ||
      (cells[1].state === shape && cells[4].state === shape && cells[7].state === shape) ||
      (cells[2].state === shape && cells[5].state === shape && cells[8].state === shape) ||
      (cells[3].state === shape && cells[4].state === shape && cells[5].state === shape) ||
      (cells[6].state === shape && cells[7].state === shape && cells[8].state === shape) ||
      (cells[2].state === shape && cells[4].state === shape && cells[6].state === shape)) {
      Display.gameOver(shape);
      changeScore(shape);
      Board.reset();
    } else if (cells.every(cell => cell.state != '')) {
      Display.gameOver(null);
      changeScore(null);
      Board.reset()
    }
    return;
  };

  return { getMove, lookForLine, scores }
})();

const Board = (() => {

  function applyMove (cell) {
    if (cell.state) { return false; }
    cell.element.textContent = cell.state = Game.getMove()
  };


  function fillCells(ary) {
    for (let i = 0; i < 9; i++) {
      let cell = { state: '', element: Display.getCellDiv() };
      cell.element.addEventListener('click', () => {
        applyMove(cell);
        Game.lookForLine(cells, cell);
      });
      ary.push(cell);
    };
    return ary;
  };

  const cells = fillCells([]);

  function reset() {
    cells.forEach(cell => cell.element.textContent = cell.state = '')
  }

  return { cells, reset }
})();