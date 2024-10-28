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

interface Admin {
  _id: string;
  username: string;
  email: string;
  active: boolean;
}

interface AdminContextType {
  admin: Admin | null;
  setAdmin: React.Dispatch<React.SetStateAction<Admin | null>>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

const AdminProvider = ({ children }: AdminProviderProps) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [tokenAdmin, setTokenAdmin] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleUserData = async () => {
      setTokenAdmin(Cookies.get("token-admin"));
      if (token) {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/eco/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAdmin(data.data.data.user);
      }
    };

    const token = Cookies.get("token-admin");

    if (token) {
      handleUserData();
    }
  }, [setAdmin]);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default AdminProvider;
