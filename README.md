# Alpine Web Component

This is very alpha. You can define your web components in a declarative and Alpine way.


```html
<script src="https://cdn.jsdelivr.net/gh/cie/alpine-webcomponent@v1.0.0/dist/alpine-webcomponent.js" defer></script>
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.6.0/dist/alpine.min.js" defer></script>

<template x-webcomponent="my-card">
  <section>
    <slot/>
  </section>
  <style>
    section {
      padding: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.5);
      border-radius: 10px;
    }
  </style>
</template>

<my-card>
  Hello
</my-card>
```
