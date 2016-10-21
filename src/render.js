/* eslint-env browser */
import data from './data'
import domToVirtualDom from './virtual-dom/domToVirtualDom'
import reconcile from './virtual-dom/reconcile'
import renderMain from './renderMain'

let actual = null
if (typeof document !== "undefined") {
  actual = domToVirtualDom(document.getElementById('root'))
  render()
}

export default function render() {
  const desired = renderMain(data)
  reconcile(actual.element.parentNode, actual, desired)
  actual = desired
}
