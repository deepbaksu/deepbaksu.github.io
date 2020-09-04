import { checkImageAlt } from "./check_image_should_have_alt";

test("![](./some-image-path/image.jpg) throws an error because it does not have alt", () => {
  const filename = "temp.md";
  const filecontent = `
![Valid Image](./valid-image.png)
![](./image.png)
  `;
  expect(checkImageAlt(filename, filecontent)).toStrictEqual(
    new Error(`Please add an alt tag to the image in ${filename}.

For example, fix the following

![](./image.png) -> ![Image](./image.png) at line 3.
`)
  );
});
