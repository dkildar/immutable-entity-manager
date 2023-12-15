export function camelToSnake (str: string | symbol): string | symbol {
  if (typeof str === 'string') {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
  }
  return str
}
