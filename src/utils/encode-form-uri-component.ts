/**.
 * Encode a value into a URI component but escape spaces as `+`.
 *
 * @param value - The value to encode.
 */
export function encodeURIFormComponent(value: boolean | number | string) {
  return encodeURIComponent(value).replace(/%20/g, "+")
}
