import { FC } from "react";
import styled from "styled-components";
import { BlankCard } from "../Util/BlankCard";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  children: string;
}

const MarkdownCard = styled(BlankCard)`
  line-height: 1.5;
  padding: 1.8rem 2.4rem;
`;

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({ children }) => {
  return (
    <MarkdownCard>
      <ReactMarkdown skipHtml disallowedElements={["a"]}>
        {children}
      </ReactMarkdown>
    </MarkdownCard>
  );
};
