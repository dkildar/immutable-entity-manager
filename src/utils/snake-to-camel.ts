export function snakeToCamel (str: string | symbol): string | symbol {
  if (typeof str === 'string') {
    return str.toLowerCase().replace(/([-_][a-z])/g, group =>
      group
        .toUpperCase()
        .replace('-', '')
        .replace('_', '')
    )
  }
  return str
}
