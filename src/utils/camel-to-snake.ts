export function camelToSnake (str: string | symbol): string | symbol {
  if (typeof str === 'string') {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
  }
  return str
}
