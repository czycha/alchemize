# Alchemize

> Transform nodes as they are added to the page.

## Table of contents

- [Install](#install)
- [Usage](#usage)
- [Browser compatibility](#browser-compatibility)
- [API](#api)
- [License](#license)

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install alchemize
```

Or, with [Yarn](https://yarnpkg.com/en/),

```
$ yarn add alchemize
```

Alternatively, download [alchemize.min.js](browser/alchemize.min.js)

## Usage

```js
import alchemize from 'alchemize'

alchemize('.water', function(el) { $(el).addClass('wine').removeClass('water').text('wine') })
```

Or,

```html
<script type="text/javascript" src="https://unpkg.com/alchemize@1.0.0/browser/alchemize.min.js"></script>
<script type="text/javascript">
  alchemize('.water', function(el) { $(el).addClass('wine').removeClass('water').text('wine') });
</script>
```

## Browser compatibility

Alchemize is based entirely on the `MutationObserver` native class (including the prefixed `WebkitMutationObserver`). If this class is [not present](https://caniuse.com/#feat=mutationobserver), Alchemize will not work at all.

## API

### `alchemize(matches, transform, parent)`

Runs `transform` everytime a matching element is added to `parent`.

#### Arguments

- `matches` (required) - This argument is either:
  - A CSS selector string (ex. `"div#id.class"`)
  - A function that returns a boolean (ex. `(el) => el.nodeType === 1 && $(el).hasClass('.selector')`)
- `transform` (required) - This argument is either:
  - A constant that the element will be replaced with (for example, plain text or a `Node`).
  - A function that operates on the element. (ex. `(el) => { $(el).addClass('added') })`)
- `parent` (optional, default: `document.documentElement`) - The top level element to watch for added childrens.

#### Returns

- [`Observer`](#observer) instance.

### `Observer`

#### Methods

##### `observer.connect()`

Starts watching for added nodes if not already.

##### `observer.disconnect()`

Stops watching for added nodes.

##### `observer.operate(fn)`

Pauses observation until function terminates.

###### Arguments

- `fn` (required) - Function to call once observation is suspended. Bound to `Observer` instance.

###### Returns

- Whatever `fn` returns.

#### Properties

- `connected` (`boolean`) - Whether the instance is observing or not.

## License

[MIT](LICENSE) &copy; James Anthony Bruno
