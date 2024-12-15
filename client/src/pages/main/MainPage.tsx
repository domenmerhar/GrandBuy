import { Hero } from "../../Components/Hero";
import { CardMultipleItems } from "./CardMultipleItems";
import { SaleSection } from "./SaleSection";
import SimpleExample from "./SimpleExample.tsx";
import { SkewedContainer } from "./SkewedContainer";

export const MainPage = () => {
  return (
    <>
      <Hero />

      <SkewedContainer>
        <SaleSection />
        <CardMultipleItems />
        <SimpleExample />
      </SkewedContainer>
    </>
  );
};
