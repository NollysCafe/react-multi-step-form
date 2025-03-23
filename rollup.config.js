import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

export default {
	input: 'src/index.ts',
	output: [
		{
			file: 'dist/index.esm.js',
			format: 'esm',
			sourcemap: true,
		},
		{
			file: 'dist/index.cjs.js',
			format: 'cjs',
			sourcemap: true,
		},
	],
	plugins: [
		peerDepsExternal(),
		resolve(),
		commonjs(),
		typescript({ tsconfig: './tsconfig.json' }),
		postcss({
			extensions: ['.css', '.scss'],
			extract: true,
			minimize: true,
		})
	]
}
