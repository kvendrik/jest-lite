# jest-lite

[![NPM Version](https://badge.fury.io/js/jest-lite.svg)](https://yarnpkg.com/en/package/jest-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Run [Jest](https://jestjs.io/) in the browser.

## Why run Jest in the browser?

[Codesandbox](https://codesandbox.io) allows you to write Jest and execute the tests right in their environment. Getting this to work [took a bit of research](https://github.com/codesandbox/codesandbox-client/issues/364) as Jest is typically meant to be ran in a Node environment.

The Codesandbox team however didn't open-source their solution so I decided to write my own, for two reasons:

- Create an easy way to use Jest in _any_ sandboxing environment.
- Give code sandbox maintainers a bare-bone example that shows how you can implement Jest testing into your code sandboxing solution.

## Modules

This library consists of three seperate modules which extend eachother's functionality:

### `core`

- Usage: `import * as core from 'jest-lite';` or `http://unpkg.com/jest-lite@1.0.0-alpha.3/dist/core.js`
- Description: includes all core testing utilities. See [the source](https://github.com/kvendrik/jest-lite/blob/master/src/core.ts) for a full list of exports.

### `enzyme`

- Usage: `import * as enzyme from 'jest-lite/build/enzyme';` or `http://unpkg.com/jest-lite@1.0.0-alpha.3/dist/enzyme.js`
- Description: includes testing utilities for testing with [Enzyme](https://github.com/airbnb/enzyme). See [the source](https://github.com/kvendrik/jest-lite/blob/master/src/enzyme.ts) for a full list of exports.

### `prettify`

- Usage:
  - JS: `import * as prettify from 'jest-lite/build/prettify';` or `http://unpkg.com/jest-lite@1.0.0-alpha.3/dist/prettify.js`
  - Styles: `node_modules/jest-lite/dist/prettify.css` or `http://unpkg.com/jest-lite@1.0.0-alpha.3/dist/prettify.css`
- Description: the `core` module spits out the test results in JSON format. This module gives you an easy way to prettify that output for use on a HTML page. See [the source](https://github.com/kvendrik/jest-lite/blob/master/src/prettify.ts) for a full list of exports.

## Examples

### Basic Usage (CJS)

```ts
import {describe, it, expect, run} from 'jest-lite';

function sum(x: number, y: number) {
  return x + y;
}

describe('sum', () => {
  it('adds the two given numbers', () => {
    expect(sum(2, 2)).toBe(4);
  });
});

const result = await run();
console.log(result);
```

### Testing React and Prettifying Output (UMD)

Trying pasting this in a [Codepen](https://codepen.io/pen/) and watch magic happen. ✨

```html
<style>
  html,
  body {
    margin: 0;
    height: 100%;
  }
</style>
<link
  rel="stylesheet"
  href="http://unpkg.com/jest-lite@1.0.0-alpha.3/dist/prettify.css"
/>
<script
  crossorigin
  src="https://unpkg.com/react@16/umd/react.production.min.js"
></script>
<script
  crossorigin
  src="http://unpkg.com/jest-lite@1.0.0-alpha.3/dist/core.js"
></script>
<script
  crossorigin
  src="http://unpkg.com/jest-lite@1.0.0-alpha.3/dist/enzyme.js"
></script>
<script
  crossorigin
  src="http://unpkg.com/jest-lite@1.0.0-alpha.3/dist/prettify.js"
></script>
<script>
  const {
    core: {describe, it, expect, run},
    enzyme: {mount},
    prettify,
  } = window.jestLite;

  function Button({children}) {
    return React.createElement('button', null, children);
  }

  describe('<Button />', () => {
    it('renders children', () => {
      const text = 'Click me!';
      // If you're using a transpiler like Babel
      // React.createElement would be replaced with your JSX:
      // <Button>{text}</Button>
      const button = mount(React.createElement(Button, {}, text));
      expect(button.text()).toBe(text);
    });

    it('renders as a link', () => {
      const button = mount(React.createElement(Button, {}, null));
      expect(button.find('a').exists()).toBe(true);
    });

    it('renders as a button', () => {
      const button = mount(React.createElement(Button, {}, null));
      expect(button.find('button').exists()).toBe(true);
    });
  });

  prettify.toHTML(run(), document.body);
</script>
```
