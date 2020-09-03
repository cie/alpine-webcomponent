;(function (start) {
  if (typeof module !== 'undefined') {
    module.exports = { start }
  } else {
    if (document.readyState === 'loading')
      window.addEventListener('DOMContentLoaded', start)
    else start()
  }
})(function () {
  Alpine.addMagicProperty('dispatchComposed', $el => (type, detail) =>
    $el.dispatchEvent(
      new CustomEvent(type, { bubbles: true, composed: true, detail })
    )
  )
  for (const tpl of document.querySelectorAll('template[x-webcomponent]')) {
    const observedAttributes = (tpl.getAttribute('x-attributes') || '')
      .split(/\s+/)
      .filter(Boolean)
    customElements.define(
      tpl.getAttribute('x-webcomponent'),
      class extends HTMLElement {
        static get observedAttributes () {
          return observedAttributes
        }
        connectedCallback () {
          const shadow = this.attachShadow({ mode: 'open' })
          shadow.appendChild(tpl.content.cloneNode(true))
          for (const el of shadow.querySelectorAll('[x-data]'))
            Alpine.initializeComponent(el)
          if (
            this.shadowRoot.firstElementChild &&
            this.shadowRoot.firstElementChild.__x
          ) {
            const { $data } = this.shadowRoot.firstElementChild.__x
            for (const attr of this.attributes)
              if (observedAttributes.includes(attr.name)) {
                $data[attr.name] = attr.value
              }
          }
        }
        attributeChangedCallback (name, oldValue, newValue) {
          if (
            this.shadowRoot.firstElementChild &&
            this.shadowRoot.firstElementChild.__x
          ) {
            this.shadowRoot.firstElementChild.__x.$data[name] = newValue
          }
        }
      }
    )
  }
})
