import React, { useState } from "react";
import { useBoard } from "./../BordContext";
import Cols from "../Cols/Cols";

const Board: React.FC = () => {
  const { columns, addColumn, removeColumn, moveCard, addCard } = useBoard();
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      addColumn(newColumnTitle);
      setNewColumnTitle("");
      setIsAddingColumn(false);
    }
  };

  return (
    <div className="p-4 space-y-4 flex flex-row justify-between">
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
      {!isAddingColumn ? (
        <button
          onClick={() => setIsAddingColumn(true)}
          className="bg-grey-700 text-white rounded-md h-10 p-2 mx-5"
        >
          Add Column
        </button>
      ) : (
        <div className="flex h-20 p-4 mx-5">
          <input
            type="text"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            className="p-2 border rounded-md"
            placeholder="Enter column title"
          />
          <button
            onClick={handleAddColumn}
            className="ml-2 p-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
          <button
            onClick={() => setIsAddingColumn(false)}
            className="ml-2 p-2 bg-gray-500 text-white rounded-md"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;
