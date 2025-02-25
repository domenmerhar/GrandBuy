import { ChangeEvent, FC } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckboxWithText } from "./CheckboxWithText";

interface CheckboxProps {
  id: string;
  label: string;
}

export const CheckboxSearchParam: FC<CheckboxProps> = ({ id, label }) => {
  const [, setSearchParams] = useSearchParams();

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      return setSearchParams((searchParams) => {
        searchParams.set(id, "true");
        return searchParams;
      });

    setSearchParams((searchParams) => {
      searchParams.delete(id);
      return searchParams;
    });
  };

  return (
    <CheckboxWithText onChange={handleCheckboxChange} id={id} label={label} />
  );
};
