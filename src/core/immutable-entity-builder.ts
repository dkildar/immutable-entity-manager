import { KindOfImmutableEntity } from './immutable-entity'
import { ImmutableEntityOptions } from './immutable-entity-options'
import { camelToSnake, snakeToCamel } from '../utils'
import { MetadataKeys } from './metadata-keys'
import { KindOfClass } from './bridge'

type Data = Record<string, { value: unknown, applyDecorators: boolean }>

export class ImmutableEntityBuilder<T extends KindOfImmutableEntity> {
  private readonly Type: T
  private readonly data: Data
  private options: ImmutableEntityOptions = {
    snakeToCamelCase: true,
    camelToSnakeCase: false
  }

  constructor (Type: T, data: Record<string, unknown>) {
    this.Type = Type
    this.data = Object.entries(data).reduce((acc, [property, value]) => ({
      ...acc,
      [property]: {
        value,
        applyDecorators: true
      }
    }), {})
  }

  build (): InstanceType<T> {
    return new this.Type(this.processData(this.data)) as InstanceType<T>
  }

  withOptions (options: ImmutableEntityOptions): this {
    this.options = options
    return this
  }

  withProperty<V>(key: keyof InstanceType<T>, value: V, applyDecorators = false): this {
    this.data[key as string] = {
      value,
      applyDecorators
    }
    return this
  }

  private processData (data: typeof this.data): Data {
    const transientProperties = Reflect.getMetadata(MetadataKeys.Transients, this.Type.prototype) as Set<string>
    const typedProperties = Reflect.getMetadata(MetadataKeys.Typed, this.Type.prototype) as Map<string, KindOfClass<T>>

    return Object.entries(data)
      .filter(([property, _]) => !transientProperties.has(property))
      .concat(Object.entries(this.getDefaults()))
      .reduce((acc, [property, value]) => this.transformProperty(property, value.value, value.applyDecorators, typedProperties, acc), {})
  }

  private getDefaults (): Data {
    const defaults = Reflect.getMetadata(MetadataKeys.Defaults, this.Type.prototype) as Map<string, unknown>
    return Array.from(defaults.entries()).reduce((acc, [property, value]) => ({
      ...acc,
      [property]: {
        value,
        applyDecorators: false
      }
    }), {})
  }

  private transformProperty<T> (property: string, value: unknown, applyDecorators: boolean, typedProperties: Map<string, KindOfClass<T>>, acc: T): T {
    let transformedPropertyName = property
    let nextValue = value

    if (!applyDecorators) {
      return {
        ...acc,
        [transformedPropertyName]: nextValue
      }
    }

    if (this.options.camelToSnakeCase === true) {
      transformedPropertyName = camelToSnake(property) as string
    } else if (this.options.snakeToCamelCase) {
      transformedPropertyName = snakeToCamel(property) as string
    }

    if (typedProperties.has(property)) {
      const isImmutableEntity = Reflect.getMetadata(MetadataKeys.ImmutableEntity, typedProperties.get(property)?.prototype)
      const PropertyType = typedProperties.get(property) as KindOfClass<T>
      if (isImmutableEntity === true && typeof value === 'object') {
        const propertyBuilder = new ImmutableEntityBuilder(PropertyType, value as Record<string, unknown>)
        nextValue = propertyBuilder.build()
      } else {
        nextValue = new PropertyType(value)
      }
    }

    return {
      ...acc,
      [transformedPropertyName]: nextValue
    }
  }
}
