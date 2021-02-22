import Vue from 'vue';
import Vuex from 'vuex';
import calendar from '@calendar/store';

Vue.use(Vuex);

const modules = {
    calendar,
};

const store = new Vuex.Store({
    modules
});

for (const moduleName of Object.keys(modules)) {
    // @ts-ignore
    if (modules[moduleName].actions.initialize) {
        store.dispatch(moduleName + '/initialize');
    }
}

export default store;
