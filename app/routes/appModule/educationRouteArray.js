import {
  PERMISSIONS,
  FEATURES,
  APP_MODULE,
  NON_FEATURES,
} from '../../utils/constants';
import AddCourse from '../../containers/createCourse/loadable';
import EditCourse from '../../containers/editCourse/loadable';
import Test from '../../containers/editTest/loadable';
import EditTopic from '../../containers/editTopic/loadable';
import Courses from '../../containers/courses/loadable';
import CourseReports from '../../containers/courseReports/loadable';
import ViewResult from '../../containers/viewResult/loadable';
import EducationHome from '../../containers/educationHome/loadable';
import UserReport from '../../components/pages/userProfileReport/index';
import UserProfileReport from '../../containers/userReportProfile/loadable';
import EducationNotifications from '../../components/pages/educationNotifications';

const routeTypes = { public: 'public', private: 'private' };
const { READ, WRITE } = PERMISSIONS;
export const educationRouteArray = [
  {
    path: `/${APP_MODULE.EDUCATION}/home`,
    component: EducationHome,
    resource: NON_FEATURES.HOME,
    exact: true,
    breadCrumbKey: 'home',
    routeType: routeTypes.private,
  },
  {
    path: `/${APP_MODULE.EDUCATION}/courses`,
    component: Courses,
    exact: true,
    resource: `${FEATURES.EDUCATION}-${READ}`,
    breadCrumbKey: APP_MODULE.EDUCATION,
    routeType: routeTypes.private,
    simplifiedPath: APP_MODULE.EDUCATION,
    nestedRoutes: [
      {
        path: '/edit-test/:id',
        component: Test,
        exact: true,
        resource: `${FEATURES.EDUCATION}-${READ}`,
        breadCrumbKey: 'Edit Test',
        routeType: routeTypes.private,
        simplifiedPath: 'edit-test',
        noOfEnteriesToSkipAfterThisEntry: 1,
      },
      {
        path: '/add',
        component: AddCourse,
        exact: true,
        resource: `${FEATURES.EDUCATION}-${WRITE}`,
        breadCrumbKey: 'Create Course',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: AddCourse,
        exact: true,
        resource: `${FEATURES.EDUCATION}-${WRITE}`,
        breadCrumbKey: 'Edit Course',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
      {
        path: '/preview/:id',
        component: EditCourse,
        exact: true,
        resource: `${FEATURES.EDUCATION}-${READ}`,
        breadCrumbKey: 'Course Preview',
        simplifiedPath: 'preview',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
      {
        path: '/edit-topics/:topicId/step/:stepId?',
        component: EditTopic,
        exact: true,
        resource: `${FEATURES.TOPIC}-${READ}`,
        breadCrumbKey: 'Edit Topic',
        simplifiedPath: 'edit-topics',
        noOfEnteriesToSkipAfterThisEntry: 3,
        routeType: routeTypes.private,
      },
      {
        path: '/view-result/:id/:courseId',
        component: ViewResult,
        exact: true,
        resource: `${FEATURES.EDUCATION}-${READ}`,
        breadCrumbKey: 'Test Result',
        routeType: routeTypes.private,
        simplifiedPath: 'view-result',
        noOfEnteriesToSkipAfterThisEntry: 2,
      },
    ],
  },
  {
    path: `/${APP_MODULE.EDUCATION}/reports`,
    component: CourseReports,
    exact: true,
    resource: `${FEATURES.REPORTS}-${WRITE}`,
    breadCrumbKey: 'Reports',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/user/:id',
        component: UserReport,
        exact: true,
        resource: `${FEATURES.REPORTS}-${WRITE}`,
        breadCrumbKey: 'User Report',
        routeType: routeTypes.private,
      },
      {
        path: '/userprofile/:id',
        component: UserProfileReport,
        exact: true,
        resource: `${FEATURES.REPORTS}-${READ}`,
        breadCrumbKey: 'User',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: `/${APP_MODULE.EDUCATION}/notifications`,
    component: EducationNotifications,
    resource: FEATURES.NOTIFICATIONS,
    exact: true,
    breadCrumbKey: 'notifications',
    routeType: routeTypes.private,
  },
];
