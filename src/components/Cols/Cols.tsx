import React, { useState } from "react";
import { useBoard, ColumnData } from "../Bordcontext";
import { useDrop } from "react-dnd";
import Card from "../Cards/Card";

const Cols: React.FC<{ column: ColumnData }> = ({ column }) => {
  const { addCard, removeColumn, updateColumnTitle } = useBoard();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(column.title);

  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item: { id: string; columnId: string }) => {
      console.log("Dropped card:", item);
    },
  });

  return (
    <div
      ref={drop}
      className="border rounded-md p-4 flex flex-col space-y-2 bg-gray-100"
    >
      {isEditingTitle ? (
        <input
          className="border p-2"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={() => {
            updateColumnTitle(column.id, newTitle);
            setIsEditingTitle(false);
          }}
        />
      ) : (
        <h2
          className="text-lg font-bold cursor-pointer"
          onClick={() => setIsEditingTitle(true)}
        >
          {column.title}
        </h2>
      )}
      {column.cards.map((card) => (
        <Card key={card.id} card={card} columnId={column.id} />
      ))}
      <input
        type="text"
        placeholder="Add Card"
        className="border p-2 w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value.trim()) {
            addCard(column.id, e.currentTarget.value.trim());
            e.currentTarget.value = "";
          }
        }}
      />
      <button
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this column?")) {
            removeColumn(column.id);
          }
        }}
        className="bg-red-500 text-white p-2 rounded"
      >
        Delete Column
      </button>
    </div>
  );
};

export default Cols;
