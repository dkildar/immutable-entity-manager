import { type KindOfImmutableEntity } from './immutable-entity'
import { MetadataKeys } from './metadata-keys'
import 'reflect-metadata'

export type ImmutableEntityInitType<T> = (data: object) => T
export function ImmutableEntityInit<T extends KindOfImmutableEntity<unknown>> (): PropertyDecorator {
  return function (target, propertyKey) {
    Reflect.set(target, propertyKey, function (...args: any[]): T {
      const Type = Reflect.getMetadata(MetadataKeys.ClassType, target)
      return new Type()
    })
  }
}

export function ImmutableEntityChild<T> (Type: KindOfImmutableEntity<T>): PropertyDecorator {
  return function (target, propertyKey) {

  }
}
