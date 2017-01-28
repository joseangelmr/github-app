import Layout from "../client/containers/Layout";
import usersRoute from './../client/features/users/route'

const routes = [{
    path: '/',
    component: Layout,
    childRoutes : [
        usersRoute
    ]
}];

function handleIndexRoute(route) {

    if (!route.childRoutes || !route.childRoutes.length) {
        return;
    }

    route.childRoutes = route.childRoutes.filter(child => {
        if (child.isIndex) {
            if (process.env.NODE_ENV === 'dev' && route.indexRoute) {
                console.error('More than one index route: ', route);
            }

            if (!route.indexRoute) {
                delete child.path;
                route.indexRoute = child;
                return false;
            }
        }
        return true;
    });

    route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);

export default routes;
