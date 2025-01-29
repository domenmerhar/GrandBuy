import styled from "styled-components";
import { Content } from "../../Util/Content";
import { RefundCard } from "./RefundCard";
import { IOption, IRefundPage, Refund } from "../../Util/types";
import { FilterSortHeader } from "../../Util/FilterSortHeader";
import { useInfinite } from "../../hooks/useInfinite";
import { getUserRefunds } from "../../api/refund/getUserRefunds";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import { InfiniteProducts } from "../../Components/InfiniteProducts";
import { useMe } from "../../hooks/useMe";

const selectOptions: IOption[] = [
  { value: "oldest", name: "Sort by age (oldest)" },
  { value: "newest", name: "Sort by age (newest)" },
];

const filterOptions: IOption[] = [
  { value: "all", name: "All" },
  { value: "pending", name: "Pending" },
  { value: "approved", name: "Approved" },
  { value: "rejected", name: "Rejected" },
];

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 42rem));
  justify-content: space-between;

  row-gap: 3.2rem;
  margin-top: 3.2rem;
`;

export const RefundPage = () => {
  const [searchParams] = useSearchParams();
  const { JWT } = useAuthContext();
  const { data: dataUser } = useMe();

  const userId = dataUser?.data?._id;

  const filter = searchParams.get("filter") || "all";
  const sort =
    searchParams.get("sort") === "+createdAt" ? "+createdAt" : "-createdAt";

  const data = useInfinite({
    queryKey: ["userRefunds", userId, filter, sort],
    queryFn: ({ pageParam }) => {
      if (pageParam === null) return;

      return getUserRefunds({
        JWT,
        page: Number(pageParam),
        sort,
      });
    },
  });

  return (
    <Content>
      <FilterSortHeader
        headerText="Refund requests"
        filterOptions={filterOptions}
        selectOptions={selectOptions}
      />

      <InfiniteProducts
        {...data}
        container={Grid}
        renderFn={(page: IRefundPage) =>
          page.data.refunds.map(
            ({
              _id,
              createdAt,
              reason,
              cartItemId,
              status,
              seller,
            }: Refund) => <RefundCard key={_id} />
          )
        }
      />
      {/* <Grid>
        <RefundCard />
        <RefundCard />
        <RefundCard />
        <RefundCard />
      </Grid> */}
    </Content>
  );
};
