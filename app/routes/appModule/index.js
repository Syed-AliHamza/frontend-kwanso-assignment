import { centralPointRouteArray } from './centralPointRouteArray';
import { educationRouteArray } from './educationRouteArray';
import { unauthorizedRouteArray } from './unauthorizedRouteArray';

export function AppModuleRoute() {
  const routeArray = [
    ...centralPointRouteArray,
    ...educationRouteArray,
    ...unauthorizedRouteArray,
  ];
  return routeArray;
}
