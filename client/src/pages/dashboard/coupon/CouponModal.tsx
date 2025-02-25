import { useTranslation } from "react-i18next";
import { Modal } from "../../../Util/Modal";
import { InputWithLabel } from "../../../Util/InputWithLabel";
import { Column } from "../../../Util/Column";
import styled from "styled-components";
import { useState } from "react";
import CouponModalProducts from "./CouponModalProducts";
import toast from "react-hot-toast";
import useCreateCouponSeller from "../../../hooks/coupon/useCreateCouponSeller";
import { useJWT } from "../../../hooks/useJWT";

const InputHolder = styled(Column)`
  & input {
    margin-bottom: 8px;
  }

  & input:nth-of-type(3) {
    margin-bottom: 16px;
  }
`;

const oneWeekInFuture = () => Date.now() + 7 * 24 * 60 * 60 * 1000;

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function CouponModal() {
  const { t } = useTranslation();
  const { closeModal } = Modal.useModalContext();
  const { mutate: createCoupon } = useCreateCouponSeller();
  const { JWT } = useJWT();

  const [code, setCode] = useState<string>("");
  const [discount, setDiscount] = useState<number | "">();
  const [expireAt, setExpireAt] = useState<number>(oneWeekInFuture());
  const [productIds, setProductIds] = useState<string[]>([]);

  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20) return;
    setCode(e.target.value.toUpperCase());
  };

  const handleChangeDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 100) return;
    if (!e.target.value) return setDiscount("");

    const updatedValue = Number(e.target.value.replace(/^0{1,2}/, ""));
    setDiscount(updatedValue);
  };

  const handleChangeValidUntil = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.valueAsDate || e.target.valueAsDate < new Date())
      return setExpireAt(oneWeekInFuture());

    setExpireAt(e.target.valueAsDate.getTime());
  };

  const handleClose = () => {
    setCode("");
    setDiscount("");
    setExpireAt(oneWeekInFuture());
    setProductIds([]);
    closeModal();
  };

  const handleCreate = () => {
    if (
      !code?.length ||
      code.length > 20 ||
      discount === 0 ||
      !discount ||
      !expireAt ||
      expireAt < Date.now() ||
      !productIds.length
    )
      return toast.error(t("invalidData"), { id: "coupon" });

    createCoupon({
      JWT,
      code,
      discount,
      expireAt: new Date(expireAt),
      products: productIds,
    });
    t("couponCreated");

    handleClose();
  };

  return (
    <Modal.Window
      title={t("addCoupon")}
      buttons={[
        {
          key: "cancel",
          color: "red",
          text: t("cancel"),
          onClick: handleClose,
        },
        {
          key: "create",
          color: "green",
          text: t("create"),
          onClick: handleCreate,
        },
      ]}
    >
      <InputHolder $alignItems="flex-start">
        <InputWithLabel
          id="code"
          title={t("code")}
          minLength={1}
          maxLength={20}
          placeholder="ABCD"
          onChange={handleChangeCode}
          value={code}
          error={Boolean(code && code.length < 4)}
        />

        <InputWithLabel
          id="discount"
          title={`${t("discount")}(%)`}
          placeholder="50"
          type="number"
          max={100}
          min={1}
          onChange={handleChangeDiscount}
          value={discount}
          error={Boolean(discount === 0)}
        />

        <InputWithLabel
          id="valid-until"
          title={t("validUntil")}
          type="date"
          value={formatDate(expireAt)}
          onChange={handleChangeValidUntil}
          min={formatDate(Date.now())}
        />
      </InputHolder>

      <CouponModalProducts
        productIds={productIds}
        setProductIds={setProductIds}
      />
    </Modal.Window>
  );
}
