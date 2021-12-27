import {
  AlbumMatch,
  Entities,
  Lookup,
  LookupResponse,
  Match,
  Media,
  Options,
  ParseOptions,
  PlainObject,
  SearchOptions,
  SearchResponse,
  UrlMatch
} from "./types"
import { encodeURIFormComponent } from "./utils/encode-form-uri-component"
import { matchGroups } from "./utils/match-groups"

const API = "https://itunes.apple.com"

const regex =
  /^https?:\/\/(?<media>(?:apps|books|music|podcasts|))\.apple\.com\/(?<country>[a-z]+)\/(?<entity>[a-z-]+)/
const appRegex = /^https?:\/\/apps\.apple\.com\/[^/]*\/app\/[^/]*\/id(?<id>\d+)/
const artistRegex =
  /^https?:\/\/music\.apple\.com\/[^/]*\/artist\/[^/]*\/(?<id>\d+)/
const audiobookRegex =
  /^https?:\/\/books\.apple\.com\/[^/]*\/audiobook\/[^/]*\/id(?<id>\d+)/
const authorRegex =
  /^https?:\/\/books\.apple\.com\/[^/]*\/author\/[^/]*\/id(?<id>\d+)/
const bookRegex =
  /^https?:\/\/books\.apple\.com\/[^/]*\/book\/[^/]*\/id(?<id>\d+)/
const musicVideoRegex =
  /^https?:\/\/music\.apple\.com\/[^/]*\/music-video\/[^/]*\/(?<id>\d+)/
const podcastRegex =
  /^https?:\/\/podcasts\.apple\.com\/[^/]*\/podcast\/[^/]*\/id(?<id>\d+)/
const albumRegex =
  /^https?:\/\/music\.apple\.com\/[^/]*\/album\/[^/]*\/(?<id>\d+)(?:\?.*i=(?<trackId>\d+))?/

const defaultOptions: Partial<Options> = {
  country: "us"
}

/**
 * Query an endpoint from the iTunes Store API.
 *
 * @param endpoint - The API endpoint to query.
 * @param parameters - An object of URL parameters.
 */
async function query<T = PlainObject>(
  endpoint: string,
  parameters: Record<string, boolean | number | string>
): Promise<T> {
  const query = new URLSearchParams()

  for (const [parameter, value] of Object.entries(parameters)) {
    query.set(parameter, encodeURIFormComponent(value))
  }

  try {
    const response = await fetch(`${API}/${endpoint}?${query.toString()}`)

    if (response.ok) {
      return await response.json()
    } else {
      throw new Error(response.statusText)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Parse and match a store catalog URL.
 *
 * @param url - The URL to parse and match.
 */
function parse(url: string): Partial<ParseOptions> {
  const { country, entity, media } = matchGroups<UrlMatch>(url, regex)

  function getOptions(id?: string): Partial<ParseOptions> {
    return id ? { country, id: Number(id) } : {}
  }

  function getMatchedOptions(regex: RegExp): Partial<ParseOptions> {
    const { id } = matchGroups<Match>(url, regex)

    return getOptions(id)
  }

  if (media === "apps") {
    return getMatchedOptions(appRegex)
  } else if (media === "books" && entity === "audiobook") {
    return getMatchedOptions(audiobookRegex)
  } else if (media === "books" && entity === "author") {
    return getMatchedOptions(authorRegex)
  } else if (media === "books" && entity === "book") {
    return getMatchedOptions(bookRegex)
  } else if (media === "music" && entity === "artist") {
    return getMatchedOptions(artistRegex)
  } else if (media === "music" && entity === "music-video") {
    return getMatchedOptions(musicVideoRegex)
  } else if (media === "podcasts" && entity === "podcast") {
    return getMatchedOptions(podcastRegex)
  } else if (media === "music" && entity === "album") {
    const { id, trackId } = matchGroups<AlbumMatch>(url, albumRegex)

    return trackId ? getOptions(trackId) : getOptions(id)
  } else {
    return {}
  }
}

/**.
 * Search within Apple's various store catalogs.
 *
 * @param search - A string to search for.
 * @param [options] - An optional set of settings.
 * @param [options.attribute] - Which attribute to search for, relative to the specified media type.
 * @param [options.country] - A two-letter country code where the queried store catalog will be from.
 * @param [options.entity] - The type of results returned, relative to the specified media type.
 * @param [options.explicit] - Whether to include explicit content.
 * @param [options.limit] - Limit the number of results.
 * @param [options.media] - The media type to search for.
 * @param [options.sort] - Whether to sort results by popularity or recentness.
 * @returns A promise fulfilling into the fetched results.
 *
 * @example
 *
 * ```js
 * const { results } = await search("Her", {
 *   media: "movie"
 * })
 *
 * // results: [Result, Result, Result...]
 * ```
 */
export async function search<M extends Media, E extends Entities[M]>(
  search: string,
  options: Partial<SearchOptions<M, E>> = {}
): Promise<SearchResponse<M, E>> {
  const resolvedOptions = { ...defaultOptions, ...options }

  return await query<SearchResponse<M, E>>("search", {
    ...resolvedOptions,
    explicit: resolvedOptions.explicit ? "Yes" : "No",
    term: search
  })
}

/**.
 * Look for a specific result within Apple's various store catalogs.
 *
 * @param type - The type of value to look for.
 * @param value - The value to look for.
 * @param [options] - An optional set of settings.
 * @param [options.country] - A two-letter country code where the queried store catalog will be from.
 * @returns A promise fulfilling into the fetched results.
 *
 * @example
 *
 * ```js
 * const { results } = await lookup(
 *   "id",
 *   "https://music.apple.com/us/album/kim-jessie/1007596648?i=1007596731"
 * )
 *
 * // results: [Result]
 * ```
 */
export async function lookup(
  type: Lookup,
  value: number,
  options?: Partial<Options>
): Promise<LookupResponse>
export async function lookup(
  type: "url",
  value: string,
  options?: Partial<Options>
): Promise<LookupResponse>
export async function lookup(
  type: Lookup | "url",
  value: number | string,
  options: Partial<Options> = {}
): Promise<LookupResponse> {
  const resolvedOptions = { ...defaultOptions, ...options }
  const resolvedValue = (
    type === "url" ? parse(String(value)) : { [type]: value }
  ) as Record<Exclude<Lookup, "url">, number | string>

  return await query<LookupResponse>("lookup", {
    ...resolvedOptions,
    ...resolvedValue
  })
}
