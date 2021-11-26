export type PlainObject<T = unknown> = Record<string, T>

export interface Options {
  country: Country
}

export interface SearchOptions<M extends Media, E extends Entities[M] = never>
  extends Options {
  attribute: Attributes[M]
  entity: E
  explicit: boolean
  limit: number
  media: M
  sort: Sort
}

export interface SearchResponse<
  M extends Media,
  E extends Entities[M] = never
> {
  resultCount: number
  results: (E extends undefined ? Results[Entities[M]] : Results[E])[]
}

export interface LookupResponse {
  resultCount: 0 | 1
  results: [] | [Results[keyof Results]]
}

export interface MatchOptions {
  country: Country
  id: number
}

export interface UrlMatch {
  country: Country
  entity:
    | "album"
    | "app"
    | "artist"
    | "audiobook"
    | "author"
    | "book"
    | "music-video"
    | "podcast"
  media: "apps" | "books" | "music" | "podcasts"
}

export interface Match {
  id: string
}

export interface AlbumMatch {
  id: string
  trackId: string
}

export type Sort = "popular" | "recent"

export type Lookup =
  | "amgAlbumId"
  | "amgArtistId"
  | "amgVideoId"
  | "id"
  | "isbn"
  | "upc"

export type Media =
  | "all"
  | "audiobook"
  | "ebook"
  | "movie"
  | "music"
  | "musicVideo"
  | "podcast"
  | "shortFilm"
  | "software"
  | "tvShow"

export interface Entities {
  all: EntityAll
  audiobook: EntityAudiobook
  ebook: EntityEbook
  movie: EntityMovie
  music: EntityMusic
  musicVideo: EntityMusicVideo
  podcast: EntityPodcast
  shortFilm: EntityShortFilm
  software: EntitySoftware
  tvShow: EntityTvShow
}

export interface Attributes {
  all: AttributeAll
  audiobook: AttributeAudiobook
  ebook: never
  movie: AttributeMovie
  music: AttributeMusic
  musicVideo: AttributeMusicVideo
  podcast: AttributePodcast
  shortFilm: AttributeShortFilm
  software: AttributeSoftware
  tvShow: AttributeTvShow
}

export interface Results {
  album: ResultAlbum
  allArtist: ResultMovieArtist | ResultMusicArtist | ResultPodcastArtist
  allTrack:
    | ResultMovie
    | ResultMusicTrack
    | ResultMusicVideo
    | ResultPodcast
    | ResultTvEpisode
  audiobook: ResultAudiobook
  audiobookAuthor: never
  ebook: ResultEbook
  iPadSoftware: ResultUniversalSoftware
  macSoftware: ResultMacSoftware | ResultUniversalSoftware
  mix: never
  movie: ResultMovie
  movieArtist: ResultMovieArtist
  musicArtist: ResultMusicArtist
  musicTrack: ResultMusicTrack
  musicVideo: ResultMusicVideo
  podcast: ResultPodcast
  podcastAuthor: ResultPodcastArtist
  shortFilm: never
  shortFilmArtist: never
  software: ResultUniversalSoftware
  song: ResultMusicTrack
  tvEpisode: ResultTvEpisode
  tvSeason: ResultTvSeason
  tvSoftware: ResultUniversalSoftware
}

type EntityAll =
  | EntityAudiobook
  | EntityEbook
  | EntityMovie
  | EntityMusic
  | EntityMusicVideo
  | EntityPodcast
  | EntityShortFilm
  | EntitySoftware
  | EntityTvShow
  | "allArtist"
  | "allTrack"

type EntityAudiobook = "audiobook" | "audiobookAuthor"

type EntityEbook = "ebook"

type EntityMovie = "movie" | "movieArtist"

type EntityMusic =
  | "album"
  | "mix"
  | "musicArtist"
  | "musicTrack"
  | "musicVideo"
  | "song"

type EntityMusicVideo = "musicArtist" | "musicVideo"

type EntityPodcast = "podcast" | "podcastAuthor"

type EntityShortFilm = "shortFilm" | "shortFilmArtist"

type EntitySoftware = "iPadSoftware" | "macSoftware" | "software" | "tvSoftware"

type EntityTvShow = "tvEpisode" | "tvSeason"

type AttributeAll =
  | "actorTerm"
  | "albumTerm"
  | "allArtistTerm"
  | "allTrackTerm"
  | "artistTerm"
  | "authorTerm"
  | "composerTerm"
  | "descriptionTerm"
  | "directorTerm"
  | "featureFilmTerm"
  | "genreIndex"
  | "keywordsTerm"
  | "languageTerm"
  | "mixTerm"
  | "movieArtistTerm"
  | "movieTerm"
  | "producerTerm"
  | "ratingIndex"
  | "ratingTerm"
  | "releaseYearTerm"
  | "shortFilmTerm"
  | "showTerm"
  | "songTerm"
  | "titleTerm"
  | "tvEpisodeTerm"
  | "tvSeasonTerm"

type AttributeAudiobook =
  | "authorTerm"
  | "genreIndex"
  | "ratingIndex"
  | "titleTerm"

type AttributeMovie =
  | "actorTerm"
  | "artistTerm"
  | "descriptionTerm"
  | "directorTerm"
  | "featureFilmTerm"
  | "genreIndex"
  | "movieArtistTerm"
  | "movieTerm"
  | "producerTerm"
  | "ratingIndex"
  | "ratingTerm"
  | "releaseYearTerm"
  | "shortFilmTerm"

type AttributeMusic =
  | "albumTerm"
  | "artistTerm"
  | "composerTerm"
  | "genreIndex"
  | "mixTerm"
  | "ratingIndex"
  | "songTerm"

type AttributeMusicVideo =
  | "albumTerm"
  | "artistTerm"
  | "genreIndex"
  | "ratingIndex"
  | "songTerm"

type AttributePodcast =
  | "artistTerm"
  | "authorTerm"
  | "descriptionTerm"
  | "genreIndex"
  | "keywordsTerm"
  | "languageTerm"
  | "ratingIndex"
  | "titleTerm"

type AttributeShortFilm =
  | "artistTerm"
  | "descriptionTerm"
  | "genreIndex"
  | "ratingIndex"
  | "shortFilmTerm"

type AttributeSoftware = "softwareDeveloper"

type AttributeTvShow =
  | "descriptionTerm"
  | "genreIndex"
  | "ratingIndex"
  | "showTerm"
  | "tvEpisodeTerm"
  | "tvSeasonTerm"

interface Result {
  artistId: number
  artistName: string
}

interface ResultArtist extends Result {
  artistLinkUrl: string
  primaryGenreId?: number
  primaryGenreName?: string
  wrapperType: "artist"
}

interface ResultMovieArtist extends ResultArtist {
  artistType: "Artist" | "Author"
}

interface ResultMusicArtist extends ResultArtist {
  amgArtistId: number
  artistType: "Artist" | "Author"
}

interface ResultPodcastArtist extends ResultArtist {
  artistType: "Podcast Artist"
}

interface ResultAudiobook extends Result {
  artistViewUrl: string
  artworkUrl100: string
  artworkUrl60: string
  collectionCensoredName: string
  collectionExplicitness: Explicitness
  collectionId: number
  collectionName: string
  collectionPrice: number
  collectionViewUrl: string
  copyright?: string
  country: string
  currency: string
  description: string
  previewUrl: string
  primaryGenreName: string
  releaseDate: string
  trackCount: number
  wrapperType: string
}

interface ResultSoftware extends Result {
  artistViewUrl: string
  artworkUrl100: string
  artworkUrl512: string
  artworkUrl60: string
  averageUserRating: number
  averageUserRatingForCurrentVersion: number
  bundleId: string
  contentAdvisoryRating: string
  currency: string
  currentVersionReleaseDate: string
  description: string
  fileSizeBytes: string
  formattedPrice: string
  genreIds: string[]
  genres: string[]
  isVppDeviceBasedLicensingEnabled: boolean
  languageCodesISO2A: string[]
  minimumOsVersion: string
  price: number
  primaryGenreId: number
  primaryGenreName: string
  releaseDate: string
  releaseNotes: string
  screenshotUrls: string[]
  sellerName: string
  sellerUrl?: string
  trackCensoredName: string
  trackContentRating: string
  trackId: number
  trackName: string
  trackViewUrl: string
  userRatingCount: number
  userRatingCountForCurrentVersion: number
  version: string
  wrapperType: "software"
}

interface ResultUniversalSoftware extends ResultSoftware {
  advisories: string[]
  appletvScreenshotUrls: string[]
  features: string[]
  ipadScreenshotUrls: string[]
  isGameCenterEnabled: boolean
  kind: "software"
  supportedDevices: string[]
}

interface ResultMacSoftware extends ResultSoftware {
  kind: "mac-software"
}

interface ResultEbook extends Result {
  artistIds: number[]
  artistViewUrl: string
  artworkUrl100: string
  artworkUrl60: string
  averageUserRating: number
  currency: string
  description: string
  fileSizeBytes: number
  formattedPrice: string
  genreIds: string[]
  genres: string[]
  kind: "ebook"
  price: number
  releaseDate: string
  trackCensoredName: string
  trackId: number
  trackName: string
  trackViewUrl: string
  userRatingCount: number
}

interface ResultCollection extends Result {
  artistViewUrl: string
  artworkUrl100: string
  artworkUrl60: string
  collectionCensoredName: string
  collectionExplicitness: Explicitness
  collectionId: number
  collectionName: string
  collectionPrice: number
  collectionViewUrl: string
  copyright?: string
  country: string
  currency: string
  primaryGenreName: string
  releaseDate: string
  trackCount: number
  wrapperType: "collection"
}

interface ResultAlbum extends ResultCollection {
  amgArtistId: number
  collectionType: "Album"
}

interface ResultTvSeason extends ResultCollection {
  collectionHdPrice?: number
  collectionType: "TV Season"
  contentAdvisoryRating: string
  longDescription: string
}

interface ResultTrack extends Result {
  artistViewUrl: string
  artworkUrl100: string
  artworkUrl30: string
  artworkUrl60: string
  collectionCensoredName: string
  collectionExplicitness: Explicitness
  collectionId: number
  collectionName: string
  collectionPrice: number
  collectionViewUrl: string
  country: string
  currency: string
  primaryGenreName: string
  releaseDate: string
  trackCensoredName: string
  trackCount: number
  trackExplicitness: Explicitness
  trackId: number
  trackName: string
  trackPrice: number
  trackViewUrl: string
  wrapperType: "track"
}

interface ResultMusicVideo extends ResultTrack {
  discCount: number
  discNumber: number
  kind: "music-video"
  previewUrl: string
  trackNumber: number
  trackTimeMillis: number
}

interface ResultPodcast extends ResultTrack {
  artworkUrl600: string
  collectionHdPrice?: number
  contentAdvisoryRating: string
  feedUrl: string
  genreIds: string[]
  genres: string[]
  kind: "podcast"
  trackHdPrice?: number
  trackHdRentalPrice?: number
  trackRentalPrice: number
}

interface ResultMusicTrack extends ResultTrack {
  discCount: number
  discNumber: number
  isStreamable: boolean
  kind: "song"
  previewUrl: string
  trackNumber: number
  trackTimeMillis: number
}

interface ResultTvEpisode extends ResultTrack {
  collectionHdPrice?: number
  contentAdvisoryRating: string
  discCount: number
  discNumber: number
  kind: "tv-episode"
  longDescription: string
  previewUrl: string
  shortDescription: string
  trackHdPrice?: number
  trackNumber: number
  trackTimeMillis: number
}

interface ResultMovie
  extends Omit<
    ResultTrack,
    | "artistId"
    | "collectionCensoredName"
    | "collectionId"
    | "collectionName"
    | "collectionViewUrl"
    | "trackCensoredName"
    | "trackCount"
  > {
  collectionHdPrice: number
  contentAdvisoryRating: string
  hasITunesExtras: boolean
  kind: "feature-movie"
  longDescription: string
  previewUrl: string
  shortDescription: string
  trackCensoredName: string
  trackHdPrice?: number
  trackHdRentalPrice?: number
  trackRentalPrice: number
  trackTimeMillis: number
}

type Explicitness = "cleaned" | "explicit" | "notExplicit"

type Country =
  | "ad"
  | "ae"
  | "af"
  | "ag"
  | "ai"
  | "al"
  | "am"
  | "an"
  | "ao"
  | "aq"
  | "ar"
  | "as"
  | "at"
  | "au"
  | "aw"
  | "az"
  | "ba"
  | "bb"
  | "bd"
  | "be"
  | "bf"
  | "bg"
  | "bh"
  | "bi"
  | "bj"
  | "bm"
  | "bn"
  | "bn"
  | "bo"
  | "bo"
  | "br"
  | "bs"
  | "bt"
  | "bv"
  | "bw"
  | "by"
  | "bz"
  | "ca"
  | "cc"
  | "cd"
  | "cf"
  | "cg"
  | "ch"
  | "ci"
  | "ci"
  | "ck"
  | "cl"
  | "cm"
  | "cn"
  | "co"
  | "cr"
  | "cu"
  | "cv"
  | "cx"
  | "cy"
  | "cz"
  | "de"
  | "dj"
  | "dk"
  | "dm"
  | "do"
  | "dz"
  | "ec"
  | "ee"
  | "eg"
  | "eh"
  | "er"
  | "es"
  | "et"
  | "fi"
  | "fj"
  | "fk"
  | "fm"
  | "fo"
  | "fr"
  | "ga"
  | "gb"
  | "gd"
  | "ge"
  | "gf"
  | "gg"
  | "gh"
  | "gi"
  | "gl"
  | "gm"
  | "gn"
  | "gp"
  | "gq"
  | "gr"
  | "gs"
  | "gt"
  | "gu"
  | "gw"
  | "gy"
  | "hk"
  | "hm"
  | "hn"
  | "hr"
  | "ht"
  | "hu"
  | "id"
  | "ie"
  | "il"
  | "im"
  | "in"
  | "io"
  | "iq"
  | "ir"
  | "is"
  | "it"
  | "je"
  | "jm"
  | "jo"
  | "jp"
  | "ke"
  | "kg"
  | "kh"
  | "ki"
  | "km"
  | "kn"
  | "kp"
  | "kr"
  | "kr"
  | "kw"
  | "ky"
  | "kz"
  | "la"
  | "lb"
  | "lc"
  | "li"
  | "lk"
  | "lr"
  | "ls"
  | "lt"
  | "lu"
  | "lv"
  | "ly"
  | "ly"
  | "ma"
  | "mc"
  | "md"
  | "me"
  | "mg"
  | "mh"
  | "mk"
  | "ml"
  | "mm"
  | "mm"
  | "mn"
  | "mo"
  | "mp"
  | "mq"
  | "mr"
  | "ms"
  | "mt"
  | "mu"
  | "mv"
  | "mw"
  | "mx"
  | "my"
  | "mz"
  | "na"
  | "nc"
  | "ne"
  | "nf"
  | "ng"
  | "ni"
  | "nl"
  | "no"
  | "np"
  | "nr"
  | "nu"
  | "nz"
  | "om"
  | "pa"
  | "pe"
  | "pf"
  | "pg"
  | "ph"
  | "pk"
  | "pl"
  | "pm"
  | "pn"
  | "pr"
  | "ps"
  | "pt"
  | "pw"
  | "py"
  | "qa"
  | "re"
  | "ro"
  | "rs"
  | "ru"
  | "ru"
  | "rw"
  | "sa"
  | "sb"
  | "sc"
  | "sd"
  | "se"
  | "sg"
  | "sh"
  | "si"
  | "sj"
  | "sk"
  | "sl"
  | "sm"
  | "sn"
  | "so"
  | "sr"
  | "ss"
  | "st"
  | "sv"
  | "sy"
  | "sz"
  | "tc"
  | "td"
  | "tf"
  | "tg"
  | "th"
  | "tj"
  | "tk"
  | "tl"
  | "tm"
  | "tn"
  | "to"
  | "tr"
  | "tt"
  | "tv"
  | "tw"
  | "tw"
  | "tz"
  | "ua"
  | "ug"
  | "um"
  | "us"
  | "uy"
  | "uz"
  | "va"
  | "vc"
  | "vc"
  | "vc"
  | "ve"
  | "ve"
  | "vg"
  | "vi"
  | "vn"
  | "vn"
  | "vu"
  | "wf"
  | "ws"
  | "ye"
  | "yt"
  | "za"
  | "zm"
  | "zw"
