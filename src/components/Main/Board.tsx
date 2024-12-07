import React from "react";
import { useBoard } from "../Bordcontext";
import Cols from "../Cols/Cols";

const Board: React.FC = () => {
  const { columns, addColumn } = useBoard();

  return (
    <div className="p-4 flex space-x-4 overflow-x-auto">
      {columns.map((column) => (
        <Cols key={column.id} column={column} />
      ))}
      <button
        onClick={() => {
          const title = prompt("Enter column title:");
          if (title) {
            addColumn(title);
          }
        }}
        className="p-4 bg-blue-500 text-white rounded"
      >
        + Add Column
      </button>
    </div>
  );
};

export default Board;
