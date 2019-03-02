export function getValues(obj: Object) {
  return Object.keys(obj).map(key => obj[key])
}
