import { Column } from "../../Util/Column";
import { Content } from "../../Util/Content";
import { SaleSection } from "../main/SaleSection";
import { ReviewReplyWindow } from "./ReviewReplyWindow";
import { UserInfo } from "./UserInfo";

const role = "seller";

export const AccountPage = () => {
  return (
    <Content>
      <Column $alignItems="center" $gap="32px">
        <UserInfo />

        {role === "seller" ? <SaleSection /> : <ReviewReplyWindow />}
      </Column>
    </Content>
  );
};
