import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';
import htmlBundle from 'rollup-plugin-html-bundle';
import fg from 'fast-glob';

import fs from 'fs';
import path from 'path';

// function inliner(template, dest) {
//   return {
//       name: 'Inliner',
//       generateBundle(opts, bundle) {
//           const file = path.parse(opts.file).base
//           const code = bundle[file].code
//           const output = fs.readFileSync(template, 'utf-8')
//           bundle[file].code = output.replace('%%script%%', code)
//       }
//   }
// }

// Static assets will vary depending on the application
const copyConfig = {
  targets: [
    { src: 'node_modules/@webcomponents', dest: 'build-modern/node_modules' },
    { src: 'images', dest: 'build-modern' },
    { src: 'data', dest: 'build-modern' },
    { src: 'index.html', dest: 'build-modern' },
  ],
};

// The main JavaScript bundle for modern browsers that support
// JavaScript modules and other ES2015+ features.
const config = {
  input: './src/index.js',
  output: {
    file: './index.js',
    format: 'es',
  },
    plugins: [{
      name: 'watch-external',
      async buildStart(){
          const files = await fg('src/**/*');
          for(let file of files){
              this.addWatchFile(file);
          }
      }
    } ,commonjs(),
    minifyHTML(),
    copy(copyConfig),
    resolve(),
    htmlBundle({
      template: 'src/ui.html',
      target: './ui.html',
      inline: true,
      targetElement: 'main',
  })
    // inliner('./src/ui.html')
  ],
  preserveEntrySignatures: false,
};

if (process.env.NODE_ENV !== 'development') {
  config.plugins.push(terser());
}

export default config;