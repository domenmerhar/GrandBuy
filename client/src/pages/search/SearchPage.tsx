import { IOption } from "../../Util/types";
import { Select } from "../../Util/Select";
import { SearchSidebar } from "./SearchSidebar";
import { ContentWithSidebar } from "../../Util/ContentWithSidebar";
import { SidebarLayout } from "../../Util/SidebarLayout";
import { SearchResults } from "./SearchResults";

const selectOptions: IOption[] = [
  { name: "Sort by most orders", value: "-orders" },
  { name: "Sort by least orders", value: "orders" },
  { name: "Sort by most expensive", value: "-totalPrice" },
  { name: "Sort by cheapest", value: "+totalPrice" },
  { name: "Sort by date (youngest)", value: "-createdAt" },
  { name: "Sort by date (oldest)", value: "+createdAt" },
];

export const SearchPage = () => {
  return (
    <SidebarLayout>
      <SearchSidebar />
      <ContentWithSidebar>
        <Select options={selectOptions} />

        <SearchResults />
      </ContentWithSidebar>
    </SidebarLayout>
  );
};
