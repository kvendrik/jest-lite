/* eslint-disable no-console */

// eslint-disable-next-line import/no-extraneous-dependencies
const gzipSize = require('gzip-size');
const {resolve} = require('path');
const {readFileSync, writeFileSync, readdirSync} = require('fs');

const package = require(`../package.json`);
const rootPath = resolve(__dirname, '..');

const [, , newVersion] = process.argv;

if (!newVersion) {
  console.error('Usage: build-readme <new-version>');
  process.exit(1);
}

console.info(
  `Updating version from ${package.version} to ${newVersion} and building README.md`,
);

let finalReadmeContents = readFileSync(
  `${rootPath}/README.template.md`,
  'utf-8',
);

finalReadmeContents = finalReadmeContents.replace(
  new RegExp('{{version}}', 'g'),
  newVersion,
);
updatePackageVersion(newVersion);

finalReadmeContents = updateBundleSizes(finalReadmeContents);
writeFileSync(`${rootPath}/README.md`, finalReadmeContents);

function updateBundleSizes(readmeContents) {
  let newReadmeContents = readmeContents;
  const bundles = getBundleNames();

  for (const bundleFile of bundles) {
    console.info(`Inspecting dist/${bundleFile}`);

    const bundleContents = readFileSync(
      `${rootPath}/dist/${bundleFile}`,
      'utf-8',
    );

    const gzipSizeBytes = gzipSize.sync(bundleContents);
    const gzipSizeKb = bytesToKilobytes(gzipSizeBytes);

    const bundleSize =
      gzipSizeBytes > 1000 ? `${gzipSizeKb}kb` : `${gzipSizeBytes}b`;

    newReadmeContents = newReadmeContents.replace(
      `{{bundleSize['${bundleFile}']}}`,
      bundleSize,
    );
  }

  return newReadmeContents;
}

function updatePackageVersion(newPackageVersion) {
  const newPackageContents = {...package, version: newPackageVersion};
  const newPackageContentsJSON = JSON.stringify(newPackageContents, null, 2);
  writeFileSync(`${rootPath}/package.json`, newPackageContentsJSON);
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
