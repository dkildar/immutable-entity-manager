import { ImmutableEntity, ImmutableEntityInit, ImmutableEntityInitType } from '../core'
import {
  ImmutableEntityClone,
  ImmutableEntityCloneType,
  ImmutableEntityDefaultValue,
  ImmutableEntityTyped
} from '../decorators'
import { describe, expect, test } from '@jest/globals'

@ImmutableEntity({
  snakeToCamelCase: true
})
class Person {
  @ImmutableEntityInit() static init: ImmutableEntityInitType<Person>

  firstName!: string
  lastName!: string
  @ImmutableEntityDefaultValue('0') age!: number
  @ImmutableEntityTyped(Date) readonly birthDate!: Date
  @ImmutableEntityClone() clone!: ImmutableEntityCloneType<this>
}

describe('Test initialization', () => {
  test('should initialize', () => {
    const person = Person.init({
      first_name: 'hello',
      last_name: 'world'
    })
    expect(person.firstName).toBe('hello')
    expect(person.lastName).toBe('world')
  })
})
