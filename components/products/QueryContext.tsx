"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface QueryContextProps {
  qurey: string;
  setQurey: React.Dispatch<React.SetStateAction<string>>;
}

const QueryContext = createContext<QueryContextProps>({
  qurey: "/api/eco/products?sort=price&page=1&limit=8", // قيمة افتراضية
  setQurey: () => {}, // دالة افتراضية فارغة
});

export const useQuery = () => useContext(QueryContext);

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const [qurey, setQurey] = useState(
    "/api/eco/products?sort=price&page=1&limit=8"
  );

  return (
    <QueryContext.Provider value={{ qurey, setQurey }}>
      {children}
    </QueryContext.Provider>
  );
};
