export type role = "user" | "seller" | "admin";
export interface File {
  data: Buffer;
  name: string;
  mv: (path: string, callback: (err: unknown) => void) => void;
}
