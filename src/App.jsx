import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./component/Main";
import MainLayout from "./component/MainLayout";
import Filter from "./component/Filter";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main />} />
        </Route>
        <Route path="/filter" element={<MainLayout />}>
          <Route index element={<Filter />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
