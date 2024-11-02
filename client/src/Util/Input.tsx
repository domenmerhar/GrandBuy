import styled from "styled-components";

interface InputProps {
  $error?: boolean;
}

export const Input = styled.input<InputProps>`
  border: none;

  border-bottom: ${({ $error }) =>
    $error ? "2px solid var(--red)" : "2px solid transparent"};

  padding: 0.5rem 1rem;
  border-radius: 12px;

  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  background-color: var(--gray-2);

  transition: all 200ms;

  color: var(--gray-8);

  font-size: 1.6rem;

  &::placeholder {
    color: var(--gray-6);
  }

  &:focus {
    outline: none;
    background-color: var(--gray-0);
  }

  &[type="password"] {
    font-variant: small-caption;

    &::placeholder {
      font-variant: normal;
    }
  }
`;
