import Node from './Node'

export function stringify(value) {
  return JSON.stringify(value)
}

export const isArray = Array.isArray

export function isObject(value) {
  return typeof value === 'object' && value !== null
}

export function expectObject(value) {
  if (!isObject(value)) throw new TypeError(`Expected an object but got ${stringify(value)}.`)
  return value
}

export function isString(value) {
  return typeof value === 'string'
}

export function expectString(value) {
  if (!isString(value)) throw new TypeError(`Expected a string but got ${stringify(value)}.`)
  return value
}

export function expectArray(value) {
  if (!isArray(value)) throw new TypeError(`Expected an array but got ${stringify(value)}.`)
  return value
}

export function isFunction(value) {
  return typeof value === 'function'
}

export function expectFunction(value) {
  if (!isFunction(value)) throw new TypeError(`Expected a function but got ${stringify(value)}.`)
  return value
}

export function isNode(value) {
  return value instanceof Node
}

export function expectNode(value) {
  if (!isNode(value)) throw new TypeError(`Expected a Node but got ${stringify(value)}.`)
  return value
}

export function expectAttributes(value) {
  expectObject(value)
  Object.keys(value).forEach(key => {
    expectString(key)
    expectAttributeValue(value[key])
  })
  return value
}

export function isBoolean(value) {
  return typeof value === 'boolean'
}

export function isUndefined(value) {
  return value === void 0
}

export function expectAttributeValue(value) {
  if (!(isString(value) || isBoolean(value) || isUndefined(value))) throw new TypeError(`Expected attribute value to be a string, boolean or undefined but got ${stringify(value)}.`)
  return value
}

export function expectEvents(value) {
  expectObject(value)
  Object.keys(value).forEach(key => {
    expectString(key)
    expectFunction(value[key])
  })
  return value
}

export function expectChildren(value) {
  expectArray(value)
  value.forEach(child => {
    expectNode(child)
  })
  return value
}
