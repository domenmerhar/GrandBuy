import { FC } from "react";
import { BlankCard } from "../../Util/BlankCard";
import { Column } from "../../Util/Column";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { Row } from "../../Util/Row";
import { useTranslation } from "react-i18next";

interface ProductsCardProps {
  title: string;
  itemCount: number;
  children: React.ReactNode | React.ReactNode[] | null;
}

/**
 * ProductsCard komponenta za prikaz kartice s seznamom izdelkov.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {string} props.title - Naslov kartice.
 * @param {number} props.itemCount - Število elementov v seznamu.
 * @param {React.ReactNode | React.ReactNode[] | null} props.children - Vsebina kartice.
 * @returns {JSX.Element} - JSX element kartice s seznamom izdelkov.
 *
 * @example
 * // Uporaba komponente
 * <ProductsCard title="Priljubljeni izdelki" itemCount={5}>
 * <div>...</div>
 * </ProductsCard>
 */

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
