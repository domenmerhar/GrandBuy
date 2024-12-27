import React, { useState } from "react";

export const ImagePicker = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        setSelectedImages(images);
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        multiple
      />
      {selectedImages.length > 0 && (
        <div>
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Selected ${index}`}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                margin: "5px",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
