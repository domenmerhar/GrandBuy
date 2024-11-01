import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const initialMaxValue = 100;

export const useSliderFilter = () => {
  const [value, setValue] = useState<number[]>([0, 0]);
  const [maxValue, setMaxValue] = useState<number>(initialMaxValue);
  const [, setSearchParams] = useSearchParams();

  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  const handleChangeSlider = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);

    const min = Math.min(...(newValue as number[]));
    const max = Math.max(...(newValue as number[]));

    minRef.current!.value = `$${min}`;
    maxRef.current!.value = `$${max}`;

    setMaxValue((prev) => (max * 1.1 > prev ? prev + 5 : prev));
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
        setMaxValue((prev) => (newValue > initialMaxValue ? newValue : prev));
      }

      const min = Math.min(...(updatedValue as number[]));
      const max = Math.max(...(updatedValue as number[]));

      setSearchParams((searchParams) => {
        if (!min) searchParams.delete("from");
        else searchParams.set("from", min.toString());

        if (!max) searchParams.delete("to");
        else searchParams.set("to", max.toString());

        return searchParams;
      });

      minRef.current!.value = `$${min}`;
      maxRef.current!.value = `$${max}`;

      return updatedValue;
    });
  };

  return { value, maxValue, minRef, maxRef, handleChangeSlider, handleBlur };
};
