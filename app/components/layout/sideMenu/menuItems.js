import BorderColorIcon from '@material-ui/icons/BorderColor';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import WorkOutlinedIcon from '@material-ui/icons/WorkOutlined';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { APP_MODULE, FEATURES } from '../../../utils/constants';

export const menuItems = [
  {
    name: 'members',
    icon: PeopleIcon,
    children: [
      { name: 'directory', link: '/directory', slug: FEATURES.DIRECTORY },
      {
        name: 'message from ceo',
        slug: FEATURES.MESSAGE_FROM_CEO,
        link: '/ceo-message',
      },
    ],
  },
  {
    name: 'profit center',
    icon: BusinessCenterIcon,
    slug: FEATURES.PROFIT_CENTER,
    link: '/profit-center',
  },
  {
    name: 'Education',
    slug: FEATURES.EDUCATION,
    link: `/${APP_MODULE.EDUCATION}/home`,
    icon: QuestionAnswerIcon,
    children: [
      {
        name: 'Dashboard',
        link: `/${APP_MODULE.EDUCATION}/home`,
        slug: FEATURES.EDUCATION,
      },
      {
        name: 'Courses',
        link: `/${APP_MODULE.EDUCATION}/courses`,
        slug: `/${APP_MODULE.EDUCATION}/courses`,
      },
      {
        name: 'Reports',
        link: `/${APP_MODULE.EDUCATION}/reports`,
        slug: `/reports`,
      },
    ],
  },
  {
    name: 'blog',
    link: '/blogs',
    slug: FEATURES.BLOG,
    icon: BorderColorIcon,
  },
  {
    name: 'career',
    slug: FEATURES.CAREER,
    link: '/jobs',
    icon: WorkOutlinedIcon,
  },
  {
    name: 'file storage',
    link: '/documents',
    slug: FEATURES.FILE_STORAGE,
    icon: DescriptionIcon,
  },
  {
    name: 'links',
    link: '/link-categories',
    slug: FEATURES.LINKS,
    icon: LinkIcon,
  },
  {
    name: 'events',
    link: '/events',
    slug: FEATURES.EVENTS,
    icon: CalendarTodayIcon,
  },
  {
    name: 'settings',
    icon: BorderColorIcon,
    children: [
      { name: 'quote', link: '/quote', slug: FEATURES.QUOTE },
      { name: 'polls', link: '/polls', slug: FEATURES.POLLS },
      {
        name: 'announcement',
        link: '/announcement',
        slug: FEATURES.ANNOUNCEMENT,
      },
      {
        name: 'configuration',
        link: '/',
        children: [
          {
            name: 'titles',
            link: '/titles',
            slug: FEATURES.TITLE,
          },
          { name: 'groups', link: '/groups', slug: FEATURES.GROUP },
          { name: 'location', link: '/locations', slug: FEATURES.LOCATION },
          {
            name: 'department',
            link: '/departments',
            slug: FEATURES.DEPARTMENT,
          },
        ],
      },
    ],
  },
];
