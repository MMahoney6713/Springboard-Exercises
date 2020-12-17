window.onload = function () {

  class Game {
    constructor(height = 6, width = 7, players) {
      this.WIDTH = width;
      this.HEIGHT = height;
      this.players = players;
      this.currPlayer = 1;
      this.board = [];
      this.makeBoard();
      this.makeHtmlBoard();
    }

    makeBoard() {
      for (let y = 0; y < this.HEIGHT; y++) {
        this.board.push(Array.from({ length: this.WIDTH }));
      }
    }

    makeHtmlBoard() {
      const htmlBoard = document.getElementById('board');

      // make column tops (clickable area for adding a piece to that column)
      const top = document.createElement('tr');
      top.setAttribute('id', 'column-top');
      this.boardListener = this.handleClick.bind(this);
      top.addEventListener('click', this.boardListener);

      for (let x = 0; x < this.WIDTH; x++) {
        const headCell = document.createElement('td');
        headCell.setAttribute('id', x);
        top.append(headCell);
      }

      htmlBoard.append(top);

      // make main part of board
      for (let y = 0; y < this.HEIGHT; y++) {
        const row = document.createElement('tr');

        for (let x = 0; x < this.WIDTH; x++) {
          const cell = document.createElement('td');
          cell.setAttribute('id', `${y}-${x}`);
          row.append(cell);
        }

        htmlBoard.append(row);
      }
    }

    findSpotForCol(x) {
      for (let y = this.HEIGHT - 1; y >= 0; y--) {
        if (!this.board[y][x]) {
          return y;
        }
      }
      return null;
    }

    placeInTable(y, x) {
      const piece = document.createElement('div');
      piece.classList.add('piece');
      //piece.classList.add(`p${this.currPlayer}`);
      piece.style.backgroundColor = this.players[this.currPlayer - 1].color;
      piece.style.top = -50 * (y + 2);

      const spot = document.getElementById(`${y}-${x}`);
      spot.append(piece);
    }

    endGame(msg) {
      alert(msg);
      const top = document.querySelector('#column-top');;
      top.removeEventListener('click', this.boardListener);
    }

    handleClick(evt) {
      // get x from ID of clicked cell
      const x = +evt.target.id;

      // get next spot in column (if none, ignore click)
      const y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }

      // place piece in board and add to HTML table
      this.board[y][x] = this.currPlayer;
      this.placeInTable(y, x);

      // check for win
      if (this.checkForWin()) {
        return this.endGame(`Player ${this.currPlayer} won!`);
      }

      // check for tie
      if (this.board.every(row => row.every(cell => cell))) {
        return this.endGame('Tie!');
      }

      // switch players
      //this.currPlayer = this.currPlayer === 1 ? 2 : 1;
      if (this.currPlayer === this.players.length) {
        this.currPlayer = 1;
      } else {
        this.currPlayer++;
      }
    }

    checkForWin() {
      const _win = (cells) => {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(
          ([y, x]) =>
            y >= 0 &&
            y < this.HEIGHT &&
            x >= 0 &&
            x < this.WIDTH &&
            this.board[y][x] === this.currPlayer
        );
      }

      for (let y = 0; y < this.HEIGHT; y++) {
        for (let x = 0; x < this.WIDTH; x++) {
          // get "check list" of 4 cells (starting here) for each of the different
          // ways to win
          const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
          const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
          const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
          const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

          // find winner (only checking each win-possibility as needed)
          if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
            return true;
          }
        }
      }
    }
  }

  class Player {
    constructor(color) {
      this.color = color;
    }
  }

  const gameStartBtn = document.querySelector('button');
  gameStartBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const players = [];
    const playerColorsFromInput = document.querySelector('#playerInput').value;
    for (let color of playerColorsFromInput.split(' '))
      players.push(new Player(color));
    new Game(6, 7, players);
  })

}