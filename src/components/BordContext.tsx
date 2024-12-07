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

  return (
    <BoardContext.Provider
      value={{
        columns,
        addColumn,
        removeColumn,
        updateColumnTitle,
        addCard,
        removeCard,
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
