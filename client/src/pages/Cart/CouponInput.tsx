import styled from "styled-components";
import { BlankCard } from "../../Util/BlankCard";
import { Input } from "../../Util/Input";

const InputHolder = styled(BlankCard)`
  display: flex;
  flex-direction: column;
`;

export const CouponInput = () => {
  return (
    <InputHolder>
      <Input placeholder="Coupon Code" />
    </InputHolder>
  );
};
