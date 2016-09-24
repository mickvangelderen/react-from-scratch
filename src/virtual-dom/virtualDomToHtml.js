import Comment from './Comment'
import Text from './Text'
import Element from './Element'

function attributesToHtml(attributes) {
  const keys = Object.keys(attributes)
  if (keys.length === 0) return ''
  return keys.reduce((string, key) => `${string} ${key}="${attributes[key]}"`, '')
}

var shouldOmitClosingTag = {
  'area': true,
  'base': true,
  'br': true,
  'col': true,
  'embed': true,
  'hr': true,
  'img': true,
  'input': true,
  'keygen': true,
  'link': true,
  'meta': true,
  'param': true,
  'source': true,
  'track': true,
  'wbr': true,
  // NOTE: menuitem's close tag should be omitted, but that causes problems.
}

export default function virtualDomToHtml(node, prefix = '') {
  switch (node.constructor) {
    case Comment:
      return `${prefix}<!--${node.text}-->\n`
    case Text:
      return `${prefix}${node.text}\n`
    case Element:
      return shouldOmitClosingTag[node.tag] && node.children.length === 0
        ? `${prefix}<${node.tag}${attributesToHtml(node.attributes)}/>\n`
        : `${prefix}<${node.tag}${attributesToHtml(node.attributes)}>\n${node.children.map(node => virtualDomToHtml(node, prefix + '  ')).join('')}${prefix}</${node.tag}>\n`
  }
}
