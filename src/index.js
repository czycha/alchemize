import matches from 'matches-selector'
import Observer from './observer'

/**
 * Transform elements as they are added to the page.
 * @param {function(Node) -> boolean|string} match - Either a function that takes a Node as an argument and returns a boolean, or a CSS selector string.
 * @param {function|*} transform - If a function, runs it when a matched element is added. If not a function, the element is replaced with this argument.
 * @param {Node} [parent=document.documentElement] - Parent element to watch on.
 * @return {Observer}
 */
function alchemize (match, transform, parent = document.documentElement) {
  let matchfn
  switch (typeof match) {
    case 'string':
      matchfn = (el) => matches(el, match)
      break
    case 'function':
      matchfn = match
      break
    default:
      throw new TypeError('match must be a string or function')
  }
  let transformfn
  switch (typeof transform) {
    case 'function':
      transformfn = transform
      break
    default:
      transformfn = (node) => {
        node.replaceWith(transform)
      }
      break
  }
  const observer = new Observer(matchfn, parent, { childList: true, subtree: true }, function (records) {
    records.forEach(({ addedNodes }) => {
      addedNodes.forEach((node) => {
        if (this.matches(node)) {
          this::transformfn(node)
        }
      })
    })
  })
  observer.connect()
  return observer
}

module.exports = alchemize
