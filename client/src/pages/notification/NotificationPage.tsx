import styled from "styled-components";
import { Content } from "../../Util/Content";
import { FilterSortHeader } from "../../Util/FilterSortHeader";
import { NotificationCard } from "./NotificationCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 42rem));
  justify-content: space-between;

  row-gap: 3.2rem;
  margin-top: 3.2rem;
`;

export const NotificationPage = () => {
  return (
    <Content>
      <FilterSortHeader
        headerText="Notifications"
        filterOptions={[
          { value: "all", name: "All" },
          { value: "message", name: "Message" },
          { value: "warning", name: "Warning" },
        ]}
        selectOptions={[
          { name: "Sort by age (oldest)", value: "oldest" },
          { name: "Sort by age (newest)", value: "newest" },
        ]}
      />
      <Grid>
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
      </Grid>
    </Content>
  );
};
