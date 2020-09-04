export type MarkdownLinter = (
  filename: string,
  filecontent: string
) => null | Error;
