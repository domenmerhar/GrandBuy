import styled from "styled-components";

export const ContentWithSidebar = styled.div`
  max-width: 1265px;
  display: flex;
  flex: 1;
  flex-direction: column;

  & > select {
    align-self: flex-end;
  }
`;
