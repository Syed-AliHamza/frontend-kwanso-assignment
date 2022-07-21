import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { attemptTest, getTestResult } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { APP_MODULE } from '../utils/constants';
import {
  Toast,
  errorToastTitle,
  successToastTitle,
  navigateTo,
} from '../utils/helper';

export function useAttemptTest({ id, courseId }) {
  const history = useHistory();
  const queryClient = useQueryClient();
  return useMutation(attemptTest, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: successToastTitle({ title: 'Test Submitted Successfuly' }),
      });
      queryClient.removeQueries(keys.getTestResult({}));
      navigateTo(
        history,
        `/${APP_MODULE.EDUCATION}/courses/view-result/${id}/${courseId}`
      );
    },
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: errorToastTitle({ message }),
      });
    },
  });
}

export function useTestResult({ testId, userId }) {
  return useQuery(
    keys.getTestResult({
      testId,
      userId,
    }),
    getTestResult,
    {
      enabled: !!testId,
      onError: ({
        response: {
          data: { message },
        },
      }) => {
        Toast({
          icon: 'error',
          title: errorToastTitle({ message }),
        });
      },
    }
  );
}
