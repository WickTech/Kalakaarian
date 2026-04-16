import { useState, useEffect } from "react";

export function useTheme() {
  const [dark, setDark] = useState(true); // Default to dark theme

  useEffect(() => {
    // Always default to dark theme
    document.documentElement.classList.add("dark");
    setDark(true);
  }, []);

  const toggle = () => {
    setDark((d) => {
      const newDark = !d;
      if (newDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newDark;
    });
  };

  return { dark, toggle };
}
