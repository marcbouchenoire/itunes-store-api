import { encodeURIFormComponent } from "../../src/utils/encode-form-uri-component"
import "jest-extended"

describe("encodeURIFormComponent", () => {
  test("should encode a URI component", () => {
    expect(encodeURIFormComponent("àáâ")).not.toIncludeMultiple(["à", "á", "â"])
  })

  test("should encode spaces as +", () => {
    expect(encodeURIFormComponent("lorem ipsum")).toBe("lorem+ipsum")
  })
})
