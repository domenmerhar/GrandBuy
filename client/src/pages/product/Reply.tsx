import styled from "styled-components";
import { Column } from "../../Util/Column";
import { UsernameIcon } from "./UsernameIcon";

const StyledReply = styled(Column)`
  margin-left: 2rem;
  margin-top: -8px;
`;

export const Reply = () => {
  return (
    <StyledReply $gap="8px">
      <UsernameIcon />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
        accusamus, fugit consequuntur aliquid vitae illum. Fuga sed minima,
        delectus cumque laborum a commodi. Natus nisi, sequi sunt praesentium ad
        nemo.
      </p>
    </StyledReply>
  );
};
