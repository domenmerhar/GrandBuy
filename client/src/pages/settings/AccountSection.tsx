import { FormEvent, useRef } from "react";
import { useMe } from "../../hooks/useMe";
import { Button } from "../../Util/Button";
import { Column } from "../../Util/Column";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { Row } from "../../Util/Row";
import { UserSettings } from "../../Util/types";
import { SettingsForm } from "./SettingsForm";
import { useUpdateMe } from "../../hooks/useUpdateMe";
import toast from "react-hot-toast";
import { useAuthContext } from "../../contexts/AuthContext";

export const AccountSection = () => {
  const { data }: { data: { data: UserSettings } } = useMe();
  const [{ JWT }] = useAuthContext();
  const { mutate } = useUpdateMe();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !firstNameRef.current?.value &&
      !lastNameRef.current?.value &&
      !streetRef.current?.value &&
      !cityRef.current?.value &&
      !zipRef.current?.value &&
      !countryRef.current?.value &&
      !phoneNumberRef.current?.value
    )
      return toast.error("Please fill in at least one field");

    mutate({
      JWT,
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      street: streetRef.current?.value,
      city: cityRef.current?.value,
      zipCode: zipRef.current?.value,
      country: countryRef.current?.value,
      phoneNumber: phoneNumberRef.current?.value,
    });
  };

  return (
    <SettingsForm onSubmit={handleSubmit}>
      <HeaderUppercaseBold as="h2">Account info</HeaderUppercaseBold>
      <Row $gap="8px">
        <Column $gap="4px">
          <InputWithLabel
            id="first-name"
            title="First Name"
            type="text"
            placeholder={data?.data?.firstName}
            ref={firstNameRef}
          />
        </Column>

        <Column $gap="4px">
          <InputWithLabel
            id="last-name"
            title="Last Name"
            type="text"
            placeholder={data?.data?.lastName}
            ref={lastNameRef}
          />
        </Column>
      </Row>

      <InputWithLabel
        id="street"
        title="Street Address"
        type="text"
        placeholder={data?.data?.street}
        ref={streetRef}
      />

      <InputWithLabel
        id="city"
        title="City"
        type="text"
        placeholder={data?.data?.city}
        ref={cityRef}
      />

      <InputWithLabel
        id="zip"
        title="Zip or Postal Code"
        type="text"
        placeholder={data?.data?.zipCode}
        ref={zipRef}
      />

      <InputWithLabel
        id="country"
        title="Country"
        type="text"
        placeholder={data?.data?.country}
        ref={countryRef}
      />

      <InputWithLabel
        id="phone"
        title="Phone Number"
        type="text"
        placeholder={data?.data?.phoneNumber}
        ref={phoneNumberRef}
      />

      <Button $color="orange" $shape="rectangle" $size="medium">
        Save Changes
      </Button>
    </SettingsForm>
  );
};
