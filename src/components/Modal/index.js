import { createPortal } from 'react-dom';
// Icons
import { ReactComponent as Close } from 'assets/Close.svg';
// Components (styles)
import { Overlay, Wrapper } from './modal.styles';
import { Heading } from '../index';

function Modal({ open, onClose, toolName, children }) {
  if (!open) return null;

  return createPortal(
    <>
      <Overlay onClick={onClose} />
      <Wrapper>
        <button onClick={onClose}>
          <Close />
        </button>

        <Heading>{toolName}</Heading>

        <section>
          {children}
        </section>
      </Wrapper>
    </>,
    document.getElementById('portal')
  )
}

export default Modal;

