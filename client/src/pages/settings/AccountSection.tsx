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

export const AccountSection = () => {
  const { data }: { data: { data: UserSettings } } = useMe();
  const { mutate } = useUpdateMe();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const billingAddressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !firstNameRef.current?.value &&
      !lastNameRef.current?.value &&
      !billingAddressRef.current?.value &&
      !cityRef.current?.value &&
      !zipRef.current?.value &&
      !countryRef.current?.value &&
      !phoneNumberRef.current?.value
    )
      return toast.error("Please fill in at least one field");

    mutate({
      JWT: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGQ0YmQyMjQwYTgwMGI4N2MxM2Q5ZSIsImlhdCI6MTczNjY3MDk2ODE0NSwiZXhwIjoxNzM2Njc4NzQ0MTQ1fQ.xgGa9u6_hV32w8YyavsmMMVOau8EGkbXb6rxTT3JNkY",
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      street: billingAddressRef.current?.value,
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
        id="billing"
        title="Billing Address"
        type="text"
        placeholder={data?.data?.street}
        ref={billingAddressRef}
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
