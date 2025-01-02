import styled from "styled-components";
import { Column } from "../../Util/Column";
import { UsernameIcon } from "./UsernameIcon";
import { FC } from "react";

const StyledReply = styled(Column)`
  margin-left: 2rem;
  margin-top: -8px;
`;

interface ReplyProps {
  username: string;
  icon: string;
  content: string;
}

export const Reply: FC<ReplyProps> = ({ username, icon, content }) => {
  return (
    <StyledReply $gap="8px">
      <UsernameIcon username={username} icon={icon} />
      <p>{content}</p>
    </StyledReply>
  );
};
