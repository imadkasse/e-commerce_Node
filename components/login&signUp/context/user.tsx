"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface Order {
  _id: string;
  products: any[]; // يمكنك استبدال any بواجهة المنتجات إذا كنت تعرف هيكل البيانات الخاص بها
  date: string; // تمثل بتنسيق ISO 8601
  codePromo: string | null;
  address: string;
  price: number;
  __v: number;
}

interface User {
  _id: string;
  username: string;
  email: string;
  active: boolean;
  favorites: any[]; // يمكنك استبدال any بواجهة المفضلات إذا كانت معروفة
  shopCart: any[]; // يمكنك استبدال any بواجهة سلة التسوق إذا كانت معروفة
  orders: Order[];
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null); // حالة المستخدم
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
