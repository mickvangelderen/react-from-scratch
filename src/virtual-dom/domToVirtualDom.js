/* eslint-env browser */

import Comment from './Comment'
import Text from './Text'
import Element from './Element'
import NO_EVENTS from './NO_EVENTS'

function extractAttributes(node) {
  const attributes = {}
  for (let i = 0, a = node.attributes, l = a.length; i < l; i++) {
    const { name, value } = a[i]
    attributes[name] = value
  }
  return attributes
}

export default function domToVirtualDom(node) {
  let vnode
  switch (node.nodeType) {
    case Node.COMMENT_NODE:
      vnode = new Comment(node.nodeValue)
    break
    case Node.TEXT_NODE:
      vnode = new Text(node.nodeValue)
    break
    case Node.ELEMENT_NODE:
      vnode = new Element(
        node.tagName.toLowerCase(),
        extractAttributes(node),
        NO_EVENTS,
        Array.prototype.map.call(node.childNodes, domToVirtualDom)
      )
    break
    default:
      throw new Error(`Cannot create virtual dom for node of type ${node.nodeType}.`)

  }
  vnode.element = node
  return vnode
}
