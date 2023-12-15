import { ImmutableEntity, ImmutableEntityManager } from '../core'
import { ImmutableEntityDefaultValue, ImmutableEntityTransient, ImmutableEntityTyped } from '../decorators'
import { describe, expect, test } from '@jest/globals'

@ImmutableEntity()
class Vehicle {
  readonly engine!: 'diesel' | 'petrol'
}

@ImmutableEntity()
class Car {
  readonly brand!: string
  @ImmutableEntityTyped(Vehicle) readonly type!: Vehicle
}

@ImmutableEntity()
class Pet {
  readonly name!: string
}

@ImmutableEntity()
class Person {
  readonly firstName!: string
  readonly lastName!: string
  readonly first_name!: string
  readonly last_name!: string
  @ImmutableEntityTransient() readonly middleName!: string
  @ImmutableEntityDefaultValue(0) readonly age!: number
  @ImmutableEntityTyped(Date) readonly birthDate!: Date
  @ImmutableEntityTyped(Pet) readonly pet!: Pet
  @ImmutableEntityTyped(Car) readonly car!: Car
}

describe('Positive tests', () => {
  test('should parse simple data', () => {
    const person = ImmutableEntityManager
      .getUniqueManager(Person)
      .parseFromJson({
        first_name: 'hello',
        last_name: 'world'
      })
      .build()
    expect(person.firstName).toBe('hello')
    expect(person.lastName).toBe('world')
  })

  test('should apply options', () => {
    let person = ImmutableEntityManager
      .getUniqueManager(Person)
      .parseFromJson({
        first_name: 'hello',
        last_name: 'world'
      })
      .withOptions({ snakeToCamelCase: true })
      .build()
    expect(person.firstName).toBe('hello')
    expect(person.lastName).toBe('world')

    person = ImmutableEntityManager
      .getUniqueManager(Person)
      .parseFromJson({
        firstName: 'hello',
        lastName: 'world'
      })
      .withOptions({ camelToSnakeCase: true })
      .build()
    expect(person.first_name).toBe('hello')
    expect(person.last_name).toBe('world')
  })

  test('should set properties', () => {
    const person = ImmutableEntityManager
      .getUniqueManager(Person)
      .getEmptyBuilder()
      .withProperty('firstName', 'hello')
      .withProperty('lastName', 'world')
      .build()

    expect(person.firstName).toBe('hello')
    expect(person.lastName).toBe('world')
  })

  test('should not parse transient property', () => {
    const person = ImmutableEntityManager
      .getUniqueManager(Person)
      .parseFromJson({
        first_name: 'hello',
        last_name: 'world',
        middle_name: '!',
        middleName: '!'
      })
      .withOptions({ camelToSnakeCase: true })
      .build()
    expect(person.middleName).not.toBe('!')
  })

  test('should set default value', () => {
    const person = ImmutableEntityManager
      .getUniqueManager(Person)
      .parseFromJson({
        first_name: 'hello',
        last_name: 'world'
      })
      .build()

    expect(person.age).toBe(0)
  })

  test('should parse and return typed non-immutable entity property value', () => {
    const person = ImmutableEntityManager
      .getUniqueManager(Person)
      .parseFromJson({
        first_name: 'hello',
        birth_date: new Date().toISOString()
      })
      .build()

    expect(person.birthDate).toBeInstanceOf(Date)
  })

  test('should parse and return typed immutable entity property value', () => {
    const person = ImmutableEntityManager
      .getUniqueManager(Person)
      .parseFromJson({
        first_name: 'hello',
        birth_date: new Date().toISOString(),
        pet: {
          name: 'Ellie'
        }
      })
      .build()

    expect(person.pet).toBeInstanceOf(Pet)
    expect(person.pet.name).toBe('Ellie')
  })

  test('should parse and return multiple typed levels immutable entity property', () => {
    const person = ImmutableEntityManager
      .getUniqueManager(Person)
      .parseFromJson({
        car: {
          brand: 'audi',
          type: {
            engine: 'petrol'
          }
        }
      })
      .build()

    expect(person.car).toBeInstanceOf(Car)
    expect(person.car.brand).toBe('audi')
    expect(person.car.type).toBeInstanceOf(Vehicle)
    expect(person.car.type.engine).toBe('petrol')
  })
})
