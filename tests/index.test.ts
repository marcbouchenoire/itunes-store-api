import { search, lookup } from "../src"

describe("search", () => {
  test("should return the expected results", async () => {
    const { resultCount, results } = await search("M83", { limit: 10 })

    expect(resultCount).toBeNumber()
    expect(results).toBeArrayOfSize(resultCount)
  })
})

describe("lookup", () => {
  test("should return the expected result", async () => {
    const { resultCount, results } = await lookup("id", 1007596731)

    expect(resultCount).toEqual(1)
    expect(results).toBeArrayOfSize(resultCount)
  })

  test("should return the expected result given a valid URL", async () => {
    const { resultCount, results } = await lookup(
      "url",
      "https://music.apple.com/us/album/saturdays-youth/1007596648"
    )

    expect(resultCount).toEqual(1)
    expect(results).toBeArrayOfSize(resultCount)
  })
})
