import { Cell } from "./Cell";
import { motion } from "framer-motion";
import { initializePiece } from "./picesinit";
import { useState } from "react";

export const Board = () => {
  const [board, setBoard] = useState(initializePiece());
  const [selectedPiece, setSelectedPiece] = useState(null);
  const row = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const col = [8, 7, 6, 5, 4, 3, 2, 1];

  const handleCellClick = (rowindex, colindex) => {
    const clickedPosition = `${colindex},${rowindex}`;
    if (selectedPiece) {
      handleMovePiece(selectedPiece, clickedPosition);
      setSelectedPiece(null);
    } else if (board[clickedPosition]) {
      setSelectedPiece(clickedPosition);
    }
  };
  const handleMovePiece = (from, to) => {
    // if (isValidMove(from, to)) {
    const newBoard = { ...board };
    newBoard[to] = newBoard[from];
    delete newBoard[from];
    setBoard(newBoard);
    // }
  };
  const isValidMove = (from, to) => {
    console.log(`Validating move from ${from} to ${to}`);
    console.log(`Current board state:`, board[from], board[to]);
    //   if(board[from].includes("bp") ) {
    //   return true; // Placeholder, always returns true for now
  };

  return (
    <>
      <div className=" bg-black relative top-0 w-[600px] h-[600px] flex items-center justify-center">
        <motion.div className="board w-[100%] h-[100%] bg-red-300">
          {col.map((colvalue, colindex) => (
            <div
              className="row flex w-full h-1/8"
              key={`${colvalue},${colindex}`}
            >
              {row.map((rowvalue, rowindex) => (
                <motion.div
                  className="wrapper w-1/8 h-full"
                  key={rowvalue}
                  onClick={() => handleCellClick(rowindex, colindex)}
                >
                  {(colindex + rowindex) % 2 == 0 ? (
                    <Cell
                      value={`${colvalue},${rowvalue}`}
                      isgreen={false}
                      rowindex={rowindex}
                      colindex={colindex}
                      piece={board[`${colindex},${rowindex}`]}
                      isSelected={selectedPiece === `${colindex},${rowindex}`}
                    />
                  ) : (
                    <Cell
                      value={`${colvalue},${rowvalue}`}
                      isgreen={true}
                      rowindex={rowindex}
                      colindex={colindex}
                      piece={board[`${colindex},${rowindex}`]}
                      isSelected={selectedPiece === `${colindex},${rowindex}`}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
};
