import { checkAuthor } from "./check_author";

test("not adding `author: ` should throw an error", () => {
  const filename = "temp.md";
  const result = checkAuthor(
    filename,
    /*content=*/ `---
noauthor: hello
---
              `
  );

  expect(result).not.toBeNull();
  expect(result).toStrictEqual(
    new Error(`author: tag is required in ${filename}.

For example, add the following in ${filename}.

---
author: Mo Kweon
---
`)
  );
});

test("having author: should not throw an error", () => {
  expect(
    checkAuthor(
      "temp.md",
      `---
author: Mo Kweon
---`
    )
  ).toBeNull();
});
