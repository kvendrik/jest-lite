# jest-lite
Run [Jest](https://jestjs.io/) in the browser

## Get started
1. Install the library
    - Using Yarn: `yarn add jest-lite`
    - Or using the CDN: `<script crossorigin src="http://unpkg.com/jest-lite@1.0.0/build/jest-lite.js"></script>`. When using the CDN you can access access the API using `window.jestLite`.
2. Read the API guide below to get started.

## API

### `describe`, `it`, `test`, `beforeEach`, `afterEach`, `beforeAll`, `afterAll`
All of these can be used to write the actual tests. They are extracted directly from [`jest-circus`](https://github.com/facebook/jest/tree/master/packages/jest-circus) so please refer to the [Jest documentation](https://jestjs.io/docs/en/getting-started) for more information on these methods.

### `expect`
Is directly extracted from [`jest-matcher-utils`](https://github.com/facebook/jest/tree/master/packages/jest-matcher-utils) so please refer to their documentation for more info. You can find documentation on how to add custom matchers [here](https://jestjs.io/docs/en/expect.html#expectextendmatchers).

## Using `jest-lite` to test React (example)
```html
```

## What is this useful for?
Tools like Codesandbox have ways for you to use Jest right in their code editor. The ability to do this is great and I wanted to make it more widely available. The goal of jest-lite is to enable you to quickly add Jest support to your code sandbox of choice (e.g. Codepen or JSBin) and to give code sandbox creators a quick way to add Jest support to their tool.
