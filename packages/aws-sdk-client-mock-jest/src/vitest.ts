import { expect } from 'vitest';
import matchers from './jestMatchers';

declare module '@vitest/expect' {
    interface MatcherState {
        dontThrow: () => void;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
expect.extend(matchers);
