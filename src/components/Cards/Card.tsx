import React from "react";
import { useDrag } from "react-dnd";
export interface Card {
    id: string;
    title: string;
  }
  
  export interface ColumnData {
    id: string;
    title: string;
    cards: Card[];
  }
  

interface CardProps {
  card: Card;
  columnId: string;
}

const Card: React.FC<CardProps> = ({ card, columnId }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { cardId: card.id, sourceColumnId: columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 border rounded-md bg-black ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {card.title}
    </div>
  );
};

export default Card;
