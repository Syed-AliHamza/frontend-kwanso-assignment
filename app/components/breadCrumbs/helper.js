import { useLocation } from 'react-router-dom';

export const filterRouteArrayByKey = (allRouteArray, key) =>
  allRouteArray?.filter((val) => {
    const result = val.simplifiedPath
      ? val.simplifiedPath === key
      : val.path.substring(1) === key;

    return result;
  });
export const returnNoOfEntriesToSkip = (
  parentRouteName,
  currentPathNameEntry = null,
  routeArray
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  const parentObj = filterRouteArrayByKey(routeArray, parentRouteName);
  if (currentPathNameEntry && parentObj[0] && parentObj[0].nestedRoutes) {
    const childObj = filterRouteArrayByKey(
      parentObj[0].nestedRoutes,
      currentPathNameEntry
    );
    const secondLvlNestedRoute = ['useful-links'];
    if (
      parentObj &&
      parentObj[0]?.nestedRoutes &&
      parentObj[0]?.nestedRoutes[2]?.nestedRoutes?.length > 0 &&
      location.pathname.includes(secondLvlNestedRoute)
    ) {
      return 1;
    }
    return childObj.length > 0 && childObj[0].noOfEnteriesToSkipAfterThisEntry
      ? childObj[0].noOfEnteriesToSkipAfterThisEntry
      : 0;
  }
  return parentObj.length > 0 && parentObj[0].noOfEnteriesToSkipAfterThisEntry
    ? parentObj[0].noOfEnteriesToSkipAfterThisEntry
    : 0;
};
export const returnBreadCrumbKey = (
  parentRouteName,
  currentPathNameEntry = null,
  routeArray
) => {
  // eslint-disable-next-line
  const location = useLocation();
  const parentObj = filterRouteArrayByKey(routeArray, parentRouteName);
  if (currentPathNameEntry && parentObj[0] && parentObj[0].nestedRoutes) {
    const childObj = filterRouteArrayByKey(
      parentObj[0].nestedRoutes,
      currentPathNameEntry
    );
    const thirdLvlNestedRoute = ['add', 'edit'];
    // if you're implemented 3 level nesting don't forget to include 2nd level path name here it'll discriminate the effect of 3rd level nesting at 1st level
    const secondLvlNestedRoute = ['useful-links'];
    if (
      thirdLvlNestedRoute.includes(currentPathNameEntry) &&
      parentObj &&
      parentObj[0]?.nestedRoutes &&
      parentObj[0]?.nestedRoutes[2]?.nestedRoutes?.length > 0 &&
      location.pathname.includes(secondLvlNestedRoute)
    ) {
      return currentPathNameEntry;
    }
    return childObj.length > 0
      ? childObj[0] && childObj[0].breadCrumbKey
      : currentPathNameEntry;
  }
  return parentObj.length > 0 && parentObj[0].breadCrumbKey
    ? parentObj[0].breadCrumbKey
    : parentRouteName;
};
