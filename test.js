const babel = require('@babel/core');
const preset = require('./index');

const { code } = babel.transformSync(
  'const a = {...b}; const m = () => 100; const asyncF = async () => 100',
  {
    presets: [
      [
        preset,
        {
          // es2015: true,
          // modules: false,
          development: true,
          runtime: true,
        },
      ],
    ],
  },
);

console.log(code);
