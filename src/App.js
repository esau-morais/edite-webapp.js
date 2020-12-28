import { createContext, useState } from 'react';
import useMediaQuery from './hooks/useMediaQuery';
// Components (children)
import ToolbarLeft from './components/Toolbar/Left';
import FileUploader from './components/FileUploader';
import ToolbarRight from './components/Toolbar/Right';
import Mobile from './components/Mobile';
// Providers
export const ToolbarContext = createContext();
export const ToolsContext = createContext();
export const SliderContext = createContext();

function App(props) {
  // Toolbar & slider states
  const [open, setOpen] = useState(false);
  const [activeTool, setActiveTool] = useState();
  const [show, setShow] = useState(false);

  // Detect if it is mobile by the size
  const isMobile = useMediaQuery();

  return (
    <>
      {!isMobile ? (
      <ToolbarContext.Provider value={{ open, setOpen }}>
        <ToolsContext.Provider value={{ activeTool, setActiveTool }}>
          <SliderContext.Provider value={{ show, setShow }}>
            <ToolbarLeft />
            <FileUploader />
            <ToolbarRight />
          </SliderContext.Provider>
        </ToolsContext.Provider>
      </ToolbarContext.Provider>
      ) : (
        <Mobile />
      )}
    </>
  );
}

export default App;
