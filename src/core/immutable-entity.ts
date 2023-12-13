import 'reflect-metadata'
import { type KindOfClass } from './bridge'
import { buildImmutableEntityConstructor } from './immutable-entity-constructor'

export interface KindOfImmutableEntity<T = unknown> extends KindOfClass<T> {
}

export function ImmutableEntity (): ClassDecorator {
  return function (target) {
    const OriginalClass = target as unknown as KindOfClass<unknown>
    const immutableEntityConstructor: any = buildImmutableEntityConstructor(OriginalClass)
    immutableEntityConstructor.prototype = OriginalClass.prototype
    return immutableEntityConstructor
  }
}
