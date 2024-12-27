import { forwardRef } from "react";
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

interface TextAreaWithLabelProps {
  id: string;
  label: string;
  placeholder?: string;
}

export const TextareaWithLabel = forwardRef<
  HTMLTextAreaElement,
  TextAreaWithLabelProps
>(({ id, label, placeholder = "" }, ref) => {
  return (
    <>
      <TextareaLabel htmlFor={id}>{label}</TextareaLabel>
      <Textarea id={id} placeholder={placeholder} ref={ref} />
    </>
  );
});
