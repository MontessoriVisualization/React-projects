import { motion } from "motion/react";

const Cell = ({ value, isgreen, rowindex, colindex }) => {
  const chessPieces = {
    pawn: `https://assets-themes.chess.com/image/pxaxj/150/bp.png`,
    king: `https://assets-themes.chess.com/image/pxaxj/150/bk.png`,
    queen: `https://assets-themes.chess.com/image/pxaxj/150/bq.png`,
    rook: `https://assets-themes.chess.com/image/pxaxj/150/br.png`,
    bishop: `https://assets-themes.chess.com/image/pxaxj/150/bb.png`,
    knight: `https://assets-themes.chess.com/image/pxaxj/150/bk.png`,
  };

  function initializePiece() {
    if (colindex == 0 || colindex == 7) {
      return (
        <img className="w-full h-full p-2" src={chessPieces.rook} alt="rook" />
      );
    } else if (colindex == 1 || colindex == 6) {
      return (
        <img
          className="w-full h-full p-2"
          src={chessPieces.knight}
          alt="knight"
        />
      );
    }
  }

  const piece = initializePiece();

  return (
    <div
      className={`relative bg-[#739451] w-full h-full ${isgreen ? "bg-[#739451] text-white" : "bg-white text-[#81b64c]"} text-center`}
      value={value}
    >
      {piece}

      {(rowindex == 0 || colindex == 7) && (
        <span className=" text-md font-semibold text-inherit">
          {colindex == 7 ? (
            <div className="absolute bottom-0 right-1">{value[2]}</div>
          ) : (
            ""
          )}
          {rowindex == 0 ? (
            <div className="absolute top-0 left-1">{value[0]}</div>
          ) : (
            ""
          )}
        </span>
      )}
    </div>
  );
};

export { Cell };
