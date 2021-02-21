import Auth from '@aws-amplify/auth';
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './plugins/router';
import './plugins/amplify';
import {User} from "@/models/User";
import Amplify from "aws-amplify"; // do not remove

Vue.config.productionTip = false

const rootApp = new Vue({
  vuetify,
  router,
  render: h => h(App),
  data(): {user: User | null} {
    return {
      user: null,
    }
  },
  async created() {
    this.setUser(await Amplify.Auth.currentAuthenticatedUser());
  },
  methods: {
    setUser(user: User) {
      console.log('[AppRoot] set user');
      this.user = user;
    }
  },
}).$mount('#app')

export {rootApp};
