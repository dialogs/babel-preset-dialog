const defaultOptions = {
  spec: false,
  loose: true,
  react: true,
  es2015: true,
  esnext: true,
  strict: true,
  minify: false,
  optimize: false,
  typecheck: false
};

function preset(context, options) {
  const {
    spec,
    loose,
    react,
    es2015,
    esnext,
    strict,
    minify,
    optimize,
    typecheck
  } = Object.assign({}, defaultOptions, options);

  const plugins = [];
  const presets = [];

  if (strict) {
    plugins.push(
      require('babel-plugin-transform-strict-mode')
    );
  }

  if (esnext) {
    plugins.push(
      require('babel-plugin-transform-class-properties'),
      require('babel-plugin-transform-object-rest-spread'),
      require('babel-plugin-transform-export-extensions')
    );
  }

  if (react) {
    plugins.push(
      require('babel-plugin-syntax-jsx'),
      require('babel-plugin-syntax-flow'),
      require('babel-plugin-transform-react-jsx'),
      require('babel-plugin-transform-flow-strip-types'),
      require('babel-plugin-transform-react-display-name')
    );
  }

  if (es2015) {
    plugins.push(
      [require('babel-plugin-transform-es2015-template-literals'), { loose, spec }],
      require('babel-plugin-transform-es2015-literals'),
      require('babel-plugin-transform-es2015-function-name'),
      [require('babel-plugin-transform-es2015-arrow-functions'), { spec }],
      require('babel-plugin-transform-es2015-block-scoped-functions'),
      [require('babel-plugin-transform-es2015-classes'), { loose }],
      require('babel-plugin-transform-es2015-object-super'),
      require('babel-plugin-transform-es2015-shorthand-properties'),
      require('babel-plugin-transform-es2015-duplicate-keys'),
      [require('babel-plugin-transform-es2015-computed-properties'), { loose }],
      [require('babel-plugin-transform-es2015-for-of'), { loose }],
      require('babel-plugin-transform-es2015-sticky-regex'),
      require('babel-plugin-transform-es2015-unicode-regex'),
      require('babel-plugin-check-es2015-constants'),
      [require('babel-plugin-transform-es2015-spread'), { loose }],
      require('babel-plugin-transform-es2015-parameters'),
      [require('babel-plugin-transform-es2015-destructuring'), { loose }],
      require('babel-plugin-transform-es2015-block-scoping'),
      require('babel-plugin-transform-es2015-typeof-symbol'),
      [require('babel-plugin-transform-es2015-modules-commonjs'), { loose }]
    );
  }

  if (typecheck) {
    plugins.push(
      require('babel-plugin-typecheck')
    );
  }

  if (optimize) {
    plugins.push(
      require('babel-plugin-lodash')
    );
  }

  if (optimize && react) {
    plugins.push(
      require('babel-plugin-transform-react-constant-elements'),
      require('babel-plugin-transform-react-inline-elements')
    );
  }

  if (minify) {
    presets.push(
      require('babel-preset-babili')
    )
  }

  return {
    plugins
  };
}

module.exports = preset;
