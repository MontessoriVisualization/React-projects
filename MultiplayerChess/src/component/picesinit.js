const chessPiecesBlack = {
  pawn: `https://assets-themes.chess.com/image/pxaxj/150/bp.png`,
  king: `https://assets-themes.chess.com/image/pxaxj/150/bk.png`,
  queen: `https://assets-themes.chess.com/image/pxaxj/150/bq.png`,
  rook: `https://assets-themes.chess.com/image/pxaxj/150/br.png`,
  bishop: `https://assets-themes.chess.com/image/pxaxj/150/bb.png`,
  knight: `https://assets-themes.chess.com/image/pxaxj/150/bn.png`,
};
const chessPiecesWhite = {
  pawn: `https://assets-themes.chess.com/image/pxaxj/150/wp.png`,
  king: `https://assets-themes.chess.com/image/pxaxj/150/wk.png`,
  queen: `https://assets-themes.chess.com/image/pxaxj/150/wq.png`,
  rook: `https://assets-themes.chess.com/image/pxaxj/150/wr.png`,
  bishop: `https://assets-themes.chess.com/image/pxaxj/150/wb.png`,
  knight: `https://assets-themes.chess.com/image/pxaxj/150/wn.png`,
};

function initializePiece() {
  const board = {
    "0,0": chessPiecesBlack.rook,
    "0,1": chessPiecesBlack.knight,
    "0,2": chessPiecesBlack.bishop,
    "0,3": chessPiecesBlack.queen,
    "0,4": chessPiecesBlack.king,
    "0,5": chessPiecesBlack.bishop,
    "0,6": chessPiecesBlack.knight,
    "0,7": chessPiecesBlack.rook,
    "1,0": chessPiecesBlack.pawn,
    "1,1": chessPiecesBlack.pawn,
    "1,2": chessPiecesBlack.pawn,
    "1,3": chessPiecesBlack.pawn,
    "1,4": chessPiecesBlack.pawn,
    "1,5": chessPiecesBlack.pawn,
    "1,6": chessPiecesBlack.pawn,
    "1,7": chessPiecesBlack.pawn,
    "6,0": chessPiecesWhite.pawn,
    "6,1": chessPiecesWhite.pawn,
    "6,2": chessPiecesWhite.pawn,
    "6,3": chessPiecesWhite.pawn,
    "6,4": chessPiecesWhite.pawn,
    "6,5": chessPiecesWhite.pawn,
    "6,6": chessPiecesWhite.pawn,
    "6,7": chessPiecesWhite.pawn,
    "7,0": chessPiecesWhite.rook,
    "7,1": chessPiecesWhite.knight,
    "7,2": chessPiecesWhite.bishop,
    "7,3": chessPiecesWhite.queen,
    "7,4": chessPiecesWhite.king,
    "7,5": chessPiecesWhite.bishop,
    "7,6": chessPiecesWhite.knight,
    "7,7": chessPiecesWhite.rook,
  };
  return board;
}
export { initializePiece };
