import { type KindOfClass } from './bridge'
import { MetadataKeys } from './metadata-keys'
import { type ImmutableEntityInitType } from './init'
import 'reflect-metadata'
import { type ImmutableEntityOptions } from './immutable-entity-options'
import { buildImmutableEntityConstructor } from './immutable-entity-constructor'

export interface KindOfImmutableEntity<T> extends KindOfClass<T> {
  init: ImmutableEntityInitType<T>
}

export function ImmutableEntity (options: ImmutableEntityOptions = {
  snakeToCamelCase: true,
  camelToSnakeCase: false
}): ClassDecorator {
  return function (target) {
    Reflect.defineMetadata(MetadataKeys.ClassType, target, target)
    const OriginalClass = target as unknown as KindOfClass<unknown>
    const immutableEntityConstructor: any = buildImmutableEntityConstructor(OriginalClass, options)
    immutableEntityConstructor.prototype = OriginalClass.prototype
    return immutableEntityConstructor
  }
}
