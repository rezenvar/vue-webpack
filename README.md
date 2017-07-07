# vue-webpack

## What included:

- Vue, Vuex, Vue-router configuration
- Utils with validate(for validator component), ajax method(you need to declare global var apiPath to use it)

## Webpack config:

### Config folder contains configuration:

- build.config.js - for production build, outputs files in dist folder, also creates webpack visual schem of bundle. __DEV__ == false, __isLocal__ == false. command: npm run build
- debug.config.js - for local development run webpack server with hot reload. Port : 8288. __DEV__ == true, __isLocal__ == false. command: npm run debug
- dev.config.js - equal to debug.config.js but : __DEV__ == true, __isLocal__ == true. command: npm run dev

### Karma

npm run unit will run karma (config located in test folder)

### Stylelint

Stylelint with base configuration
