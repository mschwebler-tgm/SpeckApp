import Amplify from '@aws-amplify/core';
import Vue from 'vue';

const AWSConfig = {
    Auth: {
        region: process.env.VUE_APP_AMPLIFY_REGION,
        userPoolId: process.env.VUE_APP_AMPLIFY_USER_POOL_ID,
        userPoolWebClientId: process.env.VUE_APP_AMPLIFY_USER_POOL_WEB_CLIENT_ID,
    },
};

Amplify.configure(AWSConfig);
Vue.prototype.$Amplify = Amplify;
