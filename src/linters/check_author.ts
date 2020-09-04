import { MarkdownLinter } from "./types";

export const checkAuthor: MarkdownLinter = (
  filename: string,
  content: string
) => {
  if (/^author:\s/m.test(content)) {
    return null;
  }
  return new Error(`author: tag is required in ${filename}.

For example, add the following in ${filename}.

---
author: Mo Kweon
---
`);
};
