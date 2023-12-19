import {useState} from "react";

const generateBoard = (size=3) => {
  const newBoard = [];

  for(let i=0;i<size;i++){
    newBoard.push([...Array(size)]);
  }

  return newBoard;
}

const checkHorizontal = (board) => {
  for(let row of board){
    const rowSet = new Set(row);
    if(rowSet.size === 1 && !rowSet.has(undefined)){
      return true;
    }
  }
}

const rowsToColumns = (board) => {
  const newBoard = [];
  let column = 0;
  while(column < board.length){
    const newRow = [];
    for(let row=0;row<board.length;row++){
      newRow.push(board[row][column]);
    }
    newBoard.push(newRow);
    column++;
  }

  return newBoard;
}

const diagonalToRow = (board) =>{ 
  const newBoard = [[],[]];
  let increment = 0;
  let decrement = board.length-1;
  while(increment < board.length){
    newBoard[0].push(board[increment][increment]);
    newBoard[1].push(board[increment][decrement]);
    increment++;
    decrement--;
  }
  return newBoard;
}

const checkForWin = (board) => {
  // horizontal
  if(checkHorizontal(board)){
    return true;
  }

   // vertical
   if(checkHorizontal(rowsToColumns(board))){
    return true;
   }

  // diagonal
  if(checkHorizontal(diagonalToRow(board))){
    return true;
  }
 
}

function App() {
  const [board, setBoard] = useState(generateBoard(3));
  const [currPlayer, setCurrPlayer] = useState('x');
  const [currentNumberOfMoves,setCurrentNumberOfMoves] = useState(1);
  const [maxNumberOfMoves,setMaxNumberOfMoves] = useState(9);

  // console.log(board);
 
  const handleClick = (row, col) => {
    board[row][col] = currPlayer;
    setBoard([...board]);
    setCurrentNumberOfMoves(currentNumberOfMoves+1);
    if(checkForWin(board)){
      console.log(currPlayer + 'wins');
      setBoard(generateBoard(3));
      setCurrPlayer('x');
    } else if(currentNumberOfMoves===maxNumberOfMoves){
      console.log('Match draws');
    } else {
      setCurrPlayer(currPlayer === 'x' ? 'y' : 'x');
    }
  }

  return (
    <div>
      {
        board.map((row,r) => {
          return (
            <div key={'rowCell_'+r}
            style={{
              display:'flex',
            }}>{
              row.map((cell,c) => {
                return (
                  <div 
                  key={'cell_'+c} 
                  onClick={()=>handleClick(r,c)}
                  style={{
                    border: 'solid white 1px',
                    height: '50px',
                    width: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white'
                    }}>
                     {cell} 
                  </div>
                )
              })
            }</div>
          );
        })
}
     </div>
  );
}

export default App;
