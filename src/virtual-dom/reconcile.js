import Comment from './Comment'
import Element from './Element'
import Text from './Text'

function noop() {}

function patchObjectShallow(actual, desired, { add = noop, update = noop, remove = noop }) {
  Object.keys(actual).forEach(key => {
    if (desired.hasOwnProperty(key)) {
      if (actual[key] === desired[key]) {
        // Property hasn't changed.
      } else {
        update(key, actual[key], desired[key])
      }
    } else {
      remove(key, actual[key])
    }
  })
  Object.keys(desired).forEach(key => {
    if (!actual.hasOwnProperty(key)) {
      // This has already been handled.
    } else {
      add(key, desired[key])
    }
  })
}

export default function reconcile(parent, actual, desired) {
  if (actual) {
    if (!actual.element) throw new Error('Expected actual to have an associated element.')
    if (desired) {
      // Proceed as normal.
    } else {
      // Remove actual.
      actual.unmount(parent)
      return
    }
  } else {
    if (desired) {
      // Add desired.
      desired.mount(parent)
      return
    } else {
      throw new Error('Cannot reconcile two non-existing nodes.')
    }
  }

  const element = actual.element

  if (actual.constructor !== desired.constructor) {
    // Replace actual by desired.
    desired.mount(parent, element)
    actual.unmount(parent)
    return
  }

  switch (actual.constructor) {
    case Element:
      if (actual.tag !== desired.tag) {
        // Replace actual by desired.
        desired.mount(parent, element)
        actual.unmount(parent)
        return
      } else {
        // Update the attributes.
        patchObjectShallow(actual.attributes, desired.attributes, {
          add: function(key, desired) {
            element.setAttribute(key, desired)
          },
          update: function(key, actual, desired) {
            element.setAttribute(key, desired)
          },
          remove: function(key) {
            element.removeAttribute(key)
          }
        })

        // Update the events.
        patchObjectShallow(actual.events, desired.events, {
          add: function(key, desired) {
            element.addEventListener(key, desired, false)
          },
          update: function(key, actual, desired) {
            element.removeEventListener(key, actual, false)
            element.addEventListener(key, desired, false)
          },
          remove: function(key, actual) {
            element.removeEventListener(key, actual, false)
          }
        })

        for (let i = 0, l = Math.max(actual.children.length, desired.children.length); i < l; i++) {
          reconcile(element, actual.children[i], desired.children[i])
        }

        desired.element = element
      }
      break
    case Text:
    case Comment:
      if (actual.text !== desired.text) {
        element.nodeValue = desired.text
      }
      desired.element = element
      break
  }
}
