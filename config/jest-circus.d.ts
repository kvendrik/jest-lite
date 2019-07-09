declare module 'jest-circus';
declare module 'jest-circus/build/state';
declare module 'jest-circus/build/run' {
  import {Circus} from '@jest/types';
  export default function run(): Promise<Circus.RunResult>;
}
