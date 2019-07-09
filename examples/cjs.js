import React from 'react';
import * as core from '../dist/jestLite.core.js';
import * as enzyme from '../dist/jestLite.enzyme.js';
import * as overlay from '../dist/jestLite.overlay.js';

const {it, describe, expect, runTests, constructPlainResult} = core;
const {mount} = enzyme;

function Button() {
  return React.createElement('div', {}, 'Hello!');
}

it('half', () => {
  const wrapper = mount(React.createElement(Button, {}, null));
  expect(wrapper.text()).toBe('Hello!');
});

describe('<Button />', () => {
  it('one', () => {
    const wrapper = mount(React.createElement(Button, {}, null));
    expect(wrapper.text()).toBe('Hello2!');
  });

  it('two', () => {
    const wrapper = mount(React.createElement(Button, {}, null));
    expect(wrapper.text()).toBe('Hello!');
  });
});

runTests().then((result) => console.log(constructPlainResult(result)));
