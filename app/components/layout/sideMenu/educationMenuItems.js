import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import { APP_MODULE, FEATURES } from '../../../utils/constants';

export const educationMenuItems = [
  {
    name: 'My Dashboard',
    slug: FEATURES.EDUCATION,
    link: `/${APP_MODULE.EDUCATION}/home`,
    icon: DesktopWindowsIcon,
  },
  {
    name: 'Course',
    slug: FEATURES.EDUCATION,
    link: `/${APP_MODULE.EDUCATION}/courses`,
    icon: QuestionAnswerIcon,
  },
  {
    name: 'reports',
    slug: FEATURES.REPORTS,
    link: `/${APP_MODULE.EDUCATION}/reports`,
    icon: MenuBookIcon,
  },
];
