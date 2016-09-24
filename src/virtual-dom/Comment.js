import Node from './Node'

export default function Comment(text) {
  Node.call(this)
  this.text = text
}

Comment.prototype = Object.create(Node.prototype, {
  constructor: {
    value: Comment,
    writable: true,
    enumerable: false,
    configurable: true
  }
})

Comment.prototype.mount = function(parent, before) {
  const element = document.createComment(this.text)

  element['@@virtual'] = this

  if (before) {
    parent.insertBefore(element, before)
  } else {
    parent.appendChild(element)
  }
}
