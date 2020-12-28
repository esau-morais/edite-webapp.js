import { useState, useEffect } from 'react';

function useThemeSwitcher(key, initialTheme) {
  const [theme, setTheme] = useState(
    () => {
      const storagedTheme = localStorage.getItem(key);
      if (storagedTheme) JSON.parse(storagedTheme)
      return initialTheme;
    }
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(theme));
  }, [key, theme]);

  return [ theme, setTheme ];
}

export default useThemeSwitcher;
