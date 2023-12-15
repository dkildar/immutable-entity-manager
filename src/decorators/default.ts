import { MetadataKeys } from '../core/metadata-keys'
import { camelToSnake, snakeToCamel } from '../utils'

/**
 *
 * @param value
 * @param strict – Should be type checking
 * @constructor
 */
export function ImmutableEntityDefaultValue<T> (value: T): PropertyDecorator {
  return function (target, propertyKey) {
    const defaults = Reflect.getMetadata(MetadataKeys.Defaults, target) as Map<typeof propertyKey, unknown> | undefined ?? new Map()
    defaults.set(camelToSnake(propertyKey), value)
    defaults.set(snakeToCamel(propertyKey), value)
    Reflect.defineMetadata(MetadataKeys.Defaults, defaults, target)
  }
}
