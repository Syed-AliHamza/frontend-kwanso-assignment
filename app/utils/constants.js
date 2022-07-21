export const STYLE_CONSTANTS = {
  HEADER_WIDTH: '5rem',
  menuWidth: '5rem',
};

export const FILE_ACCEPT_TYPES = {
  imageFiles: 'image/x-png,image/jpeg,image/jpg',
};
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 100];
export const TABLE_PAGE_SIZE = 10;
export const LIST_PAGE_SIZE = 9;
export const LOCAL_STORAGE_ENTRIES = { user: 'user' };
export const MAX_UPLOADABLE_IMAGE_SIZE_IN_MBS = 10; // Mb
export const MIN_UPLOADABLE_IMAGE_SIZE_IN_MBS = 0.1; // Mb
export const MIN_UPLOADABLE_FILE_SIZE_IN_MBS = 0; // Mb
export const MAX_UPLOADABLE_FILE_SIZE_IN_MBS = 100; // Mb
export const CELL_VALUE_LENGTH = 150; // Length of cell value
export const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
];
export const STATUS_CODES = {
  FORBIDDEN: 403,
};

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const PERMISSIONS = {
  READ: 'read',
  WRITE: 'write',
};
export const DEFAULT_RESOURCES = [
  'BIRTHDAY',
  'BANNER_IMAGE',
  'ANNOUNCEMENT',
  'LOCATION',
  'DEPARTMENT',
  'WORK_ANNIVERSARY',
  'MESSAGE_FROM_CEO',
  'QUOTE',
  'GROUP',
  'RESOURCES',
  'TITLE',
];
export const DEPENDENT_RESOURCES = [
  {
    subject: 'CAREER',
    dependent: 'APPLICANT',
    readOnly: false,
  },
  {
    subject: 'LINKS',
    dependent: 'USEFUL_LINKS',
    readOnly: true,
  },
  {
    subject: 'POLLS',
    dependent: 'VOTE',
    readOnly: true,
  },
  {
    subject: 'EDUCATION',
    dependent: 'TOPIC',
    readOnly: true,
  },
  {
    subject: 'EDUCATION',
    dependent: 'STEP',
    readOnly: false,
  },
  {
    subject: 'EDUCATION',
    dependent: 'TEST',
    readOnly: true,
  },
  {
    subject: 'EDUCATION',
    dependent: 'ATTEMPT',
    readOnly: false,
  },
  {
    subject: 'EDUCATION',
    dependent: 'MARK_AS_COMPLETE',
    readOnly: false,
  },
  {
    subject: 'EDUCATION',
    dependent: 'DASHBOARD',
    readOnly: true,
  },
];
export const HIDDEN_FEATURES = [
  'TOPIC',
  'STEP',
  'TEST',
  'ATTEMPT',
  'MARK_AS_COMPLETE',
  'DASHBOARD',
];

export const READ_ONLY_FEATURES = ['BIRTHDAY', 'WORK_ANNIVERSARY'];
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};
export const CKEDITOR_CUSTOM_CONFIG = {
  placeholder: 'Start by typing content here!',
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
    ],
  },
  image: {
    toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  mediaEmbed: {
    previewsInData: true,
  },
};

export const POLL_OPTIONS_LIMIT = 4;

export const APIS = {
  LOGIN: 'users/login',
  GOOGLE_LOGIN: 'users/googleLogin',
  USERS_DELETE: '/users/deleteUsers',
  USERS: '/users',
  USER_TITLE: '/users/title',
  USERS_BULK_UPDATE: '/users/userBulkUpdate',
  BIRTHDAYS: '/users/birthday',
  QUOTE: '/quote',
  FILE_UPLOAD: 'users/upload',
  LINKS: '/usefulLinks',
  DELETE_LINK: '/usefulLinks/deleteLinks',
  ANNOUNCEMENT: '/announcements',
  ANNOUNCEMENT_DELETE: '/announcements/deleteAnnouncements',
  GET_ANNOUNCEMENTS: '/announcements/userAnnouncements',
  CEO_MESSAGE: '/ceo',
  EVENTS: '/events',
  BLOG: '/blogs',
  CATEGORY: '/linkCategories',
  LOCATIONS: '/locations',
  DEPARTMENTS: '/departments',
  BANNER_IMAGE: 'bannerImage',
  WORK_ANNIVERSARY: '/users/workAnniversary',
  DOCUMENTS: '/documents',
  DOCUMENT_SORT_ORDER: '/documents/updateSortOrder',
  DOCUMENT: '/documents',
  RING_GROUP: '/ringGroups',
  JOB: '/jobs',
  APPLICANT: '/jobApplicant',
  POLL: '/polls',
  VOTE: '/vote',
  PROFIT_CENTER: '/profitCenter',
  RESOURCE: '/resources',
  GROUP: '/groups',
  COURSES: '/courses',
  STEPS: '/steps',
  PROGRESS_COMPLETION: '/courses/markAsComplete',
  TOPICS: '/topics',
  TESTS: '/tests',
  TOPIC_PROGRESS: '/topics/progress',
  UPDATE_TOPIC_SORT_ORDER: '/updateTopicSortOrder',
  UPDATE_STEP_SORT_ORDER: '/updateStepSortOrder',
  REPORTS: '/reports/courses',
  REPORTS_USERS: '/reports/users',
  ATTEMPT_TEST: '/attempts',
  TITLES: '/titles',
  USER_COURSE_PROGRESS: 'courses/userCoursesProgress',
  MARK_COURSE_PROGRESS_COMPLETE: '/courses/markBulkCoursesAsComplete',
  REMOVE_COURSE_PROGRESS: '/courses/removeCourseProgress',
  DASHBOARD: '/dashboard',
};
export const FEATURES = {
  DIRECTORY: 'DIRECTORY',
  BANNER_IMAGE: 'BANNER_IMAGE',
  MESSAGE_FROM_CEO: 'MESSAGE_FROM_CEO',
  PROFIT_CENTER: 'PROFIT_CENTER',
  BLOG: 'BLOG',
  CAREER: 'CAREER',
  EDUCATION: 'EDUCATION',
  FILE_STORAGE: 'FILE_STORAGE',
  LINKS: 'LINKS',
  USEFUL_LINKS: 'USEFUL_LINKS',
  QUOTE: 'QUOTE',
  EVENTS: 'EVENTS',
  MARK_AS_COMPLETE: 'MARK_AS_COMPLETE',
  POLLS: 'POLLS',
  ANNOUNCEMENT: 'ANNOUNCEMENT',
  BIRTHDAY: 'BIRTHDAY',
  WORK_ANNIVERSARY: 'WORK_ANNIVERSARY',
  RING_GROUP: 'RING_GROUP',
  APPLICANT: 'APPLICANT',
  LOCATION: 'LOCATION',
  GROUP: 'GROUP',
  DEPARTMENT: 'DEPARTMENT',
  VOTE: 'VOTE',
  TOPIC: 'TOPIC',
  STEP: 'STEP',
  TEST: 'TEST',
  ATTEMPT: 'ATTEMPT',
  TITLE: 'TITLE',
  DASHBOARD: 'DASHBOARD',
  USER_PROFILE_REPORT: 'USER_PROFILE_REPORT',
  USER_COURSE_REPORTS: 'USER_COURSE_REPORTS',
};
export const EDUCATION_DEPENDENT_WRITE_FEATUERS = [
  FEATURES.STEP,
  FEATURES.ATTEMPT,
  FEATURES.MARK_AS_COMPLETE,
];
export const NON_FEATURES = {
  HOME: 'HOME',
  PROFILE: 'PROFILE',
  CONFIGURATION: 'CONFIGURATION',
  BANNER_IMAGE: 'BANNER_IMAGE',
  ACCESS_DENIED: 'ACCESS_DENIED',
  NOT_FOUND: 'NOT_FOUND',
  NOTIFICATIONS: 'NOTIFICATIONS',
};
export const COLOR_ARRAY = ['success', 'error', 'warning', 'info'];

export const NO_DEPARTMENTS_ASSIGNED = 'No department(s) assigned';
export const NO_USERS_ASSIGNED = 'No user(s) assigned';
export const UNOWNED = 'Unowned';
export const PUBLISHED = 'published';
export const UNPUBLISHED = 'unpublished';
export const NO_TITLES_ASSIGNED = 'No title(s) assigned';
export const NO_LOCATIONS_ASSIGNED = 'No location(s) assigned';

export const MAX_ANSWER_COUNT_LIMIT = 4;
export const MIN_ANSWER_COUNT_LIMIT = 2;

export const MAX_QUESTIONS_COUNT_LIMIT = 50;

export const COURSE_CONTENT_TYPE = {
  TOPIC: 'topic',
  TEST: 'test',
};

export const APP_MODULE = {
  CENTRAL_POINT: 'cp',
  EDUCATION: 'edu',
};

export const BADGE_STATUS = {
  COMPLETE: 'complete',
  NOT_STARTED: 'not started',
  INPROGRESS: 'inprogress',
};
export const COURSE_TYPE = {
  STANDARD: 'Standard',
  REFERENCE: 'Reference',
};
