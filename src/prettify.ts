import {ROOT_DESCRIBE_BLOCK_NAME} from 'jest-circus/build/state';
import {Circus} from '@jest/types';

type Status = 'pass' | 'fail';

export function toHTML(
  testRunner: Promise<Circus.TestResults>,
  node: HTMLElement,
) {
  const element = document.createElement('div');
  node.appendChild(element);
  element.innerHTML = 'Running tests...';
  testRunner.then(result => {
    element.innerHTML = constructResultsHTML(result);
  });
}

function constructResultsHTML(result: Circus.TestResults) {
  let totalDuration = 0;
  let passed = 0;
  let failed = 0;
  const testsResultsHTML = result.reduce(
    (currentOutput: string, {duration, status, errors, testPath}) => {
      // Casting because the types in Circus.TestStatus
      // Don't correspond with the actual given status
      if ((status as Status) === 'fail') {
        failed += 1;
      } else {
        passed += 1;
      }
      const testResultHTML = constructResultHTML(
        status as Status,
        testPath,
        errors,
      );
      totalDuration += duration;
      return `${currentOutput}${testResultHTML}`;
    },
    '',
  );
  return `
    <div class="jest-lite-result">
      ${testsResultsHTML}
      ${constructSummaryHTML(
        failed > 0 ? 'fail' : 'pass',
        failed,
        passed,
        totalDuration,
      )}
    </div>
  `;
}

function constructSummaryHTML(
  status: Status,
  failed: number,
  passed: number,
  timeInMilliseconds: number,
) {
  return `
    <span class="summary-status summary-status--${status}">
      Tests: ${failed} failed, ${passed} passed, ${passed + failed} total<br>
      Time: ${timeInMilliseconds / 1000}s
    </span>
  `;
}

function constructResultHTML(
  status: Status,
  testPath: string[],
  errors: string[],
) {
  return `
    <div class="jest-lite-result__result">
      <span class="jest-lite-result__status-icon">${
        status === 'fail' ? '×' : '✓'
      }</span>
      <span class="jest-lite-result__status jest-lite-result__status--${status}">
        ${status.toUpperCase()}
      </span>
      ${cleanTestPath(testPath).join(' › ')}
      ${
        errors.length === 0
          ? ''
          : `<div class="jest-lite-result__errors">${errors
              .map(error => escapeHTML(error))
              .join()}</div>`
      }
    </div>
  `;
}

function cleanTestPath(path: string[]) {
  return path
    .filter(part => part !== ROOT_DESCRIBE_BLOCK_NAME)
    .map(part => escapeHTML(part));
}

function escapeHTML(html: string) {
  return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
