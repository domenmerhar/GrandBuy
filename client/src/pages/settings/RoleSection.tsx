import { FormEvent } from "react";
import { Button } from "../../Util/Button";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { Modal } from "../../Util/Modal";
import { SettingsForm } from "./SettingsForm";
import { useMe } from "../../hooks/useMe";
import { UserSettings } from "../../Util/types";
import { useRequestSeller } from "../../hooks/useRequestSeller";
import { useAuthContext } from "../../contexts/AuthContext";

export const RoleSection = () => {
  const [{ JWT }] = useAuthContext();
  const { setIsOpen } = Modal.useModalContext();
  const { data }: { data: { data: UserSettings } } = useMe();
  const { mutate } = useRequestSeller();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleModal = () => mutate(JWT);

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

      <Modal.Window title="Request Seller" onSubmitApprove={handleModal}>
        Are you sure? You won't be able to revert this decision.
      </Modal.Window>
    </>
  );
};
