import { Column } from "../../Util/Column";
import { Content } from "../../Util/Content";
import { ReviewReplyWindow } from "./ReviewReplyWindow";
import { UserInfo } from "./UserInfo";

export const AccountPage = () => {
  return (
    <Content>
      <Column $alignItems="center" $gap="32px">
        <UserInfo />

        <ReviewReplyWindow />
      </Column>
    </Content>
  );
};
