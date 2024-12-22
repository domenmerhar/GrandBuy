import { Header } from "./Header";
import { Row } from "./Row";
import { Filter } from "./Filter";
import { IOption } from "./types";
import { Select } from "./Select";
import { FC } from "react";

interface RefundPageHeaderProps {
  headerText: string;
  selectOptions?: IOption[];
  filterOptions?: IOption[];
}

export const FilterSortHeader: FC<RefundPageHeaderProps> = ({
  headerText,
  filterOptions,
  selectOptions,
}) => {
  return (
    <Row
      $justifyContent="space-between"
      $alignItems="center"
      $flexWrap="wrap"
      $gap="2rem"
    >
      <Header as="h2" $size="medium" $color="orange">
        {headerText}
      </Header>

      <Row $gap="12px" $alignItems="center">
        {filterOptions && filterOptions.length ? (
          <Filter options={filterOptions} />
        ) : null}
        {selectOptions && selectOptions.length ? (
          <Select options={selectOptions} />
        ) : null}
      </Row>
    </Row>
  );
};