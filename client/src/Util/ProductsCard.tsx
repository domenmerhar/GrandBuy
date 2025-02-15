import { FC } from "react";
import { BlankCard } from "./BlankCard";
import { Column } from "./Column";
import { HeaderUppercaseBold } from "./HeaderUppercaseBold";
import { Row } from "./Row";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <BlankCard>
      <Column $gap="1.6rem">
        <Row $justifyContent="space-between">
          <HeaderUppercaseBold>{title}</HeaderUppercaseBold>
          {t("items")} ({itemCount})
        </Row>
        {children}
      </Column>
    </BlankCard>
  );
};
