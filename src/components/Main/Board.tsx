import React from "react";
import { useBoard } from "../Bordcontext";
import Cols from "../Cols/Cols";

const Board: React.FC = () => {
  const { columns, addColumn, removeColumn, moveCard, addCard } = useBoard();

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={() => {
          const title = prompt("Enter column title:");
          if (title) addColumn(title);
        }}
        className="p-2 bg-blue-500 text-white rounded-md"
      >
        Add Column
      </button>
      <div className="flex space-x-4 overflow-x-auto">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col">
            <Cols column={column} moveCard={moveCard} addCard={addCard} />
            <button
              onClick={() => removeColumn(column.id)}
              className="mt-2 p-1 text-sm bg-red-500 text-white rounded-md"
            >
              Delete Column
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
