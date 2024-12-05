import { Button } from "../../Util/Button";
import { Column } from "../../Util/Column";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { Row } from "../../Util/Row";
import { SettingsForm } from "./SettingsForm";

export const AccountSection = () => {
  return (
    <SettingsForm>
      <HeaderUppercaseBold as="h2">Account info</HeaderUppercaseBold>
      <Row $gap="8px">
        <Column $gap="4px">
          <InputWithLabel
            id="first-name"
            title="First Name"
            type="text"
            placeholder="John"
          />
        </Column>

        <Column $gap="4px">
          <InputWithLabel
            id="last-name"
            title="Last Name"
            type="text"
            placeholder="Doe"
          />
        </Column>
      </Row>

      <InputWithLabel
        id="billing"
        title="Billing Address"
        type="text"
        placeholder="21st Jump Street"
      />

      <InputWithLabel
        id="city"
        title="City"
        type="text"
        placeholder="New York"
      />

      <InputWithLabel
        id="zip"
        title="Zip or Postal Code"
        type="text"
        placeholder="10001"
      />

      <InputWithLabel
        id="country"
        title="Country"
        type="text"
        placeholder="Nigeria"
      />

      <InputWithLabel
        id="phone"
        title="Phone Number"
        type="text"
        placeholder="+234 123 456 7890"
      />

      <Button $color="orange" $shape="rectangle" $size="medium">
        Save Changes
      </Button>
    </SettingsForm>
  );
};
