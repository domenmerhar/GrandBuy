import { Hero } from "../../Components/Hero";
import { SaleSection } from "./SaleSection";
import HorizontalProducts from "./HorizontalProducts.tsx";
import { SkewedContainer } from "./SkewedContainer";
import { Under50 } from "./Under50.tsx";
import { Row } from "../../Util/Row.tsx";
import { FreeShipping } from "./FreeShipping.tsx";

export const MainPage = () => {
  return (
    <>
      <Hero />

      <SkewedContainer>
        <SaleSection />
        <Row $gap="3.2rem" $flexWrap="wrap">
          <Under50 />
          <FreeShipping />
        </Row>
        {/* <HorizontalProducts /> */}
      </SkewedContainer>
    </>
  );
};
