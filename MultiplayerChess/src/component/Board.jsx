import { Cell } from "./Cell";
import { motion } from "framer-motion";
import { useState } from "react";
import { useContext } from "react";
import PieceContext from "../context/piceContext";

export const Board = () => {
  const { initPiece, setInitPiece } = useContext(PieceContext);

  const [selectedPiece, setSelectedPiece] = useState(null);
  const row = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const col = [8, 7, 6, 5, 4, 3, 2, 1];

  const handleCellClick = (rowindex, colindex) => {
    const clickedPosition = `${colindex},${rowindex}`;
    if (selectedPiece) {
      handleMovePiece(selectedPiece, clickedPosition);
      setSelectedPiece(null);
    } else if (initPiece[clickedPosition]) {
      setSelectedPiece(clickedPosition);
    }
  };
  const handleMovePiece = (from, to) => {
    if (isValidMove(from, to)) {
      setInitPiece((prev) => {
        const newBoard = { ...prev };
        newBoard[to] = newBoard[from];
        delete newBoard[from];
        return newBoard;
      });
    }
  };
  const isValidMove = (from, to) => {
    if (from === to) return false; // Prevent moving to the same cell
    if (!initPiece[from]) return false; // No piece to move
    if (
      (initPiece[from].includes(
        "https://assets-themes.chess.com/image/pxaxj/150/w",
      ) &&
        initPiece[to] &&
        initPiece[to].includes(
          "https://assets-themes.chess.com/image/pxaxj/150/w",
        )) ||
      (initPiece[from].includes(
        "https://assets-themes.chess.com/image/pxaxj/150/b",
      ) &&
        initPiece[to] &&
        initPiece[to].includes(
          "https://assets-themes.chess.com/image/pxaxj/150/b",
        ))
    ) {
      return false; // Prevent moving onto a cell occupied by a piece of the same color
    }
    if (!isBlocked(from, to)) return false; // Prevent moving through other pieces (for non-knight pieces)
    console.log("Move from", initPiece[from], "to", initPiece[to]);
    return true;
  };
  function isBlocked(from, to) {
    const fromCol = parseInt(from.split(",")[0]);
    const fromRow = parseInt(from.split(",")[1]);
    const toCol = parseInt(to.split(",")[0]);
    const toRow = parseInt(to.split(",")[1]);
    const piece = initPiece[from];
    if (piece.includes("knight")) return false;
    else {
      return false; // No pieces blocking the path
    }
  }

  return (
    <>
      <div className=" bg-black relative top-0 w-[600px] h-[600px] flex items-center justify-center">
        <motion.div className="initPiece w-[100%] h-[100%] bg-red-300">
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
                      piece={initPiece[`${colindex},${rowindex}`]}
                      isSelected={selectedPiece === `${colindex},${rowindex}`}
                    />
                  ) : (
                    <Cell
                      value={`${colvalue},${rowvalue}`}
                      isgreen={true}
                      rowindex={rowindex}
                      colindex={colindex}
                      piece={initPiece[`${colindex},${rowindex}`]}
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
