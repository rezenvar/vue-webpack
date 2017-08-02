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






if (module.hot) {
    module.hot.accept(['./modules/settings'], () => {
        store.hotUpdate({
            modules: {
                settings: require('./modules/settings').default
            }
        })
    })
}