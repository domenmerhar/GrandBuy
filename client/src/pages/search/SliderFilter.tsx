import { Slider } from "@mui/material";
import { NakedInput } from "../../Util/NakedInput";
import styled from "styled-components";
import { useSliderFilter } from "./SliderFilter.hook";

const RangeHolder = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

function valuetext(value: number) {
  return `$${value}`;
}

export const SliderFilter = () => {
  const { handleBlur, handleChangeSlider, maxRef, maxValue, minRef, value } =
    useSliderFilter();

  return (
    <>
      <Slider
        value={value}
        onChange={handleChangeSlider}
        getAriaValueText={valuetext}
        color="warning"
        max={maxValue}
      />
      <RangeHolder>
        <NakedInput
          $height="3.2rem"
          $width="6.4rem"
          $fontSize="1.6rem"
          onBlur={handleBlur}
          ref={minRef}
          defaultValue={`$${value[0]}`}
        />
        -
        <NakedInput
          $height="3.2rem"
          $width="6.4rem"
          $fontSize="1.6rem"
          onBlur={handleBlur}
          ref={maxRef}
          defaultValue={`$${value[1]}`}
        />
      </RangeHolder>
    </>
  );
};