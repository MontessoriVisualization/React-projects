import React from "react";

import { useState } from "react";
const Cell = ({ value, isgreen }) => {
  return (
    <div
      className={`bg-green-300 w-full h-full ${isgreen ? "bg-green-200" : "bg-white"} text-center`}
    >
      {value}
    </div>
  );
};
const Outerborder = ({ dig, isrow = false }) => {
  return (
    <div
      className={`bg-black ${isrow ? "w-[600px] h-1/16 flex" : "h-[600px] w-1/16"}`}
    >
      {dig.map((rowvalv, rowind) => (
        <div
          className={`cell text-white items-center justify-center flex ${isrow ? "w-1/8" : "h-1/8"}`}
        >
          {rowvalv}
        </div>
      ))}
    </div>
  );
};

export const Board = () => {
  const row = [1, 2, 3, 4, 5, 6, 7, 8];
  const col = ["a", "b", "c", "d", "e", "f", "g", "h"];

  return (
    <>
      <Outerborder dig={col} />

      <div className="board w-[600px] h-[600px] bg-red-300">
        {col.map((colvalue, colindex) => (
          <div className="row flex w-full h-1/8" key={Date.toString + colindex}>
            {row.map((rowvalue, rowindex) => (
              <div
                className="wrapper w-1/8 h-full"
                key={Date.toString + rowvalue}
              >
                {(rowindex + 1) % 2 == 0 ? (
                  (colindex + 1) % 2 == 0 ? (
                    <Cell value={`${colvalue},${rowvalue}`} isgreen={true} />
                  ) : (
                    <Cell value={`${colvalue},${rowvalue}`} isgreen={false} />
                  )
                ) : (colindex + 1) % 2 == 0 ? (
                  <Cell value={`${colvalue},${rowvalue}`} isgreen={false} />
                ) : (
                  <Cell value={`${colvalue},${rowvalue}`} isgreen={true} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Outerborder dig={col} />
    </>
  );
};
