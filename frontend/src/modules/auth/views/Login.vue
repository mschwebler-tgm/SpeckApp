<template>
  <div class="login-view">
    <amplify-sign-in
        header-text="My Custom Sign In Text"
        slot="sign-in"
    ></amplify-sign-in>
  </div>
</template>

<script>
import {AmplifyEventBus, components} from 'aws-amplify-vue';

export default {
  name: "Login",
  components: {
    ...components,
  },
  async mounted() {
    AmplifyEventBus.$on('authState', async (info) => {
      if (info === 'signUp') {
        this.$router.push({name: 'register'});
      }
      console.log(info);
    });
  },
}
</script>
