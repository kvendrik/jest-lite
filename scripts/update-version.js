const fs = require('fs');
const {resolve} = require('path');

const package = require(`../package.json`);

const [, , newVersion] = process.argv;

if (!newVersion) {
  // eslint-disable-next-line no-console
  console.error('Usage: update-version [new-version]');
  process.exit(1);
}

const rootPath = resolve(__dirname, '..');
const {version: currentVersion} = package;

// eslint-disable-next-line no-console
console.info(
  `Changing version from ${currentVersion} to ${newVersion} in README.md and package.json`,
);

const currentReadmeContents = fs.readFileSync(`${rootPath}/README.md`, 'utf-8');
const newReadmeContents = currentReadmeContents.replace(
  new RegExp(currentVersion, 'g'),
  newVersion,
);
fs.writeFileSync(`${rootPath}/README.md`, newReadmeContents);

const newPackageContents = {...package, version: newVersion};
const newPackageContentsJSON = JSON.stringify(newPackageContents, null, 2);
fs.writeFileSync(`${rootPath}/package.json`, newPackageContentsJSON);
