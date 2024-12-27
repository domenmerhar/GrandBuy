import { Outlet } from "react-router-dom";
import { Column } from "../../Util/Column";
import { Content } from "../../Util/Content";
import { UserInfo } from "./UserInfo";

export const AccountPage = () => {
  return (
    <Content>
      <Column $alignItems="center" $gap="32px">
        <UserInfo />

        <Outlet />
      </Column>
    </Content>
  );
};
