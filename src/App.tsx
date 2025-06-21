import React from "react";
import { BoardProvider } from "./components/BordContext";
import Board from "./components/Main/Board";
import Navbar from "./components/Nav/Navbar";

const App: React.FC = () => (
  <BoardProvider>
    <Navbar></Navbar>
    <Board />
  </BoardProvider>
);

export default App;
