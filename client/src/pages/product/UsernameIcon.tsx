import { FC } from "react";
import { UserIcon } from "../../Util/ProfileIcon";
import { Row } from "../../Util/Row";

interface UsernameIconProps {
  username: string;
  icon: string;
}

export const UsernameIcon: FC<UsernameIconProps> = ({ username, icon }) => {
  return (
    <Row $alignItems="center" $gap=".8rem">
      <UserIcon src={icon} />
      {username}
    </Row>
  );
};
