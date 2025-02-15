import { FC, useEffect, useState } from "react";
import { MarkdownRenderer } from "../../Components/Markdown/MarkdownRenderer";
import { useTranslation } from "react-i18next";

interface MarkdownTestProps {
  markdownSrc: string;
}

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
