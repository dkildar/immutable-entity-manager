import { KindOfImmutableEntity } from './immutable-entity'
import { ImmutableEntityBuilder } from './immutable-entity-builder'

export class ImmutableEntityManager<T extends KindOfImmutableEntity> {
  private readonly Type: T

  constructor (Type: T) {
    this.Type = Type
  }

  static getUniqueManager<T extends KindOfImmutableEntity> (Type: T): ImmutableEntityManager<T> {
    return new ImmutableEntityManager<T>(Type)
  }

  parseFromJson (data: Record<string, unknown>): ImmutableEntityBuilder<T> {
    return new ImmutableEntityBuilder<T>(this.Type, data)
  }

  getEmptyBuilder (): ImmutableEntityBuilder<T> {
    return new ImmutableEntityBuilder<T>(this.Type, {})
  }
}
