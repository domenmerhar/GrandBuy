import styled from "styled-components";
import { Content } from "../../Util/Content";
import {
  IOption,
  IRefundPage,
  RefundStatus,
  RefundUser,
} from "../../Util/types";
import { FilterSortHeader } from "../../Components/FilterSortHeader";
import { useInfinite } from "../../hooks/useInfinite";
import { getUserRefunds } from "../../api/refund/getUserRefunds";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import { InfiniteProducts } from "../../Components/InfiniteProducts";
import { useMe } from "../../hooks/useMe";
import { RefundCardUser } from "./RefundCardUser";
import { toDate } from "../../functions/toDate";
import { useTranslation } from "react-i18next";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 42rem));
  justify-content: space-between;

  row-gap: 3.2rem;
  margin-top: 3.2rem;
`;

/**
 * Komponenta za prikaz strani z zahtevami za vračilo.
 *
 * @function
 * @returns {JSX.Element} JSX element, ki predstavlja stran z zahtevami za vračilo.
 *
 * @example
 * // Uporaba komponente
 * <RefundPage />
 */

export const RefundPage = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const { JWT } = useAuthContext();
  const { data: dataUser } = useMe();

  const userId = dataUser?.data?._id;

  const filter =
    searchParams.get("filter") !== "all"
      ? (searchParams.get("filter") as RefundStatus)
      : undefined;
  const sort =
    searchParams.get("sort") === "youngest" ? "+createdAt" : "-createdAt";

  const data = useInfinite({
    queryKey: ["userRefunds", userId, filter, sort],
    queryFn: ({ pageParam }) => {
      if (pageParam === null) return;

      return getUserRefunds({
        JWT,
        page: Number(pageParam),
        sort,
        status: filter,
      });
    },
  });

  const selectOptions: IOption[] = [
    { value: "oldest", name: t("sortByDateOldest") },
    { value: "newest", name: t("sortByDateNewest") },
  ];

  const filterOptions: IOption[] = [
    { value: "all", name: t("all") },
    { value: "pending", name: t("pending") },
    { value: "approved", name: t("approved") },
    { value: "rejected", name: t("rejected") },
  ];

  return (
    <Content>
      <FilterSortHeader
        headerText={t("refundRequests")}
        filterOptions={filterOptions}
        selectOptions={selectOptions}
      />

      <InfiniteProducts
        {...data}
        container={Grid}
        renderFn={(page: IRefundPage) =>
          page?.data?.refunds.map(
            ({ _id, createdAt, reason, cartItemId, status }: RefundUser) => (
              <RefundCardUser
                key={_id}
                date={toDate(createdAt)}
                productName={cartItemId?.name}
                quantity={cartItemId?.quantity}
                reason={reason}
                status={status}
              />
            )
          )
        }
      />
    </Content>
  );
};
