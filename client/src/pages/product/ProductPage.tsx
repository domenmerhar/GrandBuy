import { Content } from "../../Util/Content";
import { MoreFromSellerSection } from "./MoreFromSellerSection";
import { SaleSection } from "../main/SaleSection";
import { BlankCard } from "../../Util/BlankCard";
import { SliderInfoRow } from "./SliderInfoRow";

export const ProductPage = () => {
  return (
    <Content>
      <SliderInfoRow />

      <BlankCard>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique
          aliquam tempora nemo repellat! Quasi, aliquid, magnam ratione illo,
          provident hic repudiandae sit vel modi animi asperiores aliquam ab
          sequi ullam.
        </p>
      </BlankCard>

      <MoreFromSellerSection />

      <SaleSection />
    </Content>
  );
};
