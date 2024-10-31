import { Slider } from "@mui/material";
import { useRef, useState } from "react";
import { NakedInput } from "../../Util/NakedInput";
import styled from "styled-components";

const RangeHolder = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

function valuetext(value: number) {
  return `${value}€`;
}

const initialMaxValue = 100;

export const SliderFilter = () => {
  const [value, setValue] = useState<number[]>([0, 0]);
  const [maxValue, setMaxValue] = useState<number>(initialMaxValue);

  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  const handleChangeSlider = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);

    const min = Math.min(...(newValue as number[]));
    const max = Math.max(...(newValue as number[]));

    setMaxValue((prev) => (max * 1.1 > prev ? prev + 5 : prev));

    console.log({ max, maxValue });

    minRef.current!.value = `$${min}`;
    maxRef.current!.value = `$${max}`;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value.replace("$", ""));
    if (isNaN(newValue)) return;

    setValue((prev) => {
      const updatedValue = [...prev];
      if (e.target === minRef.current) {
        updatedValue[0] = newValue;
      } else {
        updatedValue[1] = newValue;
      }

      minRef.current!.value = `$${updatedValue[0]}`;
      maxRef.current!.value = `$${updatedValue[1]}`;

      return updatedValue;
    });
  };

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
