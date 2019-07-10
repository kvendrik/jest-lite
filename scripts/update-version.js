const fs = require('fs');
const {resolve} = require('path');

const rootPath = resolve(__dirname, '..');
const package = require(`${rootPath}/package.json`);

const [,,newVersion] = process.argv;

if (!newVersion) {
  console.error('Usage: update-version [new-version]');
  process.exit(1);
}

const {version: currentVersion} = package;
console.log(`Changeing version from ${currentVersion} to ${newVersion} in README.md and package.json`);

const currentReadmeContents = fs.readFileSync(`${rootPath}/README.md`, 'utf-8');
const newReadmeContents = currentReadmeContents.replace(
  new RegExp(currentVersion, 'g'),
  newVersion
);
fs.writeFileSync(`${rootPath}/README.md`, newReadmeContents);

const newPackageContents = {...package, version: newVersion};
const newPackageContentsJSON = JSON.stringify(newPackageContents, null, 2);
fs.writeFileSync(`${rootPath}/package.json`, newPackageContentsJSON);
