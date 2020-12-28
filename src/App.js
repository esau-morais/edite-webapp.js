import { createContext, useState } from 'react';
// Providers
import { ThemeProvider } from 'styled-components';
// Custom Hooks
import useThemeSwitcher from 'hooks/useThemeSwitcher';
import useMediaQuery from 'hooks/useMediaQuery';
// Components (children)
import ToolbarLeft from 'components/Toolbar/Left';
import FileUploader from 'components/FileUploader';
import ToolbarRight from 'components/Toolbar/Right';
import Mobile from 'components/Mobile';
// Components (styles/themes)
import Global from 'styles/global';
import light from 'styles/themes/light';
import dark from 'styles/themes/dark';
// Providers
export const ToolbarContext = createContext();
export const ToolsContext = createContext();
export const SliderContext = createContext();

function App(props) {
  // Toolbar & slider states
  const [open, setOpen] = useState(false);
  const [activeTool, setActiveTool] = useState();
  const [show, setShow] = useState(false);
  // Current theme state (light/dark)
  const [theme, setTheme] = useThemeSwitcher('theme', dark);

  const toggleTheme = () => {
    setTheme(theme.title === 'dark' ? light : dark)
  }

  // Detect if it is mobile by the size
  const isMobile = useMediaQuery();

  return (
    <ThemeProvider theme={theme}>
      <Global />
      {!isMobile ? (
        <ToolbarContext.Provider value={{ open, setOpen }}>
          <ToolsContext.Provider value={{ activeTool, setActiveTool }}>
            <SliderContext.Provider value={{ show, setShow }}>
              <ToolbarLeft toggleTheme={toggleTheme} />
              <FileUploader />
              <ToolbarRight />
            </SliderContext.Provider>
          </ToolsContext.Provider>
        </ToolbarContext.Provider>
      ) : (
        <Mobile />
      )}
    </ThemeProvider>
  );
}

export default App;
