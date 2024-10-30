import styled from "styled-components";

export const Checkbox = styled.input`
  &[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    background-color: var(--gray-1);
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;

    transition: 200ms background-color ease-in;
  }

  &[type="checkbox"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--gray-7);
    background-color: CanvasText;
  }

  &[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  &[type="checkbox"]:focus {
    outline: max(2px, 0.15em) solid currentColor;
    outline-offset: max(2px, 0.15em);
  }

  &[type="checkbox"]:disabled {
    color: var(--gray-4);
    cursor: not-allowed;
  }
`;
