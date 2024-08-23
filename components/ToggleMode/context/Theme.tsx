"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";

// إنشاء context مع القيمة الافتراضية
export const ThemeContext = createContext({
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  type Theme = "light" | "dark";
  const [theme, setTheme] = useState<Theme | string>("light");

  useEffect(() => {
    // التحقق من أن الكود يعمل في بيئة العميل
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
        console.log(savedTheme); // استرجاع القيمة من localStorage إذا كانت موجودة
      }
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // تحديث localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
