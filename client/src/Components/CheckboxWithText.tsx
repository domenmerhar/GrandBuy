import { ChangeEventHandler, FC, ComponentProps } from "react";
import styled from "styled-components";
import { Checkbox } from "../Util/Checkbox";

interface CheckboxProps extends ComponentProps<typeof Checkbox> {
  id: string;
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const StyledCheckboxWithText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > *:first-child {
    margin-top: 2px;
  }
`;

/**
 * CheckboxWithText komponenta za prikaz potrditvenega polja z besedilom.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {string} props.id - ID potrditvenega polja.
 * @param {string} props.label - Oznaka potrditvenega polja.
 * @param {ChangeEventHandler<HTMLInputElement>} [props.onChange] - Funkcija, ki se izvede ob spremembi stanja potrditvenega polja.
 * @param {...ComponentProps<typeof Checkbox>} rest - Dodatne lastnosti, ki se prenesejo na osnovno komponento Checkbox.
 * @returns {JSX.Element} - JSX element potrditvenega polja z besedilom.
 *
 * @example
 * // Uporaba komponente
 * <CheckboxWithText
 * id="terms"
 * label="Sprejemam pogoje uporabe"
 * onChange={(e) => console.log(e.target.checked)}
 * />
 */

export const CheckboxWithText: FC<CheckboxProps> = ({
  id,
  label,
  onChange,
  ...rest
}) => {
  return (
    <StyledCheckboxWithText>
      <Checkbox type="checkbox" id={id} onChange={onChange} {...rest} />
      <label htmlFor={id}>{label}</label>
    </StyledCheckboxWithText>
  );
};
