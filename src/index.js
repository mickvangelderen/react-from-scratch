import data from './data'
import Element from './virtual-dom/Element'
import Text from './virtual-dom/Text'

const NO_ATTRIBUTES = {}
const NO_EVENTS = {}
const NO_CHILDREN = []

function has(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property)
}

function createVirtualDomFromDom(node) {
  let element
  switch(node.nodeType) {
    case Node.ELEMENT_NODE:
      element = new Element(
        node.tagName.toLowerCase(),
        Array.prototype.reduce.call(node.attributes, (map, { name, value }) => {
          map[name] = value
          return map
        }, {}),
        NO_EVENTS,
        Array.prototype.map.call(node.childNodes, createVirtualDomFromDom)
      )
      break
    case Node.TEXT_NODE:
      element = new Text(node.nodeValue)
      break
    case Node.COMMENT_NODE:
      element = new Comment(node.nodeValue)
      break
    default:
      throw new Error('Cannot convert nodeType ' + node.nodeType + ' to virtual dom.')
  }
  element.element = node
  return element
}

function reconcile(parent, actual, desired) {
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

  if (actual.constructor !== desired.constructor) {
    // Replace actual by desired.
    desired.mount(parent, actual.element)
    actual.unmount(parent)
    return
  }

  switch (actual.constructor) {
    case Element:
      if (actual.tag !== desired.tag) {
        // Replace actual by desired.
        desired.mount(parent, actual.element)
        actual.unmount(parent)
        return
      } else {
        Object.keys(actual.attributes).forEach(key => {
          if (has(desired.attributes, key)) {
            if (actual.attributes[key] !== desired.attributes[key]) {
              // Attribute changed.
              actual.element.setAttribute(key, desired.attributes[key])
              if (key === 'value') {
                actual.element.value = desired.attributes[key]
              }
            } else {
              // Attribute unchanged.
            }
          } else {
            // Attribute removed.
            actual.element.removeAttribute(key)
          }
        })
        Object.keys(desired.attributes).forEach(key => {
          if (has(actual.attributes, key)) {
            // Already handled
          } else {
            // Attribute added.
            actual.element.setAttribute(key, desired.attributes[key])
            if (key === 'value') {
              actual.element.value = desired.attributes[key]
            }
          }
        })

        Object.keys(actual.events).forEach(key => {
          if (has(desired.events, key)) {
            if (actual.events[key] !== desired.events[key]) {
              actual.element.removeEventListener(key, actual.events[key], false)
              actual.element.addEventListener(key, desired.events[key], false)
            }
          } else {
            actual.element.removeEventListener(key, actual.events[key], false)
          }
        })

        Object.keys(desired.events).forEach(key => {
          if (has(actual.events, key)) {
            // Already handled
          } else {
            actual.element.addEventListener(key, desired.events[key], false)
          }
        })

        for (let i = 0, l = Math.max(actual.children.length, desired.children.length); i < l; i++) {
          reconcile(actual.element, actual.children[i], desired.children[i])
        }

        desired.element = actual.element
        actual.element = null
      }
      break
    case Text:
    case Comment:
      if (actual.text !== desired.text) {
        actual.element.nodeValue = desired.text
      }
      desired.element = actual.element
      actual.element = null
      break
  }
}

function getRoot() { return document.getElementById('root') }

let actual = createVirtualDomFromDom(getRoot())

const ID_LENGTH = 6
const ID_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz0123456789'
const ID_CHARACTERS_LENGTH = ID_CHARACTERS.length

function generateId() {
    let id = ''
    for (let i = 0; i < ID_LENGTH; i++) {
      id = id + ID_CHARACTERS[Math.floor(Math.random()*ID_CHARACTERS_LENGTH)]
    }
    return id
}

function signInFormSubmit(event) {
  event.preventDefault()


  setTimeout(function() {
    const user = {
      id: generateId(),
      name: data.username
    }

    const session = {
      id: generateId(),
      userId: user.id,
      startDate: new Date().toISOString()
    }

    data.users.push(user)
    data.sessions.push(session)
    data.username = ''
    data.password = ''
    data.activeSessionId = session.id
    window.history.pushState(null, null, `${location.pathname}?activeSessionId=${data.activeSessionId}`)
    data.signInFormDisabled = false

    render()
  }, 1000)

  data.signInFormDisabled = true

  render()
}

function signInFormUsernameInput(event) {
  console.log(event.target.value)

  data.username = event.target.value

  if (data.username === '') {
    data.signInFormValidUsername = false
  } else {
    data.signInFormValidUsername = true
  }

  render()
}

function signInFormPasswordChange(event) {
  data.password = event.target.value

  render()
}

function renderSignInForm(data) {
  return new Element('form', NO_ATTRIBUTES, { submit: signInFormSubmit }, [
    new Element('div', { class: [ 'form-group', ...data.signInFormValidUsername ? [ 'has-success' ] : [ 'has-error' ] ].join(' ') }, NO_EVENTS, [
      new Element('label', { for: 'username' }, NO_EVENTS, [ new Text('Username') ]),
      new Element('input', { type: 'text', class: 'form-control', id: 'username', placeholder: 'Username', value: data.username }, { input: signInFormUsernameInput }, NO_CHILDREN),
      ...data.signInFormValidUsername ? [] : [ new Element('span', { class: 'help-block' }, NO_EVENTS, [ new Text('Please provide a username.') ]) ]
    ]),
    new Element('div', { class: 'form-group' }, NO_EVENTS, [
      new Element('label', { for: 'password' }, NO_EVENTS, [ new Text('Password') ]),
      new Element('input', { type: 'password', class: 'form-control', id: 'password', placeholder: 'Password', value: data.password }, { change: signInFormPasswordChange }, NO_CHILDREN)
    ]),
    new Element('button', { class: 'btn btn-primary', type: 'submit', disabled: data.signInFormDisabled }, NO_EVENTS, [ new Text('Sign In') ])
  ])
}

function activeSessionFormActiveSessionChange(event) {
  data.activeSessionId = event.target.value
  window.history.pushState(null, null, `${location.pathname}?activeSessionId=${data.activeSessionId}`)

  render()
}

function renderActiveSessionForm(data) {
  return new Element('form', NO_ATTRIBUTES, NO_EVENTS, [
    new Element('div', { class: 'form-group' }, NO_EVENTS, [
      new Element('label', { for: 'active-session' }, NO_EVENTS, [ new Text('Active Session') ]),
      new Element('select', { class: 'form-control', id: 'active-session' }, { change: activeSessionFormActiveSessionChange },
        data.sessions.map(session => {
          const user = data.users.filter(user => user.id === session.userId)[0]
          return new Element('option', { value: session.id, selected: session.id === data.activeSessionId }, NO_EVENTS, [ new Text(user.name) ])
        })
      )
    ]),
  ])
}

function renderActiveUser(data) {
  const activeSession = data.sessions.filter(({ id }) => id === data.activeSessionId)[0]
  const activeUser = activeSession
    ? data.users.filter(({ id }) => id === activeSession.userId)[0]
    : undefined
  const activeItems = activeUser
  ? data.items.filter(({ userId }) => userId === activeUser.id)
  : []

  return new Element('div', NO_ATTRIBUTES, NO_EVENTS, activeUser
    ? [
      new Element('p', NO_ATTRIBUTES, NO_EVENTS, [ new Text('Welcome ' + activeUser.name + '.') ]),
      renderItems(activeItems)
    ] : [
      new Element('p', NO_ATTRIBUTES, NO_EVENTS, [ new Text('Please sign in.') ])
    ]
  )
}

function renderItems(items) {
  return new Element('ol', NO_ATTRIBUTES, NO_EVENTS, items.map(item =>
    new Element('li', { 'data-key': item.id }, NO_EVENTS, [ new Text(item.title) ])
  ))
}

function render() {
  const desired = new Element('div', { id: 'root', class: 'container' }, NO_EVENTS, [
    renderSignInForm(data),
    renderActiveSessionForm(data),
    renderActiveUser(data),
    new Element('span', NO_ATTRIBUTES, NO_EVENTS, [ new Text(new Date().toString()) ])
  ])

  reconcile(getRoot().parentNode, actual, desired)

  actual = desired
}

render()
// setInterval(render, 1000)
