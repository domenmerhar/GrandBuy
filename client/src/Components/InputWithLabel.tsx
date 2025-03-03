import { ComponentProps, forwardRef } from "react";
import styled from "styled-components";
import { Input } from "../Util/Input";

type InputProps = ComponentProps<typeof Input>;

interface InputWithLabelProps extends InputProps {
  id: string;
  title: string;
  error?: boolean;
}

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

/**
 * InputWithLabel komponenta za prikaz vnosnega polja z oznako.
 *
 * @function
 *
 * @param {object} props - Lastnosti komponente.
 * @param {string} props.id - ID vnosnega polja.
 * @param {string} props.title - Naslov oznake vnosnega polja.
 * @param {boolean} [props.error=false] - Ali je vnosno polje v stanju napake.
 * @param {...InputProps} rest - Dodatne lastnosti, ki se prenesejo na osnovno komponento Input.
 * @param {React.ForwardedRef<HTMLInputElement>} ref - Referenca za vnosno polje.
 * @returns {JSX.Element} - JSX element vnosnega polja z oznako.
 *
 * @example
 * // Uporaba komponente
 * <InputWithLabel
 * id="username"
 * title="Uporabniško ime"
 * type="text"
 * placeholder="Vnesite uporabniško ime"
 * />
 */

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ id, title, error = false, ...rest }, ref) => {
    return (
      <>
        <Label htmlFor={id}>{title}</Label>
        <Input id={id} ref={ref} $error={error} {...rest} />
      </>
    );
  }
);
