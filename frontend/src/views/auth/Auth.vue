<template>
  <div>
    <amplify-authenticator>
      <div v-if="authState === 'signedin' && user">
        <div>Hello, {{ user.username }}</div>
      </div>
      <amplify-sign-out></amplify-sign-out>
    </amplify-authenticator>
  </div>
</template>

<script>
import {AmplifyEventBus, components} from 'aws-amplify-vue';
import {rootApp} from "@/main";

export default {
  name: 'AuthStateApp',
  components: {
    ...components,
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined
    }
  },
  watch: {
    user(user) {
      if (user) {
        rootApp.setUser(user);
      }
    }
  },
  created() {
    console.log('created')
    this.unsubscribeAuth = async (authState, authData) => {
      console.log(authState)
      this.authState = authState;
      this.user = authData;
    }
    AmplifyEventBus.$on('authState', this.unsubscribeAuth);
  },
  beforeDestroy() {
    this.unsubscribeAuth();
  }
}
</script>
