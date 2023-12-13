import { type KindOfClass } from '../core/bridge'
import { MetadataKeys } from '../core/metadata-keys'
import { camelToSnake, snakeToCamel } from '../utils'

export function ImmutableEntityTyped<T> (Type: KindOfClass<T>): PropertyDecorator {
  return function (target, propertyKey) {
    const typedProperties = Reflect.getMetadata(MetadataKeys.Typed, target) as Map<typeof propertyKey, KindOfClass<T>> | undefined ?? new Map()
    typedProperties.set(camelToSnake(propertyKey), Type)
    typedProperties.set(snakeToCamel(propertyKey), Type)
    Reflect.defineMetadata(MetadataKeys.Typed, typedProperties, target)
  }
}
