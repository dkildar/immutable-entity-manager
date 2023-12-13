import { ImmutableEntity, ImmutableEntityManager } from '../core'
import { ImmutableEntityDefaultValue, ImmutableEntityTransient, ImmutableEntityTyped } from '../decorators'
import { describe, expect, test } from '@jest/globals'

@ImmutableEntity()
class Person {
  readonly firstName!: string
  readonly lastName!: string
  @ImmutableEntityTransient() readonly middleName!: string
  @ImmutableEntityDefaultValue(0) readonly age!: number
  @ImmutableEntityTyped(Date) readonly birthDate!: Date
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

  test('should parse and return typed non-immutable entityх property value', () => {
    const person = ImmutableEntityManager
      .getUniqueManager(Person)
      .parseFromJson({
        first_name: 'hello',
        birth_date: new Date().toISOString()
      })
      .build()

    expect(person.birthDate).toBeInstanceOf(Date)
  })
})
