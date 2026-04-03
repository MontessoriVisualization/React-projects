import React from "react";

import { useState } from "react";
const Cell = ({ value, isgreen }) => {
  return (
    <div
      className={`bg-green-300 w-full h-full ${isgreen ? "bg-green-200" : "bg-white"} text-center`}
      value={value}
    ></div>
  );
};
const Outerborder = ({ dig, isrow = false, style }) => {
  return (
    <div
      className={`bg-black absolute ${isrow ? "w-[600px] px-8.75 h-1/16 flex" : "h-[600px] py-8.75 w-1/16"}`}
      style={style}
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
      <div className=" bg-black relative top-0 w-[600px] h-[600px]">
        <Outerborder dig={row} isrow={true} style={{ top: 0 }} />
        <Outerborder dig={col} style={{ left: 0 }} />
        <div className="board w-[87%] h-[87%] bg-red-300">
          {col.map((colvalue, colindex) => (
            <div
              className="row flex w-full h-1/8"
              key={Date.toString + colindex}
            >
              {row.map((rowvalue, rowindex) => (
                <div
                  className="wrapper w-1/8 h-full"
                  key={Date.toString + rowvalue}
                >
                  {(rowindex + 1) % 2 == 0 ? (
                    (colindex + 1) % 2 == 0 ? (
                      <Cell value={`${colvalue},${rowvalue}`} isgreen={false} />
                    ) : (
                      <Cell value={`${colvalue},${rowvalue}`} isgreen={true} />
                    )
                  ) : (colindex + 1) % 2 == 0 ? (
                    <Cell value={`${colvalue},${rowvalue}`} isgreen={true} />
                  ) : (
                    <Cell value={`${colvalue},${rowvalue}`} isgreen={false} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <Outerborder dig={col} style={{ right: 0 }} />

        <Outerborder dig={row} isrow={true} style={{ bottom: 0 }} />
      </div>
    </>
  );
};
