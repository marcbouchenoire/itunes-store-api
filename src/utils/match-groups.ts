interface RegExpMatchArray<T extends Record<string, any>> {
  /**
   * An object of named capturing groups.
   */
  groups: T
}

/**
 * Safely access named capturing groups from a regular expression.
 *
 * @param string - The string against which to match the regular expression.
 * @param regex - The regular expression to match.
 */
export function matchGroups<T extends Record<string, any>>(
  string: string,
  regex: RegExp
) {
  const { groups } = (string.match(regex) ?? {}) as RegExpMatchArray<Partial<T>>

  return groups ?? {}
}
