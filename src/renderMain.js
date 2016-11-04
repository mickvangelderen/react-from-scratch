/* eslint-env shared-node-browser */
import data from './data'
import Element from './virtual-dom/Element'
import NO_ATTRIBUTES from './virtual-dom/NO_ATTRIBUTES'
import NO_CHILDREN from './virtual-dom/NO_CHILDREN'
import NO_EVENTS from './virtual-dom/NO_EVENTS'
import render from './render'
import Text from './virtual-dom/Text'

// const ID_LENGTH = 6
// const ID_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz0123456789'
// const ID_CHARACTERS_LENGTH = ID_CHARACTERS.length
//
// function generateId() {
//     let id = ''
//     for (let i = 0; i < ID_LENGTH; i++) {
//       id = id + ID_CHARACTERS[Math.floor(Math.random()*ID_CHARACTERS_LENGTH)]
//     }
//     return id
// }
//
// function signInFormSubmit(event) {
//   event.preventDefault()
//
//   setTimeout(function() {
//     const user = {
//       id: generateId(),
//       name: data.username
//     }
//
//     const session = {
//       id: generateId(),
//       userId: user.id,
//       startDate: new Date().toISOString()
//     }
//
//     data.users.push(user)
//     data.sessions.push(session)
//     data.username = ''
//     data.password = ''
//     data.activeSessionId = session.id
//     window.history.pushState(null, null, `${location.pathname}?activeSessionId=${data.activeSessionId}`)
//     data.signInFormDisabled = false
//
//     render()
//   }, 1000)
//
//   data.signInFormDisabled = true
//
//   render()
// }
//
// function signInFormUsernameInput(event) {
//   data.username = event.target.value
//
//   if (data.username === '') {
//     data.signInFormValidUsername = false
//   } else {
//     data.signInFormValidUsername = true
//   }
//
//   render()
// }
//
// function signInFormPasswordChange(event) {
//   data.password = event.target.value
//
//   render()
// }
//
// function renderSignInForm(data) {
//   return new Element('form', NO_ATTRIBUTES, { submit: signInFormSubmit }, [
//     new Element('div', { class: [ 'form-group', ...data.signInFormValidUsername ? [ 'has-success' ] : [ 'has-error' ] ].join(' ') }, NO_EVENTS, [
//       new Element('label', { for: 'username' }, NO_EVENTS, [ new Text('Username') ]),
//       new Element('input', { type: 'text', class: 'form-control', id: 'username', placeholder: 'Username', value: data.username }, { input: signInFormUsernameInput }, NO_CHILDREN),
//       ...data.signInFormValidUsername ? [] : [ new Element('span', { class: 'help-block' }, NO_EVENTS, [ new Text('Please provide a username.') ]) ]
//     ]),
//     new Element('div', { class: 'form-group' }, NO_EVENTS, [
//       new Element('label', { for: 'password' }, NO_EVENTS, [ new Text('Password') ]),
//       new Element('input', { type: 'password', class: 'form-control', id: 'password', placeholder: 'Password', value: data.password }, { change: signInFormPasswordChange }, NO_CHILDREN)
//     ]),
//     new Element('button', { class: 'btn btn-primary', type: 'submit', disabled: data.signInFormDisabled }, NO_EVENTS, [ new Text('Sign In') ])
//   ])
// }
//
// function activeSessionFormActiveSessionChange(event) {
//   data.activeSessionId = event.target.value
//   window.history.pushState(null, null, `${location.pathname}?activeSessionId=${data.activeSessionId}`)
//
//   render()
// }
//
// function renderActiveSessionForm(data) {
//   return new Element('form', NO_ATTRIBUTES, NO_EVENTS, [
//     new Element('div', { class: 'form-group' }, NO_EVENTS, [
//       new Element('label', { for: 'active-session' }, NO_EVENTS, [ new Text('Active Session') ]),
//       new Element('select', { class: 'form-control', id: 'active-session' }, { change: activeSessionFormActiveSessionChange },
//         data.sessions.map(session => {
//           const user = data.users.filter(user => user.id === session.userId)[0]
//           return new Element('option', { value: session.id, selected: session.id === data.activeSessionId }, NO_EVENTS, [ new Text(user.name) ])
//         })
//       )
//     ])
//   ])
// }
//
// function renderActiveUser(data) {
//   const activeSession = data.sessions.filter(({ id }) => id === data.activeSessionId)[0]
//   const activeUser = activeSession
//     ? data.users.filter(({ id }) => id === activeSession.userId)[0]
//     : undefined
//   const activeItems = activeUser
//   ? data.items.filter(({ userId }) => userId === activeUser.id)
//   : []
//
//   return new Element('div', NO_ATTRIBUTES, NO_EVENTS, activeUser
//     ? [
//       new Element('p', NO_ATTRIBUTES, NO_EVENTS, [ new Text('Welcome ' + activeUser.name + '.') ]),
//       renderItems(activeItems)
//     ] : [
//       new Element('p', NO_ATTRIBUTES, NO_EVENTS, [ new Text('Please sign in.') ])
//     ]
//   )
// }
//
// function renderItems(items) {
//   return new Element('ol', NO_ATTRIBUTES, NO_EVENTS, items.map(item =>
//     new Element('li', { 'data-key': item.id }, NO_EVENTS, [ new Text(item.title) ])
//   ))
// }

function renderPage(data) {
  switch(data.path) {
    case '/':
    case '/index.html':
      return new Text('Home')
    case '/users.html':
      return new Text('Users')
    case '/statistics.html':
      return new Text('Statistics')
    default:
      return new Text('Page not found!')
  }
}

export default function renderMain(data) {
  return new Element('div', { id: 'root', class: 'container-fluid' }, NO_EVENTS, [
    new Element('div', NO_ATTRIBUTES, NO_EVENTS, [
      // Navigation
      new Element('div', { class: 'col-sm-3' }, NO_EVENTS, [
        new Element('ul', { class: 'nav nav-pills nav-stacked' }, NO_EVENTS, [
          // Session Dropdown
          new Element('li', NO_ATTRIBUTES, NO_EVENTS, [
            new Element('a', { id: 'session-dropdown', class: 'dropdown-toggle', href: '#', 'data-toggle': 'dropdown' }, NO_EVENTS, [
              new Text('Mick van Gelderen' + ' '),
              new Element('span', { class: 'caret' }, NO_EVENTS, NO_CHILDREN)
            ]),
            new Element('ul', { class: 'dropdown-menu' }, NO_EVENTS, [
              new Element('li', { class: 'dropdown-header' }, NO_EVENTS, [ new Text('Current Session') ]),
              new Element('li', NO_ATTRIBUTES, NO_EVENTS, [
                new Element('a', { href: '#' }, NO_EVENTS, [ new Text('Sign Out') ])
              ]),
              new Element('li', { class: 'divider', role: 'separator' }, NO_EVENTS, NO_CHILDREN),
              new Element('li', { class: 'dropdown-header' }, NO_EVENTS, [ new Text('Switch Session') ]),
              new Element('li', NO_ATTRIBUTES, NO_EVENTS, [
                new Element('a', { href: '#' }, NO_EVENTS, [ new Text('Tim Paymans') ])
              ]),
              new Element('li', NO_ATTRIBUTES, NO_EVENTS, [
                new Element('a', { href: '#' }, NO_EVENTS, [ new Text('Hugo Meeuwes') ])
              ]),
              new Element('li', { class: 'divider', role: 'separator' }, NO_EVENTS, NO_CHILDREN),
              new Element('li', NO_ATTRIBUTES, NO_EVENTS, [
                new Element('a', { href: '#' }, NO_EVENTS, [ new Text('Sign In') ])
              ])
            ]),
          ]),
          new Element('li', NO_ATTRIBUTES, NO_EVENTS, [
            new Element('a', { href: 'users.html' }, NO_EVENTS, [
              new Text('Users')
            ])
          ]),
          new Element('li', NO_ATTRIBUTES, NO_EVENTS, [
            new Element('a', { href: 'statistics.html' }, NO_EVENTS, [
              new Text('Statistics')
            ])
          ])
        ])
      ]),
      // Content
      new Element('div', { class: 'col-sm-9' }, NO_EVENTS, [
        renderPage(data)
      ])
    ]),
    new Element('div', { class: 'col-xs-12' }, NO_EVENTS, [ new Text(new Date().toString()) ])
  ])
}
