import { motion } from "motion/react";

const Cell = ({ value, isgreen, rowindex, colindex, piece, isSelected }) => {
  return (
    <motion.div
      className={`relative bg-[#739451] w-full h-full ${
        isgreen ? "bg-[#739451] text-white" : "bg-white text-[#81b64c]"
      } text-center ${isSelected ? "border-4 border-blue-500" : ""}`}
      value={value}
    >
      {piece && (
        <motion.img
          src={piece}
          alt="chess piece"
          className="w-3/4 h-3/4 mx-auto my-auto cursor-pointer z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      )}

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
    </motion.div>
  );
};

export { Cell };
