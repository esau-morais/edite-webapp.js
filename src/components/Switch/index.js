import { useState } from 'react';
// Components (styles)
import { CustomSwitch } from './switch.styles';

function Switch() {
  const [isToggled, setIsToggled] = useState(false);

  const onSwitch = () => setIsToggled(!isToggled);

  return (
    <CustomSwitch>
      <input
        type="checkbox"
        checked={isToggled}
        onChange={onSwitch}
      />
      <span />
    </CustomSwitch>
  )
}

export default Switch;
