Babel Preset
============

Installation
------------

```
npm install --save-dev @dlghq/babel-preset-dialog
```

Usage
-----

Add `@dlghq/babel-preset-dialog` to your `.babelrc`.

```json
{
  "presets": [
    ["@dlghq/babel-preset-dialog", {
      "strict": false,
      "optimize": true,
      "typecheck": true
    }]
  ]
}
```

Options
-------

Name | Default | Description
---- | ------- | -----------
`spec` | `false` | Enable spec compliance
`loose` | `true` | Enable loose mode
`react` | `true` | Enable react transforms
`es2015` | `true` | Enable ES2015 syntax
`esnext` | `true` | Enable ESNext syntax
`strict` | `true` | Add `"use strict";` to each file
`minify` | `false` | Enable minification plugins
`modules` | `true` | Enable ES2015 modules transforms
`optimize` | `false` | Enable optimization plugins
`typecheck` | `false` | Enable typecheck plugin
