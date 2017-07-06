import 'babel-polyfill';

let tests = require.context('./specs', true, /\.spec$/);
tests.keys().forEach(tests);