// Components (styles)
import { LeftContainer } from '../toolbar.styles';
// Components (children)
import ToolsList from './tools';

function ToolbarLeft() {
  return (
    <LeftContainer>
      <ul>
        <ToolsList />
      </ul>
    </LeftContainer>
  )
}

export default ToolbarLeft;

