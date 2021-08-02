interface RegExpMatchArray<T extends Record<string, any>> {
  groups: T
}

export function matchGroups<T extends Record<string, any>>(
  string: string,
  regex: RegExp
) {
  const { groups } = (string.match(regex) ?? {}) as RegExpMatchArray<Partial<T>>

  return groups ?? {}
}
