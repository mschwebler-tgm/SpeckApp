import Auth from '@aws-amplify/auth'; // do not remove
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './plugins/router';
import store from './plugins/store';
import './plugins/amplify';
import { User } from '@/modules/auth/models/User';
import Amplify from 'aws-amplify';
// @ts-ignore
import { AmplifyEventBus } from 'aws-amplify-vue';

Vue.config.productionTip = false;

const rootApp = new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
    data(): {user: User | null} {
        return {
            user: null,
        };
    },
    async created() {
    // @ts-ignore
        AmplifyEventBus.$on('authState', (_authState, userInfo) => {
            this.user = userInfo;
        });
        this.setUser(await Amplify.Auth.currentAuthenticatedUser());
    },
    methods: {
        setUser(user: User) {
            console.log('[AppRoot] set user');
            this.user = user;
        },
    },
}).$mount('#app');

export { rootApp };
