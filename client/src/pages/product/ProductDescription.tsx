import { FC, useEffect, useState } from "react";
import { MarkdownRenderer } from "../../Components/Markdown/MarkdownRenderer";
import { useTranslation } from "react-i18next";

interface MarkdownTestProps {
  markdownSrc: string;
}

/**
 * Komponenta za prikaz opisa izdelka v Markdown formatu.
 *
 * @component
 * @param {Object} props - Lastnosti komponente.
 * @param {string} props.markdownSrc - URL vira za Markdown vsebino.
 * @returns {JSX.Element} JSX element, ki predstavlja opis izdelka v Markdown formatu.
 *
 * @example
 * // Uporaba komponente
 * <ProductDescription markdownSrc="https://example.com/description.md" />
 */

export const ProductDescription: FC<MarkdownTestProps> = ({ markdownSrc }) => {
  const { t } = useTranslation();
  const [markdownContent, setMarkdownContent] = useState<string>("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      const response = await fetch(markdownSrc);
      const text = await response.text();
      setMarkdownContent(text);
    };

    fetchMarkdown();
  }, [markdownSrc]);

  return (
    <MarkdownRenderer>
      {markdownContent || t("descriptionIsLoading")}
    </MarkdownRenderer>
  );
};
