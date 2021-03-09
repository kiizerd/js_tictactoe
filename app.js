const Game = (() => {

  let players = [{ shape: 'X' }, { shape: 'O' }]
  let current = players[0]

  getMove = () => {
    current = current === players[0] ? players[1] : players[0]
    return current.shape
  };

  gameWin = winner => {
    console.log('game won');
    return;
  }

  gameDraw = () => {
    console.log('game draw');
    return;
  }

  gameOver = (cell) => {
    if (!cell) {
      gameDraw();
      return;
    } else if (cell.state === 'X') {
      gameWin('X');
      return;
    } else if (cell.state === 'O') {
      gameWin('O');
      return;
    };
  };

  let count = 0
  const lookForLine = (cells, cell) => {
    let shape = cell.state

    if ((cells[0].state === shape && cells[1].state === shape && cells[2].state === shape) ||
      (cells[0].state === shape && cells[3].state === shape && cells[6].state === shape) ||
      (cells[0].state === shape && cells[4].state === shape && cells[8].state === shape) ||
      (cells[1].state === shape && cells[4].state === shape && cells[7].state === shape) ||
      (cells[2].state === shape && cells[5].state === shape && cells[8].state === shape) ||
      (cells[3].state === shape && cells[4].state === shape && cells[5].state === shape) ||
      (cells[6].state === shape && cells[7].state === shape && cells[8].state === shape) ||
      (cells[2].state === shape && cells[4].state === shape && cells[6].state === shape)) {
      gameOver(cell);
      return;
    }
    else count++;
    if (count === 9) gameOver(null);
  };

  return { getMove, lookForLine }
})();

const Player = (() => {

})();

const Board = (() => {

  applyMove = cell => cell.element.textContent = cell.state = Game.getMove();

  checkStatus = cell => cell.state ? false : applyMove(cell);

  getCellDiv = cellObj => {
    const div = document.createElement('div');
    document.getElementById('game-board').append(div);
    div.classList.add('cell', 'text-center');
    return div;
  }

  fillCells = ary => {
    for (let i = 0; i < 9; i++) {
      let cell = { state: '', element: getCellDiv() };
      cell.element.addEventListener('click', e => {
        console.log(checkStatus(cell))
        checkStatus(cell);
        Game.lookForLine(cells, cell);
      });
      ary.push(cell);
    };
    return ary;
  };

  const cells = fillCells([]);

  return { cells }
})();