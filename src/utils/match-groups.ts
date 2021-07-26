import { PlainObject } from "../types"

interface RegExpMatchArray<T extends PlainObject<string>> {
  groups: T
}

export function matchGroups<T extends PlainObject<string>>(
  string: string,
  regex: RegExp
) {
  const { groups } = (string.match(regex) ?? {}) as RegExpMatchArray<T>

  return groups
}
