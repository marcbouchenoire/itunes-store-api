import { matchGroups } from "../../src/utils/match-groups"

interface ValidMatch {
  letters: string
  numbers: string
}

interface EmptyMatch {
  dashes: string
}

describe("matchGroups", () => {
  const string = "abc 123"

  test("should return an object of all matched groups", () => {
    const groups = matchGroups<ValidMatch>(
      string,
      /(?<letters>\w+).(?<numbers>\d+)/
    )

    expect(groups.letters).toEqual("abc")
    expect(groups.numbers).toEqual("123")
  })

  test("should return an empty object when no groups have been matched", () => {
    const groups = matchGroups<EmptyMatch>(string, /(?<dashes>-+)/)

    expect(groups).toStrictEqual({})
  })
})
