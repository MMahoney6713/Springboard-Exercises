import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = new Array(nrows).fill().map(() => new Array(ncols).fill())
      .map(
        row => row.map(el => Math.random() < chanceLightStartsOn ? true : false)
      )

    return initialBoard;
  }

  function hasWon() {
    // Check the board in state to determine whether the player has won.
    return board.every(row => row.every(el => el === false) === true)
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map(row => [...row]);

      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y, x, boardCopy);

      return boardCopy;
    });
  }


  return (
    <>
      {/* If won, render text 'You Won'. If not, render board */}
      {hasWon() ? <h1>You won</h1> :
        (
          <table>
            <tbody className="Board">
              {board.map((row, rIdx) => (
                <tr key={`row-${rIdx}`}>
                  {row.map((col, cIdx) => {
                    return <Cell flipCellsAroundMe={flipCellsAround} isLit={col} coord={`${rIdx}-${cIdx}`} key={`${rIdx}-${cIdx}`} />
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </>
  )
}

export default Board;
