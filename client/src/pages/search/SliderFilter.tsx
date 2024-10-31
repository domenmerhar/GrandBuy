import { Slider } from "@mui/material";
import { useState } from "react";

function valuetext(value: number) {
  return `${value}€`;
}

export const SliderFilter = () => {
  const [value, setValue] = useState<number[]>([0, 0]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Slider
      getAriaLabel={() => "Temperature range"}
      value={value}
      onChange={handleChange}
      //valueLabelDisplay="auto"
      getAriaValueText={valuetext}
      color="warning"
      max={1000}
    />
  );
};
