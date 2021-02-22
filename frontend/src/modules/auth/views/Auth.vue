<template>
  <div>
    <amplify-authenticator :auth-config="authConfig">
      }
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
      unsubscribeAuth: undefined,
      authConfig: {
        signUpConfig: {
          hiddenDefaults: [
            'phone_number'
          ],
          signUpFields: [
            {
              label: 'First name',
              key: 'name',
              required: true,
              placeholder: 'First name',
              displayOrder: 0,
            },
            {
              label: 'Last name',
              key: 'family_name',
              required: false,
              placeholder: 'Last name',
              displayOrder: 1,
            },
          ],
        },
      },
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
