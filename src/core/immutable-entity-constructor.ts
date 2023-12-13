import { type KindOfClass } from './bridge'

function assignImmutableEntityProperties<T> (instance: T, data: Record<string, unknown>): void {
  Object.entries(data).forEach(([property, value]) =>
    Object.defineProperty(instance, property, {
      value
    })
  )
}

export function buildImmutableEntityConstructor<T = unknown> (
  OriginalClass: KindOfClass<T>
) {
  return function (...args: ConstructorParameters<any>) {
    const data = args[0] as Record<string, unknown>
    const instance = new OriginalClass()

    assignImmutableEntityProperties(instance, data)

    return instance
  }
}
