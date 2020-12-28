import styled from 'styled-components';

export const Wrapper = styled.div`
  // Container
  input[type="range"] {
    // Remove default container shape
    appearance: none;

    // Size
    width: 17.5rem;
    height: 2px;

    // Colors
    background-color: var(--secondary-foreground);
  }

  // Knob
  input[type="range"]::-webkit-scrollbar-thumb {
    // (Force) Remove default knob
    appearance: none!important;

    // Size
    width: 1.125rem;
    height: 1.125rem;

    // Colors
    background-color: var(--secondary-blue);
    box-shadow: 0 0 1rem rgba(24 160 251, 0.08)
  }
`;
