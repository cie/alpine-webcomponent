import Alpine from 'alpinejs'
import AlpineWebComponent from 'alpine-webcomponent'

test('define custom element', () => {
  document.body.innerHTML = `
    <template x-webcomponent="my-elem">
      <nav><slot /></nav>
    </template>
    <my-elem>
      Hi
    </my-elem>
  `
  AlpineWebComponent.start()
  Alpine.start()
  expect(document.querySelector('my-elem').shadowRoot).toBeTruthy()
  expect(
    document.querySelector('my-elem').shadowRoot.firstElementChild.nodeName
  ).toBe('NAV')
})
