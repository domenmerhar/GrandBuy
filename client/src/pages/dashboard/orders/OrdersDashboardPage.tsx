import { Button } from "../../../Util/Button";
import { FilterSortHeader } from "../../../Util/FilterSortHeader";
import { Stepper } from "../../../Util/Stepper";
import { Table } from "../../../Components/Table";
import { Badge } from "../../../Util/Badge";

const filterOptions = [
  { value: "all", name: "All" },
  { value: "pending", name: "Pending" },
  { value: "shipped", name: "Shipped" },
  { value: "cancelled", name: "Cancelled" },
  { value: "delivered", name: "Delivered" },
];

const selectOptions = [
  { value: "all", name: "All" },
  { value: "oldest", name: "Sort by age (oldest)" },
  { value: "newest", name: "Sort by age (newest)" },
];

const headers = ["Username", "Quantity", "Product", "Status", ""];

export const OrdersDashboardPage = () => {
  return (
    <>
      <FilterSortHeader
        headerText="Orders"
        filterOptions={filterOptions}
        selectOptions={selectOptions}
      />

      <Table headers={headers}>
        <Table.Row>
          <td>John Doe</td>
          <td>2</td>
          <td>Product 1</td>
          <td>
            <Badge $color="green" $size="small">
              Shipped
            </Badge>
          </td>
          <td></td>
        </Table.Row>

        <Table.Row>
          <td>John Doe</td>
          <td>2</td>
          <td>Product 1</td>
          <td>
            <Badge $color="red" $size="small">
              Cancelled
            </Badge>
          </td>
          <td></td>
        </Table.Row>

        <Table.Row>
          <td>John Doe</td>
          <td>2</td>
          <td>Product 1</td>
          <td>Pending</td>
          <td>
            <Button $color="orange" $shape="oval" $size="small">
              Respond
            </Button>
          </td>
        </Table.Row>
      </Table>

      <Stepper searchParamName="page" />
    </>
  );
};
