import { routeList } from './centralPointRouteArray';

export function AppModuleRoute() {
  const routeArray = [...routeList];
  return routeArray;
}
