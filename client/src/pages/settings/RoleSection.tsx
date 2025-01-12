import { FormEvent } from "react";
import { Button } from "../../Util/Button";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { Modal } from "../../Util/Modal";
import { SettingsForm } from "./SettingsForm";
import { useMe } from "../../hooks/useMe";
import { UserSettings } from "../../Util/types";

export const RoleSection = () => {
  const { setIsOpen } = Modal.useModalContext();
  const { data }: { data: { data: UserSettings } } = useMe();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <>
      <SettingsForm onSubmit={handleSubmit}>
        <HeaderUppercaseBold as="h2">Role</HeaderUppercaseBold>

        <InputWithLabel
          id="role"
          title="Role"
          type="text"
          placeholder={data?.data?.role}
          disabled={true}
        />

        <Button $color="orange" $shape="rectangle" $size="medium">
          Request Seller
        </Button>
      </SettingsForm>

      <Modal.Window title="Test">
        After the requests approval you won’t be able to post a review on a
        product anymore.
      </Modal.Window>
    </>
  );
};
