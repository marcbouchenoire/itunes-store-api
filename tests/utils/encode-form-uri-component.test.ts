import * as assert from "uvu/assert"
import { encodeURIFormComponent } from "../../src/utils/encode-form-uri-component"
import { describe } from "../helpers"

describe("encodeURIFormComponent", (it) => {
  it("should encode a URI component", () => {
    assert.equal(
      ["à", "á", "â"].some((character) =>
        encodeURIFormComponent("àáâ").includes(character)
      ),
      false
    )
  })

  it("should encode spaces as +", () => {
    assert.equal(encodeURIFormComponent("lorem ipsum"), "lorem+ipsum")
  })
})
