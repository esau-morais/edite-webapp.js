import { useEffect, useState } from "react";

function useThemeSwitcher(key, initialTheme) {
  const [theme, setTheme] = useState(() => {
    let storagedTheme = localStorage.getItem(key);
    return JSON.parse(storagedTheme) || initialTheme;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(theme));
  }, [key, theme]);

  return [theme, setTheme];
}

export default useThemeSwitcher;
