import { FC } from "react";
import { BlankCard } from "./BlankCard";
import { Column } from "./Column";
import { HeaderUppercaseBold } from "./HeaderUppercaseBold";
import { Row } from "./Row";

interface ProductsCardProps {
  title: string;
  itemCount: number;
  children: React.ReactNode | React.ReactNode[] | null;
}

export const ProductsCard: FC<ProductsCardProps> = ({
  title,
  itemCount,
  children,
}) => {
  return (
    <BlankCard>
      <Column $gap="1.6rem">
        <Row $justifyContent="space-between">
          <HeaderUppercaseBold>{title}</HeaderUppercaseBold>
          Items({itemCount})
        </Row>
        {children}
      </Column>
    </BlankCard>
  );
};
