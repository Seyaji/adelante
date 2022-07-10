export function capitalize(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

import { createRequire } from "module";
export const require = createRequire(import.meta.url);

export const useTs = (typescript: boolean, ts: string, js: string) => typescript ? ts : js;