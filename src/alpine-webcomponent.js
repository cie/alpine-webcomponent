;(function (start) {
  if (typeof module !== 'undefined') {
    module.exports = { start }
  } else {
    if (document.readyState === 'loading')
      window.addEventListener('DOMContentLoaded', start)
    else start()
  }
})(function () {
  for (const tpl of document.querySelectorAll('template[x-webcomponent]')) {
    customElements.define(
      tpl.getAttribute('x-webcomponent'),
      class extends HTMLElement {
        connectedCallback () {
          this.attachShadow({ mode: 'open' }).appendChild(
            tpl.content.cloneNode(true)
          )
        }
      }
    )
  }
})
