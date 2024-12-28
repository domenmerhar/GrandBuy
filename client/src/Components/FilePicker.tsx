import React, { FC } from "react";

interface ImagePickerProps {
  setSelectedFiles: React.Dispatch<React.SetStateAction<string[]>>;
  multiple?: boolean;
  accept?: string;
}

export const FilePicker: FC<ImagePickerProps> = ({
  setSelectedFiles,
  multiple = false,
  accept = "image/*",
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const readers = files.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return reader;
      });

      Promise.all(
        readers.map(
          (reader) =>
            new Promise<string>((resolve) => {
              reader.onloadend = () => resolve(reader.result as string);
            })
        )
      ).then((images) => {
        setSelectedFiles(images);
      });
    }
  };

  return (
    <>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        multiple={multiple}
      />
    </>
  );
};
