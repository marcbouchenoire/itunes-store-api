import * as assert from "uvu/assert"
import { lookup, search } from "../src"
import { describe } from "./helpers"

describe("search", (it) => {
  it("should return the expected results", async () => {
    const { resultCount, results } = await search("M83", { limit: 10 })

    assert.type(resultCount, "number")
    assert.equal(results?.length, resultCount)
  })
})

describe("lookup", (it) => {
  it("should return the expected result", async () => {
    const { resultCount, results } = await lookup("id", 1007596731)

    assert.equal(resultCount, 1)
    assert.equal(results?.length, resultCount)
  })

  it("should return the expected result given a valid URL", async () => {
    const { resultCount, results } = await lookup(
      "url",
      "https://music.apple.com/us/album/saturdays-youth/1007596648"
    )

    assert.equal(resultCount, 1)
    assert.equal(results?.length, resultCount)
  })
})
