
# Immutable entites manager


This initiative enables developers to leverage entities in Node.js projects, whether on the client side or in any other Node.js environment.

## Installation


```bash
npm install immutable-entity-manager
```
```bash
yarn add immutable-entity-manager
```

## Usage/Examples
This package is built on the foundation of the manager and builder patterns. Each immutable entity has its own dedicated manager, designed to assist in data parsing. The manager, in turn, yields a builder class responsible for handling various tasks such as processing decorators, applying properties, and more.

This package uses Typescript under-the-hood which means that it generates return type, properties name, etc.

```typescript
@ImmutableEntity()
class Person {
  readonly firstName!: string
  readonly lastName!: string
  @ImmutableEntityTyped(Date) readonly birthDate!: Date
}

const person = ImmutableEntityManager
    .getUniqueManager(Person)
    .parseFromJson({
        first_name: 'hello',
        last_name: 'world',
        birth_date: '2023-12-15T11:01:22.041Z'
    })
    .build()

expect(person.firstName).toBe('hello')
expect(person.lastName).toBe('world')
expect(person.birthDate).toBeInstanceOf(Date)
```


## API Reference

### Decorators
- `@ImmutableEntity` – mark a class as immutable entity;
- `@ImmutableEntityTransient` – mark a class property as transient. It means that property won't be handled by manager and builder, also value won't be set;
- `@ImmutableEntityDefaultValue(0)` – sets the default value for property if JSON data don't have value;
- `@ImmutableEntityTyped(Date)` – mark a property as typed. Argument could be any class or other one immutable entity. In this case, it will apply immutable entity rules for this property otherwise it will create a new class with value as argument;

### Manager
Manager represents the parser of entity.
```typescript
ImmutableEntityManager
    .getUniqueManager(Person)
    .parseFromJson({
        ...
    })
```

### Builder
Builder represents the standard entity builder pattern. Builder is exported and could be created directly but the best way is using of the manager parsing result object.
```typescript
const builder = ImmutableEntityManager
    .getUniqueManager(Person)
    .parseFromJson({
        ...
    })
```
#### Property setting
Builder allows to set the values for properties. It will override data given by manager in a parsing stage.
- Arguments: `propertyName: string, value: any, applyDecorators: boolean`. Apply decorators allow to set: should the builder apply this package decorators before setting the value.
```typescript
builder
    .withProperty('someProperty', someValue)
    .withProperty('someAnotherProperty', someAnotherValue)
```
#### Options setting
Builder allow to choose conversion of properties: camel to snake or viceversa. `snakeToCamelCase` is default.
```typescript
builder.withOptions({ camelToSnakeCase: true })
```
## Roadmap

- Add transformation of property before parsing or in `withProperty`;

- Allow to developers set custom constructor for entity which couldn't be initialized with `@ImmutableEntityTyped` decorator;

- Add entity cloning;

- Add React helper hooks for managing entities reactively;

- Add different parser sources like Buffer, string etc.;

- Add global singleton managers for each entity;

- Allow to build entities w/o case conversion or with custom conversion function;


## License

[MIT](https://choosealicense.com/licenses/mit/)

