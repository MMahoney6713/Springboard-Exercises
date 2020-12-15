window.onload = function () {

  /** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

  const WIDTH = 7;
  const HEIGHT = 6;

  let currPlayer = 1; // active player: 1 or 2
  const board = []; // array of rows, each row is array of cells  (board[y][x])

  /** makeBoard: create in-JS board structure:
   *    board = array of rows, each row is array of cells  (board[y][x])
   */

  function makeBoard() {
    // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    for (let i = 0; i < HEIGHT; i++) {
      board[i] = new Array(WIDTH);
    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops. */

  function makeHtmlBoard() {
    // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const htmlBoard = document.querySelector('#board');

    // TODO: add comment for this code
    // Create the row above the board to be used for selecting the column to 
    // place piece, and add td elements with id's set to the column number
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", handleClick);

    for (let x = 0; x < WIDTH; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }
    htmlBoard.append(top);

    // TODO: add comment for this code
    // Create each row element in the actual game board, populating with td
    // elements with id of row#-col#
    for (let y = 0; y < HEIGHT; y++) {
      const row = document.createElement("tr");
      for (let x = 0; x < WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }
      htmlBoard.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */

  function findSpotForCol(x) {
    // TODO: write the real version of this, rather than always returning 0
    for (let i = HEIGHT - 1; i >= 0; i--) {
      if (board[i][x] === undefined) {
        return i;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */

  function placeInTable(y, x) {
    // TODO: make a div and insert into correct table cell
    const newPiece = document.createElement('div');
    newPiece.classList.add('piece', `player${currPlayer}`);
    document.getElementById(`${y}-${x}`).appendChild(newPiece);
    newPiece.style.transition = '0.5s';
    setTimeout(() => newPiece.style.top = `${0.8 + 3.44 * (y + 1)}em`, 50)
  }

  /** endGame: announce game end */

  function endGame(msg) {
    // TODO: pop up alert message
    const topTableRow = document.querySelector('#column-top');
    topTableRow.removeEventListener("click", handleClick);
    topTableRow.style.backgroundColor = 'gold';
    setTimeout(alert, 520, msg);
  }

  /** handleClick: handle click of column top to play piece */

  function handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    placeInTable(y, x);
    board[y][x] = currPlayer;

    // check for win
    if (checkForWin()) {
      return endGame(`Player ${currPlayer} won!`);
    }

    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame
    if (!board[0].includes(undefined)) {
      endGame('There has been a tie');
    }

    // switch players
    // TODO: switch currPlayer 1 <-> 2
    currPlayer = currPlayer % 2 + 1;
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  function checkForWin() {
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < HEIGHT &&
          x >= 0 &&
          x < WIDTH &&
          board[y][x] === currPlayer
      );
    }

    // TODO: read and understand this code. Add comments to help you.

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }

  makeBoard();
  makeHtmlBoard();
}