const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');
const { dts } = require('rollup-plugin-dts');

const packageJson = require('./package.json');

const config = [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/safeNumber.min.js',
                format: 'iife',
                name: 'SafeNumber',
                sourcemap: true,
                exports: 'default',
                plugins: [terser()]
            }
        ],
        plugins: [
            nodeResolve({
                browser: true
            }),
            commonjs({
                transformMixedEsModules: true
            }),
            typescript({
                tsconfig: './tsconfig.json',
                declaration: false,
                module: 'esnext'
            }),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**',
                presets: [
                    ['@babel/preset-env', {
                        targets: '> 0.25%, not dead',
                        modules: false
                    }]
                ]
            })
        ]
    },
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
                exports: 'default'
            },
            {
                file: packageJson.module,
                format: 'es',
                sourcemap: true
            }
        ],
        plugins: [
            nodeResolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            })
        ]
    },
    {
        input: 'dist/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [dts()]
    }
];

module.exports = config;