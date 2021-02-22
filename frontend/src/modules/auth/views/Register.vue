<template>
  <div class="login-view">
    <amplify-sign-up
        :sign-up-config="{signUpFields: [	{
		label: 'Name',
		key: 'name',
		required: true,
		placeholder: 'Name',
		displayOrder: 1,
	}]}"
        header-text="My Custom Sign In Text"
        slot="sign-in"
    ></amplify-sign-up>
  </div>
</template>

<script>
import {AmplifyEventBus, components} from 'aws-amplify-vue';

export default {
  name: "Register",
  components: {
    ...components,
  },
  async mounted() {
    AmplifyEventBus.$on('authState', async (info) => {
      console.log(info);
    });
  },
}
</script>
