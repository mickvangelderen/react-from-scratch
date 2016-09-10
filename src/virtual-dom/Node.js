import { expectChildren } from './util'

export default function Node() {
  if (this.constructor === Node) throw new Error('Cannot instantiate abstract class Node.')
  this.element = null
}

Node.prototype.children = []

Node.prototype.mount = function(parent, before) {
  throw new Error('mount was not implemented.')
}

Node.prototype.unmount = function(parent) {
  parent.removeChild(this.element)
  this.element = null
}
