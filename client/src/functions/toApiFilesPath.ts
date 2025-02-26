export const toApiFilesPath = (file: string | undefined) =>
  file
    ? `${import.meta.env.VITE_API_LINK}/files/${file}`
    : import.meta.env.VITE_PLACEHOLDER_IMAGE;
