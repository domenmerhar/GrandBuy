import { HiOutlinePlus } from "react-icons/hi";
import { Header } from "../../../Util/Header";
import { Row } from "../../../Util/Row";
import { Select } from "../../../Util/Select";
import { SquareButton } from "../../../Util/SquareButton";
import { useTranslation } from "react-i18next";
import { Modal } from "../../../Util/Modal";
import CouponModal from "./CouponModal";

export const CouponPageHeader = () => {
  const { t } = useTranslation();

  const { setIsOpen } = Modal.useModalContext();

  const selectOptions = [
    { value: "newest", name: t("sortByDateNewest") },
    { value: "oldest", name: t("sortByDateOldest") },
    { value: "highest", name: t("sortByDiscountHighest") },
    { value: "lowest", name: t("sortByDiscountLowest") },
  ];

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Row
        $justifyContent="space-between"
        $flexWrap="wrap"
        $alignItems="center"
      >
        <Header as="h1" $color="orange" $size="medium">
          {t("coupons")}
        </Header>

        <Row $gap="1.6rem" $alignItems="center" $flexWrap="wrap">
          <Select searchParam="sort" options={selectOptions} />
          <SquareButton $color="orange" $size="medium" onClick={handleClick}>
            <HiOutlinePlus size={32} color="#f1f3f5" />
          </SquareButton>
        </Row>
      </Row>

      <CouponModal />
    </>
  );
};
