import { useMe } from "../../hooks/useMe";
import { Button } from "../../Util/Button";
import { Column } from "../../Util/Column";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { Row } from "../../Util/Row";
import { UserSettings } from "../../Util/types";
import { SettingsForm } from "./SettingsForm";

export const AccountSection = () => {
  const { data }: { data: { data: UserSettings } } = useMe();

  return (
    <SettingsForm>
      <HeaderUppercaseBold as="h2">Account info</HeaderUppercaseBold>
      <Row $gap="8px">
        <Column $gap="4px">
          <InputWithLabel
            id="first-name"
            title="First Name"
            type="text"
            placeholder={data?.data?.firstName}
          />
        </Column>

        <Column $gap="4px">
          <InputWithLabel
            id="last-name"
            title="Last Name"
            type="text"
            placeholder={data?.data?.lastName}
          />
        </Column>
      </Row>

      <InputWithLabel
        id="billing"
        title="Billing Address"
        type="text"
        placeholder={data?.data?.street}
      />

      <InputWithLabel
        id="city"
        title="City"
        type="text"
        placeholder={data?.data?.city}
      />

      <InputWithLabel
        id="zip"
        title="Zip or Postal Code"
        type="text"
        placeholder={data?.data?.zipCode}
      />

      <InputWithLabel
        id="country"
        title="Country"
        type="text"
        placeholder={data?.data?.country}
      />

      <InputWithLabel
        id="phone"
        title="Phone Number"
        type="text"
        placeholder={data?.data?.phoneNumber}
      />

      <Button $color="orange" $shape="rectangle" $size="medium">
        Save Changes
      </Button>
    </SettingsForm>
  );
};
