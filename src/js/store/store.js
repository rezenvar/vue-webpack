import Vuex from 'vuex';

// modules
import settings from './modules/settings';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        settings,
    },
});


export default store;
