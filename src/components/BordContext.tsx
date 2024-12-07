import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Card {
  id: string;
  title: string;
}

export interface ColumnData {
  id: string;
  title: string;
  cards: Card[];
}

interface BoardContextProps {
  columns: ColumnData[];
  addColumn: (title: string) => void;
  removeColumn: (id: string) => void;
  updateColumnTitle: (id: string, title: string) => void;
  addCard: (columnId: string, cardTitle: string) => void;
  removeCard: (columnId: string, cardId: string) => void;
  updateCardTitle: (columnId: string, cardId: string, newTitle: string) => void;
  moveCard: (cardId: string, sourceColumnId: string, targetColumnId: string) => void; // Added
}

const BoardContext = createContext<BoardContextProps | null>(null);

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [columns, setColumns] = useState<ColumnData[]>(() => {
    const storedData = localStorage.getItem("columns");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  const addColumn = (title: string) => {
    const newColumn: ColumnData = { id: uuidv4(), title, cards: [] };
    setColumns((prev) => [...prev, newColumn]);
  };

  const removeColumn = (id: string) => {
    setColumns((prev) => prev.filter((col) => col.id !== id));
  };

  const updateColumnTitle = (id: string, title: string) => {
    setColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, title } : col))
    );
  };

  const addCard = (columnId: string, cardTitle: string) => {
    const newCard: Card = { id: uuidv4(), title: cardTitle };
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
      )
    );
  };

  const removeCard = (columnId: string, cardId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((card) => card.id !== cardId) }
          : col
      )
    );
  };

  const updateCardTitle = (columnId: string, cardId: string, newTitle: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map((card) =>
                card.id === cardId ? { ...card, title: newTitle } : card
              ),
            }
          : col
      )
    );
  };

  const moveCard = (cardId: string, sourceColumnId: string, targetColumnId: string) => {
    setColumns((prev) => {
      const sourceColumn = prev.find((col) => col.id === sourceColumnId);
      const targetColumn = prev.find((col) => col.id === targetColumnId);
      if (!sourceColumn || !targetColumn) return prev;

      const card = sourceColumn.cards.find((card) => card.id === cardId);
      if (!card) return prev;

      sourceColumn.cards = sourceColumn.cards.filter((card) => card.id !== cardId);
      targetColumn.cards = [...targetColumn.cards, card];

      return [...prev];
    });
  };

  return (
    <BoardContext.Provider
      value={{
        columns,
        addColumn,
        removeColumn,
        updateColumnTitle,
        addCard,
        removeCard,
        updateCardTitle,
        moveCard, // Added to context
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};
