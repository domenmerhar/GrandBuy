import { FC } from "react";
import styled from "styled-components";
import { BlankCard } from "../../Util/BlankCard";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  children: string;
}

const MarkdownCard = styled(BlankCard)`
  & * {
    line-height: 1.5;
  }

  & h1,
  h2,
  h3,
  ul,
  ol {
    margin-top: 0.8rem;
  }

  & ul,
  ol {
    margin-left: 20px;
  }

  padding: 1.8rem 2.4rem;
`;

/**
 * MarkdownRenderer komponenta za prikaz Markdown vsebine.
 *
 * @function
 * @param {object} props - Lastnosti komponente.
 * @param {string} props.children - Markdown vsebina za prikaz.
 * @returns {JSX.Element} - JSX element za prikaz Markdown vsebine.
 *
 * @example
 * // Uporaba komponente
 * <MarkdownRenderer># Naslov</MarkdownRenderer>
 */

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({ children }) => {
  return (
    <MarkdownCard>
      <ReactMarkdown skipHtml disallowedElements={["a"]}>
        {children}
      </ReactMarkdown>
    </MarkdownCard>
  );
};
