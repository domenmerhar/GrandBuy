import { HiOutlinePlus } from "react-icons/hi";
import { Header } from "../../../Util/Header";
import { Row } from "../../../Util/Row";
import { Select } from "../../../Components/Select";
import { SquareButton } from "../../../Util/SquareButton";
import { useTranslation } from "react-i18next";
import { Modal } from "../../../Components/Modal";

/**
 * Komponenta za prikaz glave strani s kuponi.
 *
 * @component
 * @returns {JSX.Element} JSX element, ki predstavlja glavo strani s kuponi.
 *
 * @example
 * // Uporaba komponente
 * <CouponPageHeader />
 */

export const CouponPageHeader = () => {
  const { t } = useTranslation();

  const { setIsOpen } = Modal.useModalContext();

  const selectOptions = [
    { value: "newest", name: t("sortByDateNewest") },
    { value: "oldest", name: t("sortByDateOldest") },
    { value: "discount-highest", name: t("sortByDiscountHighest") },
    { value: "discount-lowest", name: t("sortByDiscountLowest") },
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
    </>
  );
};
