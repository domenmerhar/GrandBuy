import { Button } from "../../Util/Button";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { AccountForm } from "./AccountForm";

export const RoleSection = () => {
  return (
    <AccountForm>
      <HeaderUppercaseBold as="h2">Role</HeaderUppercaseBold>

      <InputWithLabel
        id="role"
        title="Role"
        type="text"
        placeholder="User"
        disabled={true}
      />

      <Button $color="orange" $shape="rectangle" $size="medium">
        Request Seller
      </Button>
    </AccountForm>
  );
};
