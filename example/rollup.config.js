import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default {
    input: 'src/app.ts',
    output: {
        name: 'iconpicker',
        file: 'app.js',
        format: 'iife',
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
    },
    external: [
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
        resolve(),
        commonJS({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/react/index.js': ['createElement', 'useState'],
                'node_modules/react-dom/index.js': ['render'],
                '@material/react-dialog': ['Dialog', 'DialogTitle', 'DialogContent'],
                '@material/react-text-field/dist/index.js': ['TextField', 'HelperText', 'Input'],
                '@material/react-material-icon/dist/index.js': ['MaterialIcon'],
                '@material/react-dialog/dist/index.js': ['Dialog'],
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