import styled from "styled-components";
import { BlankCard } from "../../Util/BlankCard";
import { Input } from "../../Util/Input";
import { useAuthContext } from "../../contexts/AuthContext";
import { useApplyCoupon } from "../../hooks/cart/useApplyCoupon";

const InputHolder = styled(BlankCard)`
  display: flex;
  flex-direction: column;
`;

export const CouponInput = () => {
  const [{ JWT }] = useAuthContext();
  const { mutate } = useApplyCoupon();

  return (
    <InputHolder>
      <Input
        placeholder="Coupon Code"
        onBlur={(e) => {
          console.log(e.target.value);
          if (!e.target.value) return;

          mutate({ JWT, couponCode: e.target.value });
        }}
      />
    </InputHolder>
  );
};
