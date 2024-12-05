import styled from "styled-components";

export const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4px;

  align-items: stretch;
  width: 50rem;

  & > h2,
  & > h3 {
    align-self: flex-start;
    margin-bottom: 1.2rem;
  }

  & > label {
    margin-top: 8px;
  }

  & > label:first-of-type {
    margin-top: 0;
  }

  & > button {
    margin-top: 2.4rem;
  }
`;
