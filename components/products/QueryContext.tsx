"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface QueryContextProps {
  query: string;
  setQurey: React.Dispatch<React.SetStateAction<string>>;
}

const QueryContext = createContext<QueryContextProps>({
  query: "/api/eco/products?sort=price&page=1&limit=8", // قيمة افتراضية
  setQurey: () => {}, // دالة افتراضية فارغة
});

export const useQuery = () => useContext(QueryContext);

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const [query, setQurey] = useState("/api/eco/products");

  return (
    <QueryContext.Provider value={{ query, setQurey }}>
      {children}
    </QueryContext.Provider>
  );
};
