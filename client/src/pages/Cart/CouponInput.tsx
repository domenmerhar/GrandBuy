import styled from "styled-components";
import { BlankCard } from "../../Util/BlankCard";
import { Input } from "../../Util/Input";
import { useAuthContext } from "../../contexts/AuthContext";
import { useApplyCoupon } from "../../hooks/cart/useApplyCoupon";
import { useTranslation } from "react-i18next";

const InputHolder = styled(BlankCard)`
  display: flex;
  flex-direction: column;
`;

export const CouponInput = () => {
  const { t } = useTranslation();

  const { JWT } = useAuthContext();
  const { mutate } = useApplyCoupon();

  return (
    <InputHolder>
      <Input
        placeholder={t("couponCode")}
        onBlur={(e) => {
          if (!e.target.value) return;

          mutate({ JWT, couponCode: e.target.value });
        }}
      />
    </InputHolder>
  );
};
