import Login from '../../containers/login';

const routeTypes = { public: 'public', private: 'private' };
export const unauthorizedRouteArray = [
  {
    path: '/',
    component: Login,
    exact: true,
    breadCrumbKey: 'login',
    routeType: routeTypes.public,
  },
];
