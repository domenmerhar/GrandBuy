import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const initialMaxValue = 100;

/**
 * Hook za upravljanje drsnega filtra.
 *
 * @returns {Object} Objekt, ki vsebuje vrednosti drsnika, največjo vrednost, reference na vhodna polja in funkcije za upravljanje drsnika.
 *
 * @example
 * // Uporaba hooka
 * const {
 *   value,
 *   maxValue,
 *   minRef,
 *   maxRef,
 *   handleChangeSlider,
 *   handleBlur,
 *   handleChangeCommited,
 * } = useSliderFilter();
 */

export const useSliderFilter = () => {
  const [value, setValue] = useState<number[]>([0, 0]);
  const [maxValue, setMaxValue] = useState<number>(initialMaxValue);
  const [, setSearchParams] = useSearchParams();

  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  const updateSearchParamsAndInputs = (min: number, max: number) => {
    setSearchParams((searchParams) => {
      if (!min) searchParams.delete("from");
      else searchParams.set("from", min.toString());

      if (!max) searchParams.delete("to");
      else searchParams.set("to", max.toString());

      return searchParams;
    });

    minRef.current!.value = `$${min}`;
    maxRef.current!.value = `$${max}`;
  };

  const handleChangeSlider = (_: Event, newValue: number | number[]) => {
    const [min, max] = [
      Math.min(...(newValue as number[])),
      Math.max(...(newValue as number[])),
    ];

    minRef.current!.value = `$${min}`;
    maxRef.current!.value = `$${max}`;
    setValue([min, max]);

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

      const [min, max] = [Math.min(...updatedValue), Math.max(...updatedValue)];
      updateSearchParamsAndInputs(min, max);

      return updatedValue;
    });
  };

  const handleChangeCommited = (
    _: React.SyntheticEvent | Event,
    val: number | number[]
  ) => {
    if (Array.isArray(val)) {
      updateSearchParamsAndInputs(val[0], val[1]);
    }
  };

  return {
    value,
    maxValue,
    minRef,
    maxRef,
    handleChangeSlider,
    handleBlur,
    handleChangeCommited,
  };
};
