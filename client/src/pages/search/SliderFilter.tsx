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

export const SliderFilter = () => {
  const [value, setValue] = useState<number[]>([0, 0]);

  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  const handleChangeSlider = (e: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);

    minRef.current!.value = `$${Math.min(...(newValue as number[]))}`;
    maxRef.current!.value = `$${Math.max(...(newValue as number[]))}`;
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue((prev) => {
  //     const newValue = prev;
  //     if (e.target === minRef.current) {
  //       newValue[0] = parseInt(inputValue);
  //     } else {
  //       newValue[1] = parseInt(inputValue);
  //     }

  //     minRef.current!.value = `$${Math.min(...(newValue as number[]))}`;
  //     maxRef.current!.value = `$${Math.max(...(newValue as number[]))}`;
  //     return newValue;
  //   });

  //   setInputValue("");
  // };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setValue((prev) => {
      const newValue = prev;
      newValue[e.target === minRef.current ? 0 : 1] = parseInt(e.target.value);
      return newValue;
    });

    minRef.current!.value = `$${Math.min(...(value as number[]))}`;
    maxRef.current!.value = `$${Math.max(...(value as number[]))}`;
  };

  return (
    <>
      <Slider
        value={value}
        onChange={handleChangeSlider}
        getAriaValueText={valuetext}
        color="warning"
        //max={Math.max(...value)}
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
