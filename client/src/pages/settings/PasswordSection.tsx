import { Button } from "../../Util/Button";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { SettingsForm } from "./SettingsForm";

export const PasswordSection = () => {
  return (
    <SettingsForm>
      <HeaderUppercaseBold as="h2">Password</HeaderUppercaseBold>

      <InputWithLabel
        id="password"
        title="Password"
        type="password"
        placeholder="********"
      />

      <InputWithLabel
        id="confirm-password"
        title="Confirm Password"
        type="password"
        placeholder="********"
      />

      <Button $color="orange" $shape="rectangle" $size="medium">
        Change Password
      </Button>
    </SettingsForm>
  );
};
