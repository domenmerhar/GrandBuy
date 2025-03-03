import React, { useState } from "react";

/**
 * MarkdownExporter komponenta za urejanje in izvoz Markdown vsebine.
 *
 * @component
 * @returns {JSX.Element} - JSX element za urejanje in izvoz Markdown vsebine.
 *
 * @example
 * // Uporaba komponente
 * <MarkdownExporter />
 */

const MarkdownExporter = () => {
  const [content, setContent] = useState("");

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const downloadMarkdownFile = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <textarea
        rows={10}
        cols={50}
        value={content}
        onChange={handleTextareaChange}
        placeholder="Write your Markdown content here..."
      />
      <br />
      <button onClick={downloadMarkdownFile}>Download as Markdown</button>
    </div>
  );
};

export default MarkdownExporter;
