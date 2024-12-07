import React from "react";
import { useDrop } from "react-dnd";
import CardComponent from "../Cards/Card";

interface Card {
  id: string;
  title: string;
}

interface ColumnData {
  id: string;
  title: string;
  cards: Card[];
}

interface ColsProps {
  column: ColumnData;
  moveCard: (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => void;
  addCard: (columnId: string, cardTitle: string) => void;
}

const Cols: React.FC<ColsProps> = ({ column, moveCard, addCard }) => {
  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item: { cardId: string; sourceColumnId: string }) => {
      if (item.sourceColumnId !== column.id) {
        moveCard(item.cardId, item.sourceColumnId, column.id);
      }
    },
  });

  return (
    <div
      ref={drop}
      className="border rounded-md p-4 flex flex-col space-y-2 bg-gray-200"
    >
      <h2 className="text-lg font-bold">{column.title}</h2>
      {column.cards.map((card) => (
        <CardComponent key={card.id} card={card} columnId={column.id} />
      ))}
      <button
        onClick={() => {
          const cardTitle = prompt("Enter card title:");
          if (cardTitle) addCard(column.id, cardTitle);
        }}
        className="p-2 mt-2 bg-green-500 text-white rounded-md"
      >
        Add Card
      </button>
    </div>
  );
};

export default Cols;
