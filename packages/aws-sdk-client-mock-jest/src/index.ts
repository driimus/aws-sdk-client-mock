import { expect } from 'expect';
import matchers from './jestMatchers';

// Skip registration if jest expect does not exist
if (typeof expect !== 'undefined' && typeof expect.extend === 'function') {
    expect.extend(matchers);
}
