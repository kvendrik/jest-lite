// eslint-disable-next-line import/no-extraneous-dependencies
const gzipSize = require('gzip-size');
const {resolve} = require('path');
const {readFileSync, writeFileSync, readdirSync} = require('fs');

const rootPath = resolve(__dirname, '..');
const bundles = getBundleNames();
const bundleSizes = {};

const currentReadmeContents = readFileSync(`${rootPath}/README.md`, 'utf-8');
let newReadmeContents = currentReadmeContents;

for (const bundleFile of bundles) {
  // eslint-disable-next-line no-console
  console.info(`Inspecting dist/${bundleFile}`);

  const bundleContents = readFileSync(
    `${rootPath}/dist/${bundleFile}`,
    'utf-8',
  );

  const gzipSizeBytes = gzipSize.sync(bundleContents);
  const gzipSizeKb = bytesToKilobytes(gzipSizeBytes);

  const bundleSize =
    gzipSizeBytes > 1000 ? `${gzipSizeKb}kb` : `${gzipSizeBytes}b`;
  const bundleFileFound = getBundleRegex(bundleFile).test(newReadmeContents);
  const bundleName = stripExtension(bundleFile);
  const replaceRegex = bundleFileFound
    ? getBundleRegex(bundleFile)
    : getBundleRegex(bundleName);

  newReadmeContents = newReadmeContents.replace(
    replaceRegex,
    (match, _, currentBundleSize) =>
      match.replace(currentBundleSize, bundleSize),
  );
}

writeFileSync(`${rootPath}/README.md`, newReadmeContents);

function getBundleRegex(bundleLookup) {
  return new RegExp(`\`${bundleLookup}(\\.js|\\.css)?\` \\(\`([^\`]+)`, 'g');
}

function getBundleNames() {
  const allDistFiles = readdirSync(`${rootPath}/dist`);
  return allDistFiles.filter(
    filename => filename.includes('.js') || filename.includes('.css'),
  );
}

function bytesToKilobytes(bytes) {
  return Math.round(bytes / 1000);
}

function stripExtension(filename) {
  return filename.replace(/(\.js|\.css)$/, '');
}
