import CreateTask from '../../containers/createTask/loadable';
import Home from '../../containers/home/loadable';
import login from '../../containers/login/loadable';

const routeTypes = { public: 'public', private: 'private' };
export const routeList = [
  {
    path: '/',
    component: login,
    exact: true,
    breadCrumbKey: 'login',
    routeType: routeTypes.public,
  },
  {
    path: '/home',
    component: Home,
    exact: true,
    breadCrumbKey: 'login',
    routeType: routeTypes.public,
  },
  {
    path: '/createTask',
    component: CreateTask,
    exact: true,
    breadCrumbKey: 'login',
    routeType: routeTypes.public,
  },
];
