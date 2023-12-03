export interface ImmutableEntityTransformOptions {
  beforeTyped?: boolean
  afterTyped?: boolean
}

export function ImmutableEntityTransform (options: ImmutableEntityTransformOptions = { beforeTyped: true, afterTyped: false }): PropertyDecorator {
  return function (target, propertyKey) {

  }
}
