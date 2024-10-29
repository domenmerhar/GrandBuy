import { Hero } from "../../Components/Hero";
import { CardMultipleItems } from "./CardMultipleItems";
import { SaleSection } from "./SaleSection";
import { SkewedContainer } from "./SkewedContainer";

export const MainPage = () => {
  return (
    <>
      <Hero />

      <SkewedContainer>
        <SaleSection />
        <CardMultipleItems />
      </SkewedContainer>
    </>
  );
};
