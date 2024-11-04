// context/TotalPriceContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface TotalPriceContextProps {
  totalPrice: number;
  setTotalPrice: (price: number) => void;
}

const TotalPriceContext = createContext<TotalPriceContextProps | undefined>(
  undefined
);

export const TotalPriceProvider = ({ children }: { children: ReactNode }) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  return (
    <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
      {children}
    </TotalPriceContext.Provider>
  );
};

export const useTotalPrice = () => {
  const context = useContext(TotalPriceContext);
  if (context === undefined) {
    throw new Error("useTotalPrice must be used within a TotalPriceProvider");
  }
  return context;
};
