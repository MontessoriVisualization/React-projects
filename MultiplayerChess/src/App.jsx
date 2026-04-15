import { Board } from "./component/Board";

import PiceContextProvider from "./context/PiceContext.jsx";
import React from "react";

const App = () => {
  return (
    <PiceContextProvider>
      <main className="flex justify-center items-center h-screen flex-col bg-gray-800">
        <Board></Board>
      </main>
    </PiceContextProvider>
  );
};
export default App;
