import styled from 'styled-components';

export const Box = styled.form`
  // Size
  width: 100%;
  height: 100%;

  // Position
  position: relative;

  // Display
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // Input
  div.input__box {
    display: inherit;
    flex-direction: inherit;
    align-items: inherit
  }
  // Logo
  div.input__box
  > svg > g > path {
    fill: ${({ theme }) => theme.colors.secondaryForeground}
  }
  // Default
  input[type="file"] {
    display: none
  }

  // DnD upload text (box)
  div.box__upload_text {
    // Spacement
    margin-top: var(--margin2x);

    // Display
    display: inherit;
    flex-direction: inherit;
    align-items: inherit;

    // Font
    font-style: normal;
    font-size: var(--font-base);
    font-weight: 500;
    line-height: 1.722rem;

    // Default colors
    color: ${({ theme }) => theme.colors.secondaryForeground};

    user-select: none
  }

  // DnD upload text (content)
  div.box__upload_text > span {
    // Display
    display: inherit;
    flex-direction: inherit;
    align-items: inherit;
  }

  // Label
  label {
    // Colors
    transition: color .2s ease-in-out;

    cursor: pointer;

    // Spacement
    padding-bottom: 0.2rem;

    border-bottom: 1px solid var(--secondary-blue);
  }
  label:hover {
    // Colors
    color: var(--secondary-blue)
  }
`;

export const ImageBox = styled.div`
  // Spacement
  margin-bottom: var(--margin2x);
  padding: 1rem;

  // Position
  position: relative;

  // Uploaded image
  img {
    // Size
    max-width: 100%; // Change based on the height
    max-height: 80vh;

    border 1px solid ${({ theme }) => theme.colors.primaryForeground}
  }

  // Delete button
  button {
    // Position → Top-right
    position: absolute;
    top: 0;
    right: 0;
  }
  button > svg {
    // Spacement
    padding: 0.25rem;

    // Colors
    background-color: ${({ theme }) => theme.colors.primaryBackground};
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1),
                0 1px 2px 0 rgba(0,0,0,0.06);
    border-radius: 100%;
  }
  button > svg > path {
    fill: ${({ theme }) => theme.colors.primaryForeground}
  }
  button:hover > svg > path {
    fill: var(--primary-red);
    transition: fill 0.2s ease-in-out 0s;
  }
`;

export const UploadState = styled.div`
  // Display
  display: flex;
  flex-direction: column;
  align-items: center;

  // Colors
  color: ${({ theme }) => theme.colors.primaryForeground}
`;
