/* eslint-env browser */

import data from './data'
import Element from './virtual-dom/Element'
import Text from './virtual-dom/Text'
import domToVirtualDom from './virtual-dom/domToVirtualDom'
import virtualDomToHtml from './virtual-dom/virtualDomToHtml'
import NO_ATTRIBUTES from './virtual-dom/NO_ATTRIBUTES'
import NO_EVENTS from './virtual-dom/NO_EVENTS'
import NO_CHILDREN from './virtual-dom/NO_CHILDREN'
import reconcile from './virtual-dom/reconcile'

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
    ])
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

let actual = domToVirtualDom(document.getElementById('root'))

render()
// setInterval(render, 1000)

function render() {
  const desired = new Element('div', { id: 'root', class: 'container' }, NO_EVENTS, [
    renderSignInForm(data),
    renderActiveSessionForm(data),
    renderActiveUser(data),
    new Element('span', NO_ATTRIBUTES, NO_EVENTS, [ new Text(new Date().toString()) ])
  ])

  desired.children.push(new Element('pre', NO_ATTRIBUTES, NO_EVENTS, [
    new Text(virtualDomToHtml(desired))
  ]))

  reconcile(actual.element.parentNode, actual, desired)

  actual = desired
}
