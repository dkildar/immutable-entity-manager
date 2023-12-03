interface CamelToSnakeOptions {
  camelToSnakeCase: true
  snakeToCamelCase?: false
}

interface SnakeToCamelOptions {
  camelToSnakeCase?: false
  snakeToCamelCase: true
}

export type ImmutableEntityOptions = CamelToSnakeOptions | SnakeToCamelOptions
