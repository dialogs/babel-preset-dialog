const defaultOptions = {
  spec: false,
  loose: true,
  react: true,
  es2015: true,
  esnext: true,
  strict: true,
  minify: false,
  runtime: true,
  modules: true,
  helpers: false,
  optimize: false,
  typecheck: false,
  development: false
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
    runtime,
    modules,
    helpers,
    optimize,
    typecheck,
    development
  } = Object.assign({}, defaultOptions, options);

  const plugins = [];
  const presets = [];

  if (strict) {
    plugins.push(
      require('babel-plugin-transform-strict-mode')
    );
  }
  
  if (runtime) {
    plugins.push(
      [require.resolve('babel-plugin-transform-runtime'), {
        helpers: true,
        polyfill: true,
        regenerator: false,
        // Resolve the Babel runtime relative to the config.
        moduleName: path.dirname(require.resolve('babel-runtime/package'))
      }]
    );
  }

  if (esnext) {
    plugins.push(
      require('babel-plugin-transform-class-properties'),
      [require('babel-plugin-transform-object-rest-spread'), { useBuiltIns: runtime }],
      require('babel-plugin-transform-export-extensions')
    );
  }

  if (react) {
    plugins.push(
      require('babel-plugin-syntax-jsx'),
      require('babel-plugin-syntax-flow'),
      [require('babel-plugin-transform-react-jsx'), { useBuiltIns: runtime }],
      require('babel-plugin-transform-flow-strip-types'),
      require('babel-plugin-transform-react-display-name')
    );
    
    if (development) {
      plugins.push(
        // Adds component stack to warning messages
        require.resolve('babel-plugin-transform-react-jsx-source'),
        // Adds __self attribute to JSX which React will use for some warnings
        require.resolve('babel-plugin-transform-react-jsx-self')
      );
    }
    
    if (optimize) {
      plugins.push(
        require('babel-plugin-transform-react-constant-elements'),
        require('babel-plugin-transform-react-inline-elements')
      );
    }
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
      require('babel-plugin-transform-es2015-typeof-symbol')
    );

    if (modules) {
      plugins.push(
        [require('babel-plugin-transform-es2015-modules-commonjs'), { loose }]
      );
    }
  }

  if (helpers) {
    plugins.push(
      require('babel-plugin-external-helpers')
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
