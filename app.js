const Game = (() => {
  

  return {}
})();

const Player = (() => {

})();

const Board = (() => {

  applyMove = (cell) => {

  };

  checkStatus = cell => cell.status ? false : applyMove(cell)

  getCellDiv = cellObj => {
    const div = document.createElement('div');
    document.getElementById('game-board').append(div);
    div.classList.add('cell');
    return div;
  }

  fillCells = ary => {
    for (let i = 0; i < 9; i++) {
      let cell = {
        state: '',
        element: getCellDiv()
      };
      cell.element.addEventListener('click', e => checkStatus(cell));
      ary.push(cell);
    };
    return ary;
  };

  const cells = fillCells([]);

  return { cells }
})();