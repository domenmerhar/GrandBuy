import { FormEvent, useRef } from "react";
import { Button } from "../../Util/Button";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { SettingsForm } from "./SettingsForm";
import toast from "react-hot-toast";
import { useChangePassword } from "../../hooks/useChangePassword";
import { useAuthContext } from "../../contexts/AuthContext";

export const PasswordSection = () => {
  const [{ JWT }] = useAuthContext();
  const { mutate } = useChangePassword();
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!passwordRef.current?.value || !confirmPasswordRef.current?.value)
      return toast.error("Please fill in all fields", { id: "changePassword" });

    if (passwordRef.current.value !== confirmPasswordRef.current.value)
      return toast.error("Passwords do not match", { id: "changePassword" });

    mutate({
      JWT,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    });
  };

  return (
    <SettingsForm onSubmit={handleSubmit}>
      <HeaderUppercaseBold as="h2">Password</HeaderUppercaseBold>

      <InputWithLabel
        id="password"
        title="Password"
        type="password"
        placeholder="********"
        ref={passwordRef}
      />

      <InputWithLabel
        id="confirm-password"
        title="Confirm Password"
        type="password"
        placeholder="********"
        ref={confirmPasswordRef}
      />

      <Button $color="orange" $shape="rectangle" $size="medium">
        Change Password
      </Button>
    </SettingsForm>
  );
};
