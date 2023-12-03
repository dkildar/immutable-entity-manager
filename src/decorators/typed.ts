import { type KindOfClass } from '../core/bridge'

export function ImmutableEntityTyped<T> (Type: KindOfClass<T>): PropertyDecorator {
  return function (target, propertyKey) {
  }
}
