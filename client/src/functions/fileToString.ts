/**
 * fileToString funkcija za pretvorbo niza datotek v niz podatkovnih URL-jev.
 *
 * @param {File[]} files - Niz datotek za pretvorbo.
 * @returns {Promise<string[]>} - Promise, ki se razreši z nizom podatkovnih URL-jev.
 *
 * @example
 * // Uporaba funkcije
 * const fileList = [file1, file2]; // file1 in file2 sta objekta tipa File
 * fileToString(fileList).then(dataURLs => {
 * console.log(dataURLs); // Niz podatkovnih URL-jev
 * });
 */

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
          reader.onloadend = () => resolve(String(reader.result));
        })
    )
  );
};
