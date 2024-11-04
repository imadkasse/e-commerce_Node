"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface Order {
  _id: string;
  products: any[];
  date: string;
  codePromo: string | null;
  address: string;
  price: number;
  __v: number;
}

interface Favorites {
  _id: string;
  images: string[];
  name: string;
  price: number;
}
interface ShoppingCart {
  _id: string;
  images: string[];
  name: string;
  price: number;
}

interface User {
  _id: string;
  username: string;
  email: string;
  active: boolean;
  role: string;
  favorites: Favorites[];
  shopCart: ShoppingCart[];
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
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleUserData = async () => {
      setToken(Cookies.get("token")); // التأكد من وجود الـ token
      if (token) {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(data.data.data.user);
      }
    };

    const token = Cookies.get("token");

    if (token) {
      handleUserData(); // جلب بيانات المستخدم إذا كان الـ token متاحًا
    }
  }, [setUser]);

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
