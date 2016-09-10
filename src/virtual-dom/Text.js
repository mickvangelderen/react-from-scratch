import Node from './Node'

export default function Text(text) {
  Node.call(this)
  this.text = text
}

Text.prototype = Object.create(Node.prototype, {
  constructor: {
    value: Text,
    writable: true,
    enumerable: false,
    configurable: true
  }
})

Text.prototype.toString = function() {
  return `"${this.text}"`
}

Text.prototype.mount = function(parent, before) {
  const element = this.element = document.createTextNode(this.text)
  
  element['@@virtual'] = this

  if (before) {
    parent.insertBefore(element, before)
  } else {
    parent.appendChild(element)
  }
}
