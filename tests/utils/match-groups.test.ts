import * as assert from "uvu/assert"
import { matchGroups } from "../../src/utils/match-groups"
import { describe } from "../helpers"

interface ValidMatch {
  letters: string // eslint-disable-line jsdoc/require-jsdoc
  numbers: string // eslint-disable-line jsdoc/require-jsdoc
}

interface EmptyMatch {
  dashes: string // eslint-disable-line jsdoc/require-jsdoc
}

describe("matchGroups", (it) => {
  const string = "abc 123"

  it("should return an object of all matched groups", () => {
    const groups = matchGroups<ValidMatch>(
      string,
      /(?<letters>\w+).(?<numbers>\d+)/
    )

    assert.equal(groups.letters, "abc")
    assert.equal(groups.numbers, "123")
  })

  it("should return an empty object when no groups have been matched", () => {
    const groups = matchGroups<EmptyMatch>(string, /(?<dashes>-+)/)

    assert.equal(groups, {})
  })
})
