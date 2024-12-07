import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Card from "../Cards/Card";

interface ColsProps {
  column: {
    id: string;
    title: string;
    cards: { id: string; title: string }[];
  };
  moveCard: (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => void;
  addCard: (columnId: string, cardTitle: string) => void;
}

const Cols: React.FC<ColsProps> = ({ column, moveCard, addCard }) => {
  const [newCardTitle, setNewCardTitle] = useState("");
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      addCard(column.id, newCardTitle);
      setNewCardTitle("");
      setIsAddingCard(false);
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item: { cardId: string; sourceColumnId: string }) => {
      if (item.sourceColumnId !== column.id) {
        moveCard(item.cardId, item.sourceColumnId, column.id);
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`border rounded-md p-4 flex flex-col space-y-2 bg-gray-700 ${
        isOver ? "bg-stone-900" : ""
      }`}
    >
      <h2 className="text-lg font-bold">{column.title}</h2>

      {column.cards.map((card) => (
        <Card key={card.id} card={card} columnId={column.id} />
      ))}
      {isAddingCard ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="p-2 border rounded-md"
            placeholder="Enter task title"
          />
          <button
            onClick={handleAddCard}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
          <button
            onClick={() => setIsAddingCard(false)}
            className="p-2 bg-gray-500 text-white rounded-md"
          >
            X
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingCard(true)}
          className="p-2 bg-green-400 text-white rounded-md"
        >
          Add Task
        </button>
      )}
    </div>
  );
};

export default Cols;
