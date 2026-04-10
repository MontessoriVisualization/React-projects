import { Cell } from "./Cell";
import { motion } from "framer-motion";

export const Board = () => {
  const row = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const col = [8, 7, 6, 5, 4, 3, 2, 1];

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
                <motion.div className="wrapper w-1/8 h-full" key={rowvalue}>
                  {(colindex + rowindex) % 2 == 0 ? (
                    <Cell
                      value={`${colvalue},${rowvalue}`}
                      isgreen={false}
                      rowindex={rowindex}
                      colindex={colindex}
                    />
                  ) : (
                    <Cell
                      value={`${colvalue},${rowvalue}`}
                      isgreen={true}
                      rowindex={rowindex}
                      colindex={colindex}
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
