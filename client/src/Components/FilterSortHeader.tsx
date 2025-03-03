import { Header } from "../Util/Header";
import { Row } from "../Util/Row";
import { Filter } from "./Filter";
import { IOption } from "../Util/types";
import { Select } from "./Select";
import { FC } from "react";

interface RefundPageHeaderProps {
  headerText: string;
  selectOptions?: IOption[];
  filterOptions?: IOption[];
}

/**
 * FilterSortHeader komponenta za prikaz naslova strani z možnostmi filtriranja in sortiranja.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {string} props.headerText - Besedilo naslova strani.
 * @param {IOption[]} [props.selectOptions] - Niz možnosti za izbirni meni (sortiranje).
 * @param {IOption[]} [props.filterOptions] - Niz možnosti za filtre.
 * @returns {JSX.Element} - JSX element naslova strani z možnostmi filtriranja in sortiranja.
 *
 * @example
 * // Uporaba komponente
 * <FilterSortHeader
 * headerText="Vračila"
 * filterOptions={[
 * { name: 'Vsi', value: 'all' },
 * { name: 'Odobreni', value: 'approved' },
 * { name: 'Zavrnjeni', value: 'rejected' },
 * ]}
 * selectOptions={[
 * { name: 'Najnovejši', value: 'newest' },
 * { name: 'Najstarejši', value: 'oldest' },
 * ]}
 * />
 */

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

      <Row $gap="12px" $alignItems="center" $flexWrap="wrap">
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
