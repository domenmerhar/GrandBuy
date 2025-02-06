import { CouponOverview } from "./CouponOverview";
import { CouponPageHeader } from "./CouponPageHeader";
import { Coupons } from "./Coupons";

export const CouponPage = () => {
  return (
    <>
      <CouponPageHeader />
      <CouponOverview />
      <Coupons />
    </>
  );
};
