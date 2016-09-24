import Node from './Node'

import isArray from 'checko/isArray'
import isObject from 'checko/isObject'
import expectObject from 'checko/expectObject'
import isString from 'checko/isString'
import expectString from 'checko/expectString'
import expectArray from 'checko/expectArray'
import isFunction from 'checko/isFunction'
import expectFunction from 'checko/expectFunction'
import isBoolean from 'checko/isBoolean'
import isUndefined from 'checko/isUndefined'

export function stringify(value) {
  return JSON.stringify(value)
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
