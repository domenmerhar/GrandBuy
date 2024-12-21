import styled from "styled-components";
import { Content } from "../../Util/Content";
import { RefundCard } from "./RefundCard";
import { IOption } from "../../Util/types";
import { FilterSortHeader } from "../../Util/FilterSortHeader";

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
  return (
    <Content>
      <FilterSortHeader
        headerText="Refund requests"
        filterOptions={filterOptions}
        selectOptions={selectOptions}
      />
      <Grid>
        <RefundCard />
        <RefundCard />
        <RefundCard />
        <RefundCard />
      </Grid>
    </Content>
  );
};
