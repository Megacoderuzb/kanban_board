import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { useBoard } from "../BordContext";

interface CardProps {
  card: {
    id: string;
    title: string;
  };
  columnId: string;
}

const Card: React.FC<CardProps> = ({ card, columnId }) => {
  const { updateCardTitle, removeCard } = useBoard();
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { cardId: card.id, sourceColumnId: columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);

  const handleSave = () => {
    if (newTitle.trim() !== "") {
      updateCardTitle(columnId, card.id, newTitle);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    removeCard(columnId, card.id);
  };

  return (
    <div
      ref={drag}
      className={`p-2 border rounded-md bg-black text-white w-56 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-1 text-black"
          />
          <button
            onClick={handleSave}
            className="mt-1 bg-blue-500 text-white p-1 rounded-md"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="mt-1 bg-gray-500 text-white p-1 rounded-md"
          >
            X
          </button>
        </div>
      ) : (
        <>
          <p className="break-words whitespace-normal text-white w-52">
            {card.title}
          </p>
          <div className="flex space-x-2 mt-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 bg-yellow-300 text-white rounded-md"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="p-1 bg-red-400 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
