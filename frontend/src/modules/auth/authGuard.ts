import Amplify from 'aws-amplify';
import { NavigationGuard } from 'vue-router/types/router';

const authGuard: NavigationGuard = async function guard(to, _from, next) {
    const routeNeedsAuthentication = to.matched.some((route) => route.meta.requiresAuth);
    if (!routeNeedsAuthentication) {
        next();
        return;
    }
    console.log('[NavigationGuard] Checking auth state...');
    try {
        await Amplify.Auth.currentAuthenticatedUser();
        console.log('[NavigationGuard] Success.');
        next();
    } catch (e) {
        console.log('[NavigationGuard] Error. Redirecting to auth');
        next({ name: 'auth', params: { redirectRoute: to.fullPath } });
    }
};

export { authGuard };
