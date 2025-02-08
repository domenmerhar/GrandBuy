export const fileToString: (files: File[]) => Promise<string[]> = async (
  files: File[]
) => {
  const readers = files.map((file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return reader;
  });

  return await Promise.all(
    readers.map(
      (reader) =>
        new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
        })
    )
  );
};
