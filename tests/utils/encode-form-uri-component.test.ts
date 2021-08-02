import { encodeURIFormComponent } from "../../src/utils/encode-form-uri-component"

describe("encodeURIFormComponent", () => {
  test("should encode a URI component", () => {
    expect(encodeURIFormComponent("àáâ")).not.toIncludeMultiple(["à", "á", "â"])
  })

  test("should encode spaces as +", () => {
    expect(encodeURIFormComponent("lorem ipsum")).toEqual("lorem+ipsum")
  })
})
