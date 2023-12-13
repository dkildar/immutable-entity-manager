import { MetadataKeys } from '../core/metadata-keys'
import { camelToSnake, snakeToCamel } from '../utils'

/**
 *
 * @param value
 * @param strict – Should be type checking
 * @constructor
 */
export function ImmutableEntityDefaultValue<T> (value: T, strict = true): PropertyDecorator {
  return function (target, propertyKey) {
    const transients = Reflect.getMetadata(MetadataKeys.Defaults, target) as Map<typeof propertyKey, unknown> | undefined ?? new Map()
    transients.set(camelToSnake(propertyKey), value)
    transients.set(snakeToCamel(propertyKey), value)
    Reflect.defineMetadata(MetadataKeys.Defaults, transients, target)
  }
}
