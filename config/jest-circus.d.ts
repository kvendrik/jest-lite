declare module 'jest-circus';
declare module 'jest-circus/build/state';
declare module 'jest-circus/build/run' {
  export interface TestsResult {
    duration: number;
    status: string;
    errors: string[];
    testPath: string[];
  }
  export default function runTests(): Promise<TestsResult[]>;
}
