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

function initializePiece(colindex, rowindex) {
  if (colindex == 0 || colindex == 7) {
    switch (rowindex) {
      case 0:
        return colindex == 0 ? chessPiecesBlack.rook : chessPiecesWhite.rook;
      case 1:
        return colindex == 0
          ? chessPiecesBlack.knight
          : chessPiecesWhite.knight;
      case 2:
        return colindex == 0
          ? chessPiecesBlack.bishop
          : chessPiecesWhite.bishop;
      case 3:
        return colindex == 0 ? chessPiecesBlack.queen : chessPiecesWhite.queen;

      case 4:
        return colindex == 0 ? chessPiecesBlack.king : chessPiecesWhite.king;

      case 5:
        return colindex == 0
          ? chessPiecesBlack.bishop
          : chessPiecesWhite.bishop;

      case 6:
        return colindex == 0
          ? chessPiecesBlack.knight
          : chessPiecesWhite.knight;

      case 7:
        return colindex == 0 ? chessPiecesBlack.rook : chessPiecesWhite.rook;

      default:
        return null;
    }
  } else if (colindex == 1 || colindex == 6) {
    return colindex == 1 ? chessPiecesBlack.pawn : chessPiecesWhite.pawn;
  }
}
export { initializePiece };
