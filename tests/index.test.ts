import { restoreAll, spyOn } from "nanospy"
import fetch from "node-fetch"
import * as assert from "uvu/assert"
import { lookup, search } from "../src"
import { describe } from "./helpers"

describe("search", (it) => {
  it("should return the expected results", async () => {
    spyOn(global, "fetch", fetch as typeof global["fetch"])

    const { resultCount, results } = await search("M83")
    const { resultCount: explicitResultCount, results: explicitResults } =
      await search("My Beautiful Dark Twisted Fantasy", { explicit: true })

    assert.type(resultCount, "number")
    assert.equal(results.length, resultCount)
    assert.equal(results.length > 0, true)

    assert.type(explicitResultCount, "number")
    assert.equal(explicitResults.length, explicitResultCount)
    assert.equal(explicitResults.length > 0, true)

    restoreAll()
  })
})

describe("lookup", (it) => {
  it.before.each(() => {
    spyOn(global, "fetch", fetch as typeof global["fetch"])
  })

  it.after.each(() => {
    restoreAll()
  })

  it("should return the expected results", async () => {
    const { resultCount, results } = await lookup("id", 1007596731)

    assert.equal(resultCount > 0, true)
    assert.equal(results.length, resultCount)
  })

  it("should return the expected results given a valid URL", async () => {
    const { resultCount: softwareResultCount, results: softwareResults } =
      await lookup(
        "url",
        "https://apps.apple.com/us/app/letterboxd/id1054271011"
      )
    const { resultCount: audiobookResultCount, results: audiobookResults } =
      await lookup(
        "url",
        "https://books.apple.com/gb/audiobook/the-diary-of-a-young-girl/id1440416363"
      )
    const { resultCount: bookResultCount, results: bookResults } = await lookup(
      "url",
      "https://books.apple.com/us/book/the-communist-manifesto/id395544966"
    )
    const { resultCount: authorResultCount, results: authorResults } =
      await lookup(
        "url",
        "https://books.apple.com/us/author/albert-camus/id57528162"
      )
    const { resultCount: songResultCount, results: songResults } = await lookup(
      "url",
      "https://music.apple.com/us/album/kim-jessie/1007596648?i=1007596731"
    )
    const { resultCount: albumResultCount, results: albumResults } =
      await lookup(
        "url",
        "https://music.apple.com/us/album/wolfgang-amadeus-phoenix/1450828963"
      )
    const { resultCount: musicVideoResultCount, results: musicVideoResults } =
      await lookup(
        "url",
        "https://music.apple.com/us/music-video/daydreaming/1441607175"
      )
    const { resultCount: artistResultCount, results: artistResults } =
      await lookup(
        "url",
        "https://music.apple.com/us/artist/a-g-cook/744253464"
      )
    const { resultCount: podcastResultCount, results: podcastResults } =
      await lookup(
        "url",
        "https://podcasts.apple.com/us/podcast/panic-podcast/id1495115716"
      )

    assert.equal(softwareResultCount > 0, true)
    assert.equal(audiobookResultCount > 0, true)
    assert.equal(bookResultCount > 0, true)
    assert.equal(authorResultCount > 0, true)
    assert.equal(songResultCount > 0, true)
    assert.equal(albumResultCount > 0, true)
    assert.equal(musicVideoResultCount > 0, true)
    assert.equal(artistResultCount > 0, true)
    assert.equal(podcastResultCount > 0, true)

    assert.equal(softwareResults.length, softwareResultCount)
    assert.equal(audiobookResults.length, audiobookResultCount)
    assert.equal(bookResults.length, bookResultCount)
    assert.equal(authorResults.length, authorResultCount)
    assert.equal(songResults.length, songResultCount)
    assert.equal(albumResults.length, albumResultCount)
    assert.equal(musicVideoResults.length, musicVideoResultCount)
    assert.equal(artistResults.length, artistResultCount)
    assert.equal(podcastResults.length, podcastResultCount)
  })

  it("should return empty results given an invalid URL", async () => {
    const { resultCount } = await lookup("url", "https://www.apple.com/")
    const { resultCount: resultCountMissingId } = await lookup(
      "url",
      "https://music.apple.com/us/album/kim-jessie"
    )

    assert.equal(resultCount, 0)
    assert.equal(resultCountMissingId, 0)
  })
})

describe("search and lookup", (it) => {
  it("should throw when fetch is not supported", async () => {
    try {
      await lookup("id", 1007596731)
      assert.unreachable()
    } catch (error) {
      assert.instance(error, Error)
    }
  })

  it("should throw when encountering a network error", async () => {
    spyOn(global, "fetch", (async () =>
      fetch("https://httpstat.us/500")) as typeof global["fetch"])

    try {
      await lookup("id", 1007596731)
      assert.unreachable()
    } catch (error) {
      assert.instance(error, Error)
    }
  })
})
