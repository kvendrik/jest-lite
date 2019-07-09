import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export {mount, shallow};
