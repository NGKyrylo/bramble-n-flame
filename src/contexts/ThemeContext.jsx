"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // const getInitialTheme = () =>
  //   localStorage.getItem('theme') ||
  //   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  // const [theme, setTheme] = useState(getInitialTheme);

  // useEffect(() => {
  //   localStorage.setItem('theme', theme);
  //   document.documentElement.setAttribute('data-theme', theme);
  // }, [theme]);

  const [theme, setTheme] = useState(null);

  // Викликається тільки на клієнті
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = saved || (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  useEffect(() => {
    if (!theme) return;
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);