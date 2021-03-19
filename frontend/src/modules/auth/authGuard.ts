import Amplify from 'aws-amplify';
import { NavigationGuard } from 'vue-router/types/router';
import rootApp from '@/main';

let user: any;
const authGuard: NavigationGuard = async function guard(to, _from, next) {
    console.log({ requiresAuth: to.meta.requiresAuth });
    if (!to.meta.requiresAuth) {
        next();
        return;
    }
    console.log('[NavigationGuard] Checking auth state...');
    try {
        user = await Amplify.Auth.currentAuthenticatedUser();
        console.log('[NavigationGuard] Success.');
        next();
    } catch (e) {
        console.log('[NavigationGuard] Error. Redirecting to auth');
        next({ name: 'auth' });
    }
};
const updateUser = () => {
    rootApp.setUser(user);
};

export { authGuard, updateUser };
