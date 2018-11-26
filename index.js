const path = require('path');

const defaultOptions = {
  flow: false,
  react: true,
  esnext: true,
  strict: true,
  helpers: false,
  runtime: true,
  optimize: false,
  // typecheck: false,
  development: false,
};

function preset(context, options) {
  const {
    flow,
    react,
    esnext,
    strict,
    helpers,
    runtime,
    optimize,
    typecheck,
    development,
  } = Object.assign({}, defaultOptions, options);

  const plugins = [];

  if (strict) {
    plugins.push(require('@babel/plugin-transform-strict-mode'));
  }

  if (helpers) {
    plugins.push(require('@babel/plugin-external-helpers'));
  }

  if (runtime) {
    plugins.push([
      require.resolve('@babel/plugin-transform-runtime'),
      {
        helpers: true,
        regenerator: false,
      },
    ]);
  }

  if (esnext) {
    plugins.push(
      require('@babel/plugin-proposal-class-properties'),
      require('@babel/plugin-proposal-export-default-from'),
      require('@babel/plugin-proposal-export-namespace-from'),
    );
  }

  plugins.push(require('@babel/plugin-syntax-flow'));
  if (flow) {
    plugins.push(require('@babel/plugin-transform-flow-comments'));
  } else {
    plugins.push(require('@babel/plugin-transform-flow-strip-types'));
  }

  if (react) {
    plugins.push(
      require('@babel/plugin-syntax-jsx'),
      [require('@babel/plugin-transform-react-jsx'), { useBuiltIns: runtime }],
      require('@babel/plugin-transform-react-display-name'),
    );

    if (development) {
      plugins.push(
        // Adds component stack to warning messages
        require.resolve('@babel/plugin-transform-react-jsx-source'),
        // Adds __self attribute to JSX which React will use for some warnings
        require.resolve('@babel/plugin-transform-react-jsx-self'),
      );
    }

    if (optimize) {
      plugins.push(
        require('@babel/plugin-transform-react-constant-elements'),
        require('@babel/plugin-transform-react-inline-elements'),
      );
    }
  }

  // if (typecheck) {
  //   plugins.push(require("babel-plugin-typecheck"));
  // }

  if (optimize) {
    plugins.push(require('babel-plugin-lodash'));
  }

  const preset = {
    presets: [require('@babel/preset-env')],
    plugins,
  };

  return preset;
}

module.exports = preset;
