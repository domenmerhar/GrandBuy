import styled from "styled-components";
import { BlankCard } from "../../Util/BlankCard";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { SummaryRow } from "./SummaryRow";
import { useGetCartItemsSummary } from "../../hooks/cart/useGetCartItemsSummary";
import { toPrice } from "../../functions/toPrice";
import { SpinnerInBox } from "../../Components/SpinnerInBox";
import { useTranslation } from "react-i18next";

const StyledOrderSummary = styled(BlankCard)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Hr = styled.hr`
  background-color: var(--gray-8);
`;

/**
 * Komponenta za prikaz povzetka naročila.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja povzetek naročila.
 *
 * @example
 * // Uporaba komponente
 * <OrderSummary />
 */

export const OrderSummary = () => {
  const { t } = useTranslation();

  const { data, isLoading } = useGetCartItemsSummary();

  const items = data?.data?.items || 0;
  const shipping = data?.data?.shipping || 0;
  const discount = data?.data?.discount || 0;
  const total = data?.data?.total || 0;

  if (isLoading)
    return (
      <StyledOrderSummary>
        <SpinnerInBox fullPage={false} />
      </StyledOrderSummary>
    );

  return (
    <StyledOrderSummary>
      <HeaderUppercaseBold>{t("summary")}</HeaderUppercaseBold>

      <SummaryRow name={t("items")} price={toPrice(items, "USD")} />
      <SummaryRow name={t("shipping")} price={toPrice(shipping, "USD")} />
      <SummaryRow name={t("coupons")} price={toPrice(discount, "USD")} />
      <Hr />
      <SummaryRow name={t("total")} price={toPrice(total, "USD")} />
    </StyledOrderSummary>
  );
};
