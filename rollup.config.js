import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const config = {
	input: 'src/index.tsx',
	output: [
		{
			file: 'dist/index.cjs.js',
			format: 'cjs',
			sourcemap: true,
			inlineDynamicImports: true
		},
		{
			file: 'dist/index.esm.js',
			format: 'esm',
			sourcemap: true,
			inlineDynamicImports: true
		}
	],
	external: ['react', 'react-dom', 'dayjs'], // Mark peer dependencies as external
	plugins: [
		resolve(), // Resolves node_modules dependencies
		commonjs(), // Converts CommonJS modules to ES modules
		typescript({
			tsconfig: './tsconfig.json' // Uses your TypeScript configuration
		}),
		babel({
			presets: [
				['@babel/preset-react', { runtime: 'automatic' }],
				'@babel/preset-typescript' // Transforms TypeScript
			],
			extensions: ['.js', '.jsx', '.ts', '.tsx'], // File extensions to process
			babelHelpers: 'bundled' // Handles Babel runtime helpers
		})
	]
};

export default config;
