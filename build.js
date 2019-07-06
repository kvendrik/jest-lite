const rollup = require('rollup');
const {execSync} = require('child_process');
const rollupTypescript = require('rollup-plugin-typescript');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const builtins = require('rollup-plugin-node-builtins');
const globals = require('rollup-plugin-node-globals');
const {dependencies} = require('./package.json');

execSync('rm -rf ./dist', {stdio: 'inherit'});

rollup.rollup({
  input: './src/index.ts',
  external: Object.keys(dependencies),
  plugins: [rollupTypescript(), nodeResolve(), commonjs({namedExports: true}), builtins(), globals()]
})
  .then((bundle) => {
    bundle.write({
      file: './dist/jest-lite.umd.js',
      format: 'umd',
      name: 'jestLite',
      sourcemap: true,
    });
    return bundle;
  })
  .then((bundle) => bundle.write({
    file: './dist/jest-lite.esm.js',
    format: 'esm',
    sourcemap: true
  }));
