import addUsefulLink from '../../containers/addUsefulLink/loadable';
import addLocation from '../../containers/addLocation/loadable';
import addCeoMessage from '../../containers/addCeoMessage/loadable';
import CreateUser from '../../containers/createUser/loadable';
import Directory from '../../containers/directory/loadable';
import DirectoryImporter from '../../containers/directoryImporter/loadable';
import EditUser from '../../containers/editUser/loadable';
import Announcement from '../../containers/announcement/loadable';
import Blogs from '../../containers/blog/loadable';
import BlogDetail from '../../containers/blogDetail/loadable';
import CreateAnnouncement from '../../containers/createAnnouncement/loadable';
import EditAnnouncement from '../../containers/editAnnouncement/loadable';
import Home from '../../containers/home/loadable';
import Login from '../../containers/login';
import Quote from '../../containers/qoute/loadable';
import usefulLinks from '../../containers/usefulLinks/loadable';
import UserProfile from '../../containers/userProfile/loadable';
import CeoMessage from '../../containers/ceoMessage/loadable';
import Events from '../../containers/events/loadable';
import {
  PERMISSIONS,
  FEATURES,
  NON_FEATURES,
  APP_MODULE,
} from '../../utils/constants';
import createEvent from '../../containers/createEvent/loadable';
import ViewEvent from '../../containers/viewEvent/loadable';
import createBlog from '../../containers/createBlog/loadable';
import createPoll from '../../containers/createPoll/loadable';
import Polls from '../../containers/polls/loadable';
import CreateLinkCategory from '../../containers/createLinkCategory/loadable';
import UsefulLinksCategory from '../../containers/usefulLinksCategory/loadable';
import Locations from '../../containers/location/loadable';
import Departments from '../../containers/department/loadable';
import CreateDepartment from '../../containers/addDepartment/loadable';
import Documents from '../../containers/document/loadable';
import AddDocument from '../../containers/createDocument/loadable';
import AddRingGroup from '../../containers/createRingGroup/loadable';
import RingGroup from '../../containers/ringGroup/loadable';
import Jobs from '../../containers/jobs/loadable';
import AddApplicant from '../../containers/createApplicant/loadable';
import Applicant from '../../containers/applicant/loadable';
import AddJob from '../../containers/createJob/loadable';
import AddProfitCenter from '../../containers/createProfitCenter/loadable';
import ProfitCenter from '../../containers/profitCenter';
import AddGroup from '../../containers/createGroup/loadable';
import Groups from '../../containers/groups';
import BulkEditUser from '../../containers/bulkEditUser/loadable';
import AccessDenied from '../../containers/accessDenied/loadable';
import Titles from '../../containers/title/loadable';
import CreateTitle from '../../containers/addTitle/loadable';

const routeTypes = { public: 'public', private: 'private' };
const { READ, WRITE } = PERMISSIONS;
export const routeArray = [
  {
    path: '/',
    component: Login,
    exact: true,
    breadCrumbKey: 'login',
    routeType: routeTypes.public,
  },
  {
    path: `/${APP_MODULE.CENTRAL_POINT}/home`,
    component: Home,
    resource: NON_FEATURES.HOME,
    exact: true,
    breadCrumbKey: 'home',
    routeType: routeTypes.private,
  },
  {
    path: '/directory',
    component: Directory,
    exact: true,
    resource: `${FEATURES.DIRECTORY}-${READ}`,
    breadCrumbKey: 'Directory',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/upload',
        component: DirectoryImporter,
        resource: `${FEATURES.DIRECTORY}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Upload Directory',
        routeType: routeTypes.private,
      },
      {
        path: `/add`,
        component: CreateUser,
        exact: true,
        resource: `${FEATURES.DIRECTORY}-${WRITE}`,
        breadCrumbKey: 'Create User',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: EditUser,
        exact: true,
        simplifiedPath: 'edit',
        resource: `${FEATURES.DIRECTORY}-${WRITE}`,
        breadCrumbKey: 'Edit User',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
      {
        path: '/bulk-edit/:ids',
        component: BulkEditUser,
        exact: true,
        simplifiedPath: 'bulkEdit',
        resource: `${FEATURES.DIRECTORY}-${WRITE}`,
        breadCrumbKey: 'Edit Bulk User',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
    ],
  },

  {
    path: '/quote',
    component: Quote,
    resource: `${FEATURES.QUOTE}-${READ}`,
    exact: true,
    breadCrumbKey: 'Daily Quote',
    routeType: routeTypes.private,
  },
  {
    path: '/profile',
    component: UserProfile,
    resource: `${NON_FEATURES.PROFILE}`,
    exact: true,
    breadCrumbKey: 'Edit Profile',
    routeType: routeTypes.private,
  },
  {
    path: '/ceo-message',
    component: CeoMessage,
    exact: true,
    resource: `${FEATURES.MESSAGE_FROM_CEO}-${READ}`,
    breadCrumbKey: 'Ceo Message',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/edit',
        component: addCeoMessage,
        exact: true,
        resource: `${FEATURES.MESSAGE_FROM_CEO}-${WRITE}`,
        breadCrumbKey: 'Edit Ceo Message',
      },
    ],
  },
  {
    path: '/announcement',
    component: Announcement,
    resource: `${FEATURES.ANNOUNCEMENT}-${READ}`,
    exact: true,
    breadCrumbKey: 'Announcement',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: `/add`,
        component: CreateAnnouncement,
        resource: `${FEATURES.ANNOUNCEMENT}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Create Announcement',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: EditAnnouncement,
        resource: `${FEATURES.ANNOUNCEMENT}-${WRITE}`,
        exact: true,
        simplifiedPath: 'edit',
        breadCrumbKey: 'Edit Announcement',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/events',
    component: Events,
    resource: `${FEATURES.EVENTS}-${READ}`,
    exact: true,
    breadCrumbKey: 'Events',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/add',
        component: createEvent,
        exact: true,
        resource: `${FEATURES.EVENTS}-${WRITE}`,
        breadCrumbKey: 'Create Event',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: createEvent,
        exact: true,
        resource: `${FEATURES.EVENTS}-${WRITE}`,
        breadCrumbKey: 'Edit Event',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
      {
        path: '/view/:id',
        component: ViewEvent,
        exact: true,
        resource: `${FEATURES.EVENTS}-${READ}`,
        breadCrumbKey: 'View Event',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/blogs',
    component: Blogs,
    exact: true,
    resource: `${FEATURES.BLOG}-${READ}`,
    breadCrumbKey: 'Blogs',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/add',
        component: createBlog,
        exact: true,
        resource: `${FEATURES.BLOG}-${WRITE}`,
        breadCrumbKey: 'Create Blog',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: createBlog,
        resource: `${FEATURES.BLOG}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Edit Blog',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
      {
        path: '/detail/:id',
        component: BlogDetail,
        exact: true,
        resource: `${FEATURES.BLOG}-${READ}`,
        breadCrumbKey: 'Blog Detail',
        simplifiedPath: 'detail',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/polls',
    component: Polls,
    exact: true,
    resource: `${FEATURES.POLLS}-${READ}`,
    breadCrumbKey: 'Polls',
    routeType: routeTypes.private,

    nestedRoutes: [
      {
        path: '/add',
        component: createPoll,
        resource: `${FEATURES.POLLS}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Create Poll',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: createPoll,
        resource: `${FEATURES.POLLS}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Edit Poll',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/link-categories',
    component: UsefulLinksCategory,
    exact: true,
    resource: `${FEATURES.LINKS}-${READ}`,
    breadCrumbKey: 'Link Categories',
    routeType: routeTypes.private,

    nestedRoutes: [
      {
        path: '/add',
        component: CreateLinkCategory,
        exact: true,
        resource: `${FEATURES.LINKS}-${WRITE}`,
        breadCrumbKey: 'Create Link Category',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: CreateLinkCategory,
        exact: true,
        resource: `${FEATURES.LINKS}-${WRITE}`,
        breadCrumbKey: 'Edit Link Category',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
      {
        path: '/useful-links/:categoryId',
        component: usefulLinks,
        exact: true,
        resource: `${FEATURES.USEFUL_LINKS}-${READ}`,
        breadCrumbKey: 'Useful Links',
        simplifiedPath: 'useful-links',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
        nestedRoutes: [
          {
            path: '/add',
            component: addUsefulLink,
            exact: true,
            resource: `${FEATURES.USEFUL_LINKS}-${WRITE}`,
            thirdLvlNesting: true,
            breadCrumbKey: 'Create Link',
            routeType: routeTypes.private,
          },
          {
            path: '/edit/:id',
            component: addUsefulLink,
            resource: `${FEATURES.USEFUL_LINKS}-${WRITE}`,
            simplifiedPath: 'edit',
            thirdLvlNesting: true,
            exact: true,
            noOfEnteriesToSkipAfterThisEntry: 1,
            breadCrumbKey: 'Edit Link',
            routeType: routeTypes.private,
          },
        ],
      },
    ],
  },
  {
    path: '/locations',
    component: Locations,
    exact: true,
    resource: `${FEATURES.LOCATION}-${READ}`,
    breadCrumbKey: 'Locations',
    routeType: routeTypes.private,

    nestedRoutes: [
      {
        path: '/add',
        component: addLocation,
        resource: `${FEATURES.LOCATION}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Create Location',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: addLocation,
        resource: `${FEATURES.LOCATION}-${WRITE}`,
        simplifiedPath: 'edit',
        exact: true,
        noOfEnteriesToSkipAfterThisEntry: 1,
        breadCrumbKey: 'Edit Location',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/departments',
    component: Departments,
    resource: `${FEATURES.DEPARTMENT}-${READ}`,
    exact: true,
    breadCrumbKey: 'Departments',
    routeType: routeTypes.private,

    nestedRoutes: [
      {
        path: '/add',
        component: CreateDepartment,
        exact: true,
        resource: `${FEATURES.DEPARTMENT}-${WRITE}`,
        breadCrumbKey: 'Create Department',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: CreateDepartment,
        simplifiedPath: 'edit',
        resource: `${FEATURES.DEPARTMENT}-${WRITE}`,
        exact: true,
        noOfEnteriesToSkipAfterThisEntry: 1,
        breadCrumbKey: 'Edit Department',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/titles',
    component: Titles,
    resource: `${FEATURES.TITLE}-${READ}`,
    exact: true,
    breadCrumbKey: 'Titles',
    routeType: routeTypes.private,

    nestedRoutes: [
      {
        path: '/add',
        component: CreateTitle,
        exact: true,
        resource: `${FEATURES.TITLE}-${WRITE}`,
        breadCrumbKey: 'Create Title',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: CreateTitle,
        simplifiedPath: 'edit',
        resource: `${FEATURES.TITLE}-${WRITE}`,
        exact: true,
        noOfEnteriesToSkipAfterThisEntry: 1,
        breadCrumbKey: 'Edit Title',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/documents',
    component: Documents,
    exact: true,
    resource: `${FEATURES.FILE_STORAGE}-${READ}`,
    breadCrumbKey: 'Documents',
    routeType: routeTypes.private,

    nestedRoutes: [
      {
        path: '/add',
        component: AddDocument,
        exact: true,
        resource: `${FEATURES.FILE_STORAGE}-${WRITE}`,
        breadCrumbKey: 'Create Document',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: AddDocument,
        resource: `${FEATURES.FILE_STORAGE}-${WRITE}`,
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        exact: true,
        breadCrumbKey: 'Edit Document',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/ring-group',
    component: RingGroup,
    resource: `${FEATURES.RING_GROUP}-${READ}`,
    exact: true,
    breadCrumbKey: 'Ring Group',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/add',
        component: AddRingGroup,
        resource: `${FEATURES.RING_GROUP}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Create Ring Group',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: AddRingGroup,
        simplifiedPath: 'edit',
        resource: `${FEATURES.RING_GROUP}-${READ}`,
        noOfEnteriesToSkipAfterThisEntry: 1,
        exact: true,
        breadCrumbKey: 'Edit Ring Group',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/jobs',
    component: Jobs,
    exact: true,
    resource: `${FEATURES.CAREER}-${READ}`,
    breadCrumbKey: 'Jobs',
    routeType: routeTypes.private,

    nestedRoutes: [
      {
        path: '/applicants/:id',
        component: Applicant,
        resource: `${FEATURES.CAREER}-${READ}`,
        exact: true,
        simplifiedPath: 'applicants',
        noOfEnteriesToSkipAfterThisEntry: 1,
        breadCrumbKey: 'Applicant',
        routeType: routeTypes.private,
      },
      {
        path: '/add',
        component: AddJob,
        exact: true,
        resource: `${FEATURES.CAREER}-${WRITE}`,
        breadCrumbKey: 'Create Job',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: AddJob,
        simplifiedPath: 'edit',
        resource: `${FEATURES.CAREER}-${WRITE}`,
        noOfEnteriesToSkipAfterThisEntry: 1,
        exact: true,
        breadCrumbKey: 'Edit Job',
        routeType: routeTypes.private,
      },
      {
        path: '/apply/:id',
        component: AddApplicant,
        exact: true,
        resource: `${FEATURES.CAREER}-${READ}`,
        breadCrumbKey: 'Apply',
        simplifiedPath: 'apply',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/profit-center',
    component: ProfitCenter,
    exact: true,
    resource: `${FEATURES.PROFIT_CENTER}-${READ}`,
    breadCrumbKey: 'Profit Center',
    routeType: routeTypes.private,

    nestedRoutes: [
      {
        path: '/add',
        component: AddProfitCenter,
        exact: true,
        resource: `${FEATURES.PROFIT_CENTER}-${WRITE}`,
        breadCrumbKey: 'Create Profit Center',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: AddProfitCenter,
        resource: `${FEATURES.PROFIT_CENTER}-${WRITE}`,
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        exact: true,
        breadCrumbKey: 'Edit Profit Center',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/groups',
    component: Groups,
    resource: `${FEATURES.GROUP}-${READ}`,
    exact: true,
    breadCrumbKey: 'Groups',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/add',
        component: AddGroup,
        resource: `${FEATURES.GROUP}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Create Group',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: AddGroup,
        simplifiedPath: 'edit',
        resource: `${FEATURES.GROUP}-${WRITE}`,
        noOfEnteriesToSkipAfterThisEntry: 1,
        exact: true,
        breadCrumbKey: 'Edit Group',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/access-denied',
    component: AccessDenied,
    exact: true,
    resource: NON_FEATURES.ACCESS_DENIED,
    breadCrumbKey: 'Access Denied',
    routeType: routeTypes.private,
  },
];
