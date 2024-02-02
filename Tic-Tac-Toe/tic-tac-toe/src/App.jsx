import "./App.css";
import { useState } from "react";

const generateBoard = (size = 3) => {
  const board = [];
  for (let i = 0; i < size; i++) {
    board.push([...Array(size)]);
  }
  return board;
};

const maxNoOfMoves = 9;

const checkHorizontalWin = (board) => {
  for (let row of board) {
    const rowSet = new Set(row);
    if (rowSet.size === 1 && !rowSet.has(undefined)) {
      return true;
    }
  }
};

const checkVerticalWin = (board, currentPlayer) => {
  for (let cell = 0; cell < board.length; cell++) {
    let totalCurrentPlayerMoves = 0;
    for (let row = 0; row < board.length; row++) {
      if (board[row][cell] === currentPlayer) {
        totalCurrentPlayerMoves++;
      }
    }
    if (totalCurrentPlayerMoves === 3) {
      return true;
    }
  }

  return false;
};

const checkDiagonalWin = (board, currentPlayer) => {
  let moves = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i][i] === currentPlayer) {
      moves++;
    }
  }

  if (moves === 3) {
    return true;
  }

  moves = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i][board.length - i - 1] === currentPlayer) {
      moves++;
    }
  }
  if (moves === 3) {
    return true;
  }

  return false;
};

const checkForWins = (board, currentPlayer) => {
  if (
    checkHorizontalWin(board) ||
    checkVerticalWin(board, currentPlayer) ||
    checkDiagonalWin(board, currentPlayer)
  ) {
    return true;
  }

  return false;
};

function App() {
  const [board, setBoard] = useState(generateBoard(3));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [currentNoOfMoves, setCurrentNoOfMoves] = useState(0);
  const [winner, setWinner] = useState("");

  const handleCellClick = (rowIdx, cellIdx) => {
    if (winner) {
      return;
    }

    if (currentNoOfMoves === maxNoOfMoves) {
      setCurrentNoOfMoves(currentNoOfMoves + 1);
      return;
    }

    if (currentNoOfMoves > maxNoOfMoves) {
      return;
    }

    const newBoard = [...board];
    newBoard[rowIdx][cellIdx] = currentPlayer;
    setBoard(newBoard);
    setCurrentNoOfMoves((moves) => moves + 1);
    if (checkForWins(newBoard, currentPlayer)) {
      setWinner(currentPlayer);
      console.log(currentPlayer + " wins match");
    } else {
      setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  return (
    <>
      <div>
        {board.map((row, rowIdx) => {
          return (
            <div key={"row_" + rowIdx} style={{ display: "flex" }}>
              {row.map((cell, cellIdx) => {
                return (
                  <div
                    key={"cell_" + cellIdx}
                    onClick={() => handleCellClick(rowIdx, cellIdx)}
                    style={{
                      height: "50px",
                      width: "50px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "black",
                      border: "1px solid black",
                    }}
                  >
                    {cell}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {winner && (
        <div style={{ fontSize: "24px", padding: "12px", margin: "auto",color:'black' }}>
          Winner is {winner}
        </div>
      )}
      {currentNoOfMoves >= maxNoOfMoves && (
        <div style={{ fontSize: "24px", padding: "12px", margin: "auto",color:'black' }}>
          Match Draws
        </div>
      )}
    </>
  );
}

export default App;
