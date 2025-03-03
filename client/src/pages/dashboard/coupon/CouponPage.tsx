import { useState } from "react";
import { Modal } from "../../../Components/Modal";
import CouponModal from "./CouponModal";
import { CouponOverview } from "./CouponOverview";
import { CouponPageHeader } from "./CouponPageHeader";
import { Coupons } from "./Coupons";
import oneWeekInFuture from "../../../functions/oneWeekInFuture";

/**
 * Komponenta za prikaz strani s kuponi.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja stran s kuponi.
 *
 * @example
 * // Uporaba komponente
 * <CouponPage />
 */

export const CouponPage = () => {
  const [code, setCode] = useState<string>("");
  const [discount, setDiscount] = useState<number | "">("");
  const [expireAt, setExpireAt] = useState<number>(oneWeekInFuture());
  const [productIds, setProductIds] = useState<string[]>([]);

  return (
    <Modal>
      <CouponPageHeader />
      <CouponOverview />
      <Coupons
        setCode={setCode}
        setDiscount={setDiscount}
        setExpireAt={setExpireAt}
        setProductIds={setProductIds}
      />

      <CouponModal
        code={code}
        setCode={setCode}
        discount={discount}
        setDiscount={setDiscount}
        expireAt={expireAt}
        setExpireAt={setExpireAt}
        productIds={productIds}
        setProductIds={setProductIds}
      />
    </Modal>
  );
};
