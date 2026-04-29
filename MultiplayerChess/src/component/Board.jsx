import { Cell } from "./Cell";
import { motion } from "framer-motion";
import { useState } from "react";
import { useContext } from "react";
import PieceContext from "../context/piceContext";
import { tr } from "framer-motion/client";

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
      (initPiece[from].includes("150/w") &&
        initPiece[to] &&
        initPiece[to].includes("150/w")) ||
      (initPiece[from].includes("150/b") &&
        initPiece[to] &&
        initPiece[to].includes("150/b"))
    ) {
      return false; // Prevent moving onto a cell occupied by a piece of the same color
    }
    if (!isBlocked(from, to)) return false; // Prevent moving through other pieces (for non-knight pieces)
    if (initPiece[to] && initPiece[to].includes("k.png")) return false; // Prevent capturing the king
    if (!moveAccordingToRules(from, to)) return false; // Prevent moving in a way that violates piece-specific movement rules
    // console.log("Move from", initPiece[from], "to", initPiece[to]);
    return true;
  };

  function isBlocked(from, to) {
    const fromCol = parseInt(from.split(",")[0]);
    const fromRow = parseInt(from.split(",")[1]);
    const toCol = parseInt(to.split(",")[0]);
    const toRow = parseInt(to.split(",")[1]);
    // (0,0) to (5,5) => (1,1) (2,2) (3,3) (4,4) (5,5)
    const piece = initPiece[from];
    if (piece.includes("n.png")) {
      return true; // Knights can jump over pieces
    } else {
      for (
        let i = 1;
        i < Math.max(Math.abs(toCol - fromCol), Math.abs(toRow - fromRow));
        i++
      ) {
        const intermediateCol = fromCol + i * Math.sign(toCol - fromCol);
        const intermediateRow = fromRow + i * Math.sign(toRow - fromRow);
        if (initPiece[`${intermediateCol},${intermediateRow}`]) {
          console.log(
            "Path blocked at",
            `${intermediateCol},${intermediateRow}`,
          );
          return false; // Path is blocked
        }
      }
    }
    return true; // Path is clear
  }
  function moveAccordingToRules(from, to) {
    const piece = initPiece[from];
    const fromCol = parseInt(from.split(",")[0]);
    const fromRow = parseInt(from.split(",")[1]);
    const toCol = parseInt(to.split(",")[0]);
    const toRow = parseInt(to.split(",")[1]);

    console.log(piece);
    if (piece.includes("p.png")) {
      if (fromRow == toRow && !initPiece[to]) {
        console.log(fromCol, fromRow, toCol, toRow);

        if (
          (fromCol == 1 || fromCol == 6) &&
          ((initPiece[from].includes("150/w") && toCol - fromCol == -2) ||
            (initPiece[from].includes("150/b") && toCol - fromCol == 2)) // Allow two-square move from the starting position
        ) {
          return true;
        } else if (
          (initPiece[from].includes("150/w") && toCol - fromCol == -1) || // Allow one-square move forward
          (initPiece[from].includes("150/b") && toCol - fromCol == 1)
        ) {
          console.log(fromCol, fromRow, toCol, toRow);

          return true;
        }
      }
      if (
        initPiece[to] &&
        ((initPiece[from].includes("150/b") &&
          initPiece[to].includes("150/w")) ||
          (initPiece[from].includes("150/w") && // Allow diagonal capture
            initPiece[to].includes("150/b")))
      ) {
        console.log(fromCol, fromRow, toCol, toRow);
        if (
          (piece.includes("150/w") &&
            Math.abs(fromRow - toRow) == 1 &&
            fromCol - toCol == 1) || // Allow diagonal capture for white pawns
          (piece.includes("150/b") &&
            Math.abs(fromRow - toRow) == 1 &&
            fromCol - toCol == -1)
        ) {
          return true;
        }
      }
      return false;
    } else if (piece.includes("r.png")) {
      if (fromCol == toCol || fromRow == toRow) return true;
    } else if (piece.includes("n.png")) {
      if (
        (Math.abs(fromCol - toCol) == 2 && Math.abs(fromRow - toRow) == 1) ||
        (Math.abs(fromCol - toCol) == 1 && Math.abs(fromRow - toRow) == 2)
      ) {
        return true;
      }
    } else if (piece.includes("b.png")) {
      if (Math.abs(fromCol - toCol) == Math.abs(fromRow - toRow)) return true;
    } else if (piece.includes("q.png")) {
      if (
        fromCol == toCol ||
        fromRow == toRow ||
        Math.abs(fromCol - toCol) == Math.abs(fromRow - toRow)
      )
        return true;
    } else if (piece.includes("k.png")) {
      if (Math.abs(fromCol - toCol) <= 1 && Math.abs(fromRow - toRow) <= 1)
        return true;
    }

    return false;
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
