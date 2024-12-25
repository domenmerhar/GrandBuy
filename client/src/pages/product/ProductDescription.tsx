import { FC, useEffect, useState } from "react";
import { MarkdownRenderer } from "../../Components/MarkdownRenderer";

interface MarkdownTestProps {
  markdownSrc: string;
}

export const ProductDescription: FC<MarkdownTestProps> = ({ markdownSrc }) => {
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
      {markdownContent || "Description is loading..."}
    </MarkdownRenderer>
  );
};
