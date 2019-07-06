import expect from 'jest-matchers';
import {
  describe, beforeEach, test, afterEach, beforeAll, afterAll,
} from 'jest-circus';
import {addEventHandler} from 'jest-circus/build/state';
import runTests from 'jest-circus/build/run';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const testUtilities = {describe, beforeEach, test, it: test, afterEach, beforeAll, afterAll, expect, mount: Enzyme.mount};
export {testUtilities, addEventHandler as onMessage, runTests};
