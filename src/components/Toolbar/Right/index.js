import { useContext } from 'react';
import { ToolbarContext } from 'App';
// Components (child)
import ToolsList from './tools';
// Components (styles)
import { RightContainer } from '../toolbar.styles';

function ToolbarRight() {
  const { open } = useContext(ToolbarContext);

  return (
    <>
      {open && (
        <RightContainer>
          <ul>
            <ToolsList />
          </ul>
        </RightContainer>
      )}
    </>
  )
}

export default ToolbarRight;
