import 'babel-polyfill';
import App from 'components/App';
import router from './router';
import store from './store/store';
import './controls/controls.js';
import './../styles/main.scss';
Vue.config.silent = true;
Vue.config.productionTip = false;

window.apiPath =  '';
if (__DEV__) {
    window.Utils = Utils;
    window.apiPath =  __IsLocal__ ? '' : '';
}

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
