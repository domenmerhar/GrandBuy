import { Column } from "../../Util/Column";
import { Header } from "../../Util/Header";
import { Row } from "../../Util/Row";
import { Under50 } from "./Under50";
import { FreeShipping } from "./FreeShipping";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledForYouSection = styled(Column)`
  margin-bottom: 3.2rem;
`;

export const ForYouSection = () => {
  const { t } = useTranslation();

  return (
    <StyledForYouSection>
      <Header $color="orange" $size="medium" as="h2">
        {t("designedForYou")}
      </Header>
      <Row $gap="3.2rem" $flexWrap="wrap">
        <Under50 />
        <FreeShipping />
      </Row>
    </StyledForYouSection>
  );
};
