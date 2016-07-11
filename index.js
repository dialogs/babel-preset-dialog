function loose(plugin) {
  return [plugin, { loose: true }];
}

module.exports = {
  plugins: [
    // Helpers
    require('babel-plugin-transform-strict-mode'),

    // ES Next
    require('babel-plugin-transform-class-properties'),
    require('babel-plugin-transform-object-rest-spread'),
    require('babel-plugin-transform-export-extensions'),

    // ES 2015
    loose(require('babel-plugin-transform-es2015-template-literals')),
    require('babel-plugin-transform-es2015-literals'),
    require('babel-plugin-transform-es2015-function-name'),
    require('babel-plugin-transform-es2015-arrow-functions'),
    require('babel-plugin-transform-es2015-block-scoped-functions'),
    loose(require('babel-plugin-transform-es2015-classes')),
    require('babel-plugin-transform-es2015-object-super'),
    require('babel-plugin-transform-es2015-shorthand-properties'),
    require('babel-plugin-transform-es2015-duplicate-keys'),
    loose(require('babel-plugin-transform-es2015-computed-properties')),
    loose(require('babel-plugin-transform-es2015-for-of')),
    require('babel-plugin-transform-es2015-sticky-regex'),
    require('babel-plugin-transform-es2015-unicode-regex'),
    require('babel-plugin-check-es2015-constants'),
    loose(require('babel-plugin-transform-es2015-spread')),
    require('babel-plugin-transform-es2015-parameters'),
    loose(require('babel-plugin-transform-es2015-destructuring')),
    require('babel-plugin-transform-es2015-block-scoping'),
    require('babel-plugin-transform-es2015-typeof-symbol'),
    loose(require('babel-plugin-transform-es2015-modules-commonjs')),

    // React
    require('babel-plugin-syntax-jsx'),
    require('babel-plugin-syntax-flow'),
    require('babel-plugin-transform-react-jsx'),
    require('babel-plugin-transform-flow-strip-types'),
    require('babel-plugin-transform-react-display-name')
  ],
  env: {
    production: {
      plugins: [
        // Code optimizers
        require('babel-plugin-lodash'),

        // React optimizers
        require('babel-plugin-transform-react-constant-elements'),
        require('babel-plugin-transform-react-inline-elements')
      ]
    }
  }
};
