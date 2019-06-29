import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';

import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: true
        },
        {
            file: pkg.module,
            format: "es",
            exports: "named",
            sourcemap: true
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
        replace({
            'process.env.NODE_ENV': `'${process.env.NODE_ENV || "development"}'`
        }),
        resolve(),
        commonJS({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/react/index.js': ['createElement', 'useState'],
                'node_modules/react-dom/index.js': ['render'],
                '@material/react-dialog': ['Dialog', 'DialogTitle', 'DialogContent'],
                '@material/react-text-field': ['TextField', 'HelperText', 'Input'],
                '@material/react-material-icon/dist/index.js': ['MaterialIcon'],

            }
        }),
        typescript({
            typescript: require('typescript'),
        }),
    ],
    onwarn: function (warning) {
        // Suppress this error message:
        // "The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten"
        if (warning.code === 'THIS_IS_UNDEFINED') return;

        console.error(warning.message);
    }
};