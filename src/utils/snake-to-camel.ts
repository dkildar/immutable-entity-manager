export function snakeToCamel (str: string): string {
  return str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  )
}