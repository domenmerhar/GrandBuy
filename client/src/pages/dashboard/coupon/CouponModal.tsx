import { useTranslation } from "react-i18next";
import { Modal } from "../../../Components/Modal";
import { InputWithLabel } from "../../../Components/InputWithLabel";
import { Column } from "../../../Util/Column";
import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import CouponModalProducts from "./CouponModalProducts";
import toast from "react-hot-toast";
import useCreateCouponSeller from "../../../hooks/coupon/useCreateCouponSeller";
import { useJWT } from "../../../hooks/useJWT";
import oneWeekInFuture from "../../../functions/oneWeekInFuture";
import { useSearchParams } from "react-router-dom";
import useUpdateCouponSeller from "../../../hooks/coupon/useUpdateCouponSeller";

const InputHolder = styled(Column)`
  & input {
    margin-bottom: 8px;
  }

  & input:nth-of-type(3) {
    margin-bottom: 16px;
  }
`;

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

interface CouponModalProps {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;

  discount: number | "" | undefined;
  setDiscount: Dispatch<SetStateAction<number | "">>;

  expireAt: number;
  setExpireAt: Dispatch<SetStateAction<number>>;

  productIds: string[];
  setProductIds: Dispatch<SetStateAction<string[]>>;
}

/**
 * Komponenta za upravljanje kuponov v modalnem oknu.
 *
 * @function
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.code - Koda kupona.
 * @param {Function} props.setCode - Funkcija za nastavitev kode kupona.
 * @param {number | "" | undefined} props.discount - Popust kupona v odstotkih.
 * @param {Function} props.setDiscount - Funkcija za nastavitev popusta kupona.
 * @param {number} props.expireAt - Datum veljavnosti kupona.
 * @param {Function} props.setExpireAt - Funkcija za nastavitev datuma veljavnosti kupona.
 * @param {string[]} props.productIds - Seznam ID-jev izdelkov, na katere kupon vpliva.
 * @param {Function} props.setProductIds - Funkcija za nastavitev ID-jev izdelkov, na katere kupon vpliva.
 * @returns {JSX.Element} JSX element, ki predstavlja modalno okno za upravljanje kuponov.
 *
 * @example
 * // Uporaba komponente
 * <CouponModal
 *   code="SAVE20"
 *   setCode={() => {}}
 *   discount={20}
 *   setDiscount={() => {}}
 *   expireAt={Date.now()}
 *   setExpireAt={() => {}}
 *   productIds={["1", "2"]}
 *   setProductIds={() => {}}
 * />
 */

export default function CouponModal({
  code,
  setCode,

  discount,
  setDiscount,

  expireAt,
  setExpireAt,

  productIds,
  setProductIds,
}: CouponModalProps) {
  const { t } = useTranslation();
  const { JWT } = useJWT();

  const [searchParams, setSearchParams] = useSearchParams();
  const { closeModal } = Modal.useModalContext();

  const { mutate: createCoupon } = useCreateCouponSeller();
  const { mutate: updateCoupon } = useUpdateCouponSeller();

  const couponId = searchParams.get("coupon-id");

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

    setSearchParams((prev) => {
      prev.delete("coupon-id");
      return prev;
    });

    closeModal();
  };

  const validateData = (callback: () => unknown) => () => {
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

    callback();
    handleClose();
  };

  const handleCreate = validateData(() => {
    createCoupon({
      JWT,
      code,
      discount: Number(discount)!,
      expireAt: new Date(expireAt),
      products: productIds,
    });
  });

  const handleEdit = validateData(() => {
    updateCoupon({
      JWT,
      couponId: couponId!,
      discount: Number(discount)!,
      expireAt: new Date(expireAt),
      products: productIds,
    });
  });

  return (
    <Modal.Window
      title={t("addCoupon")}
      onClose={handleClose}
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
          text: couponId ? t("edit") : t("create"),
          onClick: couponId ? handleEdit : handleCreate,
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
          error={Boolean(code && code.length > 20)}
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
