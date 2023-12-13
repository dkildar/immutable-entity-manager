import { MetadataKeys } from '../core/metadata-keys'
import { camelToSnake, snakeToCamel } from '../utils'

export function ImmutableEntityTransient (): PropertyDecorator {
  return function (target, propertyKey) {
    const transients = Reflect.getMetadata(MetadataKeys.Transients, target) as Set<typeof propertyKey> | undefined ?? new Set()
    transients.add(camelToSnake(propertyKey)).add(snakeToCamel(propertyKey))
    Reflect.defineMetadata(MetadataKeys.Transients, transients, target)
  }
}
