import { ComponentProps, forwardRef } from "react";
import styled from "styled-components";
import { Label } from "../Util/Label";

const TextareaLabel = styled(Label)`
  margin-bottom: -4px;
`;

const Textarea = styled.textarea`
  border-radius: 15px;
  border: none;
  padding: 1rem 1.5rem;
  font-weight: 400;
  resize: vertical;
  min-height: 10rem;
  max-height: 80%;
`;

interface TextAreaWithLabelProps extends ComponentProps<typeof Textarea> {
  id: string;
  label: string;
}

/**
 * TextareaWithLabel komponenta za prikaz večvrstičnega vnosnega polja z oznako.
 *
 * @component
 * @param {object} props - Lastnosti komponente.
 * @param {string} props.id - ID večvrstičnega vnosnega polja.
 * @param {string} props.label - Oznaka večvrstičnega vnosnega polja.
 * @param {string} [props.placeholder=""] - Namig za uporabnika.
 * @param {number} [props.maxLength=500] - Največje število znakov.
 * @param {...ComponentProps<typeof Textarea>} rest - Dodatne lastnosti, ki se prenesejo na osnovno komponento Textarea.
 * @param {React.ForwardedRef<HTMLTextAreaElement>} ref - Referenca za večvrstično vnosno polje.
 * @returns {JSX.Element} - JSX element večvrstičnega vnosnega polja z oznako.
 *
 * @example
 * // Uporaba komponente
 * <TextareaWithLabel
 * id="description"
 * label="Opis"
 * placeholder="Vnesite opis..."
 * maxLength={1000}
 * />
 */

export const TextareaWithLabel = forwardRef<
  HTMLTextAreaElement,
  TextAreaWithLabelProps
>(({ id, label, placeholder = "", maxLength = 500, ...rest }, ref) => {
  return (
    <>
      <TextareaLabel htmlFor={id}>{label}</TextareaLabel>
      <Textarea
        id={id}
        placeholder={placeholder}
        ref={ref}
        maxLength={maxLength}
        {...rest}
      />
    </>
  );
});
