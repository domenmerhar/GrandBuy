import { Modal } from "../../../Util/Modal";
import { CouponOverview } from "./CouponOverview";
import { CouponPageHeader } from "./CouponPageHeader";
import { Coupons } from "./Coupons";

export const CouponPage = () => {
  return (
    <Modal>
      <CouponPageHeader />
      <CouponOverview />
      <Coupons />
    </Modal>
  );
};
