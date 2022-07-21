import moment from 'moment';
import { isEmpty, isEqual, xorWith } from 'lodash';
import { APP_MODULE, BADGE_STATUS, COURSE_CONTENT_TYPE } from './constants';
import { colors } from '../theme/colors';
import { navigateTo } from './helper';

export const parseDate = (date, format) =>
  moment(date).format(format || 'MM/DD/YYYY');
export function noWhitespace() {
  return this.transform((value, originalValue) =>
    /^[ ]*$/.test(originalValue) ? NaN : value
  );
}

export const createFormData = (object) =>
  Object.keys(object).reduce((formData, key) => {
    if (object[key]) formData.append(key, object[key]);
    return formData;
  }, new FormData());

export const isArrayEqual = (x, y) => isEmpty(xorWith(x, y, isEqual));
export const getChangedValues = (values, initialValues) =>
  Object.entries(values).reduce((acc, [key, value]) => {
    const hasChanged = initialValues[key] !== value;

    if (hasChanged) {
      acc[key] = value;
    }

    return acc;
  }, {});
const { COMPLETE, NOT_STARTED, INPROGRESS } = BADGE_STATUS;
export const getStateBadgeColor = (value) => {
  if (value === COMPLETE) {
    return colors.darkGreen;
  }
  if (value === NOT_STARTED) {
    return colors.darkYellow;
  }
  if (value === INPROGRESS) {
    return colors.pictonBlue;
  }
  return colors.lightGrey;
};
export const getTooltipValue = ({
  feature,
  isWriteAllowed,
  isAlreadyMarkedComplete,
  isMarkasCompleteAllowed,
}) => {
  let toolTipValue;
  if (isWriteAllowed) {
    toolTipValue = `Admins can not mark the ${feature} as complete`;
  } else if (isAlreadyMarkedComplete) {
    toolTipValue = `You already marked this ${feature} as complete`;
  } else if (!isMarkasCompleteAllowed) {
    toolTipValue = `You are not allowed to mark this ${feature} as complete`;
  } else {
    toolTipValue = '';
  }
  return toolTipValue;
};

export const handlePreviewNavigation = ({ history, id }) => {
  navigateTo(history, `/${APP_MODULE.EDUCATION}/courses/preview/${id}`);
};

const { TOPIC, TEST } = COURSE_CONTENT_TYPE;
export const getNavigationPath = ({ topicId, stepId, type, attemptId }) => {
  let path;
  if (type === TOPIC) {
    path = `/${APP_MODULE.EDUCATION}/courses/edit-topics/${topicId}/step/${
      stepId || ''
    }`;
  }

  if (type === TEST) {
    if (attemptId) {
      path = `/${APP_MODULE.EDUCATION}/courses/view-result/${topicId}/${attemptId}`;
    } else {
      path = `/${APP_MODULE.EDUCATION}/courses/edit-test/${topicId}`;
    }
  }
  return path;
};
