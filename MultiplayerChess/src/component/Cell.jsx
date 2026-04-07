import {
  ChessBishop,
  ChessKnight,
  ChessPawn,
  ChessQueen,
  ChessRook,
} from "lucide-react";
const Cell = ({ value, isgreen, rowindex, colindex }) => {
  return (
    <div
      className={`relative bg-[#81b64c] w-full h-full ${isgreen ? "bg-[#81b64c] text-white" : "bg-white text-[#81b64c]"} text-center`}
      value={value}
    >
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
          <ChessPawn className="w-full h-full p-1 fill-white text-white" />
        </span>
      )}
    </div>
  );
};

export { Cell };
