import glob from "glob";
import { promises as fs } from "fs";
import { MarkdownLinter } from "./linters/types";
import { checkAuthor } from "./linters/check_author";

const markdownLinters: MarkdownLinter[] = [checkAuthor];

glob("source/_posts/**/*.md", (err, filenames) => {
  if (err) {
    throw err;
  }

  for (const filename of filenames) {
    // open for read
    fs.open(filename, "r")
      .then(fh => {
        return fh.readFile("utf-8");
      })
      .then(buffer => {
        for (const linter of markdownLinters) {
          const err = linter(filename, buffer);

          if (err !== null) {
            throw err;
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
});
