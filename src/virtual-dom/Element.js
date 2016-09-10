import Node from './Node'
import { expectAttributes } from './util'
import { expectChildren } from './util'
import { expectEvents } from './util'
import { expectString } from './util'

export default function Element(tag, attributes, events, children) {
  Node.call(this, children)
  this.tag = expectString(tag)
  this.attributes = Object.keys(expectAttributes(attributes)).reduce((map, key) => {
    const value = attributes[key]
    if (typeof value === 'string') map[key] = value
    else if (value === true) map[key] = ''
    return map
  }, {})
  this.events = expectEvents(events)
  this.children = expectChildren(children)
}

Element.prototype = Object.create(Node.prototype, {
  constructor: {
    value: Element,
    writable: true,
    enumerable: false,
    configurable: true
  }
})

Element.prototype.toString = function() {
  const { tag, attributes, children } = this

  const a = Object.keys(attributes).map(key => `${key}="${attributes[key]}"`).join(' ')

  const c = children.map(child => '\t' + child.toString()).join('\n')

  return `<${tag} ${a}>\n${c}\n</${tag}>`
}

Element.prototype.mount = function(parent, before) {
  const { tag, attributes, events, children } = this

  const element = this.element = document.createElement(tag)

  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key])
  })

  Object.keys(events).forEach(key => {
    element.addEventListener(key, events[key])
  })

  children.forEach(child => {
    child.mount(element)
  })

  if (before) {
    parent.insertBefore(element, before)
  } else {
    parent.appendChild(element)
  }
}
