import { MarkdownLinter } from "./types";

export const checkImageAlt: MarkdownLinter = (
  filename: string,
  content: string
) => {
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; ++i) {
    const match = /!\[\s*\]\(([^)]*)\)/.exec(lines[i]);
    if (match && match.length > 0) {
      const firstMatch = match[1];
      return new Error(`Please add an alt tag to the image in ${filename}.

For example, fix the following

![](${firstMatch}) -> ![Image](${firstMatch}) at line ${i + 1}.
`);
    }
  }
  return null;
};
