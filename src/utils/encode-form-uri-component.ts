export function encodeURIFormComponent(value: boolean | number | string) {
  return encodeURIComponent(value).replace(/%20/g, "+")
}
