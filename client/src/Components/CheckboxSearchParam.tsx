import { ChangeEvent, FC } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckboxWithText } from "./CheckboxWithText";

interface CheckboxProps {
  id: string;
  label: string;
}

/**
 * CheckboxSearchParam komponenta za ustvarjanje potrditvenega polja, ki vpliva na iskalne parametre URL-ja.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {string} props.id - ID potrditvenega polja (uporabljen kot ključ iskalnega parametra).
 * @param {string} props.label - Oznaka potrditvenega polja.
 * @returns {JSX.Element} - JSX element potrditvenega polja.
 *
 * @example
 * // Uporaba komponente
 * <CheckboxSearchParam id="featured" label="Prikaz samo predstavljenih" />
 */

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
