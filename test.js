const babel = require('@babel/core');
const preset = require('./index');

const { code } = babel.transformSync(
  `const a = {...b}; const m = () => 100; const asyncF = async () => 100
  const test = a?.b?.c ?? 0;
  import('./package.json');
  `,
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
