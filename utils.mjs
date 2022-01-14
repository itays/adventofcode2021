import { readFile } from "fs";
export function read(cb) {
  readFile("input.txt", "utf-8", cb);
}
