import React, { useState } from "react";

const MarkdownExporter = () => {
  const [content, setContent] = useState("");

  const handleTextareaChange = (e) => {
    setContent(e.target.value);
  };

  const downloadMarkdownFile = () => {
    // Create a Blob with the Markdown content
    const blob = new Blob([content], { type: "text/markdown" });
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    // Create a temporary <a> element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    // Cleanup the URL object
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
