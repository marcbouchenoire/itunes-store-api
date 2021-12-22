interface RegExpMatchArray<T extends Record<string, any>> {
  groups: T
}

/**
 * Safely access matched groups from a regular expression.
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
