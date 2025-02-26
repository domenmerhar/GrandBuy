import styled from "styled-components";

export const ContentWithSidebar = styled.div`
  max-width: 126rem;
  display: flex;
  flex: 1;
  flex-direction: column;

  & > select {
    align-self: flex-end;
  }
`;
