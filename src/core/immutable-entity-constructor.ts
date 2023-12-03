import { camelToSnake, snakeToCamel } from '../utils'
import { type KindOfClass } from './bridge'
import { type ImmutableEntityOptions } from './immutable-entity-options'

function assignImmutableEntityProperties<T> (instance: T, options: ImmutableEntityOptions, data: Record<string, unknown>): void {
  Object.entries(data).forEach(([property, value]) => {
    let transformedPropertyName = property
    if (options?.camelToSnakeCase === true) {
      transformedPropertyName = camelToSnake(property)
    } else if (options?.snakeToCamelCase) {
      transformedPropertyName = snakeToCamel(property)
    }

    Object.defineProperty(instance, transformedPropertyName, {
      value: data[property]
    })
  })
}

export function buildImmutableEntityConstructor<T = unknown> (
  OriginalClass: KindOfClass<T>,
  options: ImmutableEntityOptions
) {
  return function (...args: ConstructorParameters<any>) {
    const data = args[0] as Record<string, unknown>
    const instance = new OriginalClass()

    assignImmutableEntityProperties(instance, options, data)

    return instance
  }
}
