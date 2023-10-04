const minify = require('@node-minify/core');
const uglifyJS = require('@node-minify/uglify-js');
const babelMini = require('@node-minify/babel-minify')

minify({
  compressor: uglifyJS,
  input: './check.js',
  output: './min.js',
  callback: function (err, min) {}
});

async function doMinify() {
  const min = await minify({ compressor: uglifyJS, input: 'check.js', output: 'min.js' });
}

doMinify()