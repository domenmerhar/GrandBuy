import { FormEvent } from "react";
import { Button } from "../../Util/Button";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { Modal } from "../../Util/Modal";
import { AccountForm } from "./AccountForm";

export const RoleSection = () => {
  const { setIsOpen } = Modal.useModalContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <>
      <AccountForm onSubmit={handleSubmit}>
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

      <Modal.Window title="Test">
        After the requests approval you won’t be able to post a review on a
        product anymore.
      </Modal.Window>
    </>
  );
};
