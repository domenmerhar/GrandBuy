import { HiOutlinePlus } from "react-icons/hi";
import { Header } from "../../../Util/Header";
import { Row } from "../../../Util/Row";
import { Select } from "../../../Util/Select";
import { SquareButton } from "../../../Util/SquareButton";

const selectOptions = [
  { value: "newest", name: "Sort by age (newest)" },
  { value: "oldest", name: "Sort by age (oldest)" },
  { value: "highest", name: "Sort by highest discount" },
  { value: "lowest", name: "Sort by lowest discount" },
];

export const CouponPageHeader = () => {
  return (
    <>
      <Row
        $justifyContent="space-between"
        $flexWrap="wrap"
        $alignItems="center"
      >
        <Header as="h1" $color="orange" $size="medium">
          Coupons
        </Header>

        <Row $gap="1.6rem" $alignItems="center" $flexWrap="wrap">
          <Select searchParam="sort" options={selectOptions} />
          <SquareButton $color="orange" $size="medium">
            <HiOutlinePlus size={32} color="#f1f3f5" />
          </SquareButton>
        </Row>
      </Row>
    </>
  );
};
