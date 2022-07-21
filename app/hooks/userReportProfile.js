import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  getUserCourseProgressById,
  markCourseProgressComplete,
  removeCourseProgress,
} from '../state/queryFunctions';
import { Toast, errorToastTitle, successToastTitle } from '../utils/helper';
import { keys } from '../state/queryKeys';
import { usePermission } from './permission';
import { FEATURES, PERMISSIONS } from '../utils/constants';

export function useGetByIdUserProfile({ userId, type, courseTitle }) {
  const isEducationAllowed = usePermission(
    `${FEATURES.EDUCATION}-${PERMISSIONS.READ}`
  );
  return useQuery(
    keys.getUserProgress({
      userId: userId || null,
      type: type || 'all',
      courseTitle: courseTitle || '',
    }),
    getUserCourseProgressById,
    {
      keepPreviousData: true,
      enabled: isEducationAllowed,
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

export function useMarkProgressComplete() {
  const queryClient = useQueryClient();
  return useMutation(markCourseProgressComplete, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: successToastTitle({
          name: 'Progress',
          isUpdated: true,
        }),
      });
      queryClient.invalidateQueries(keys.getUserProgress);
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

export function useRemoveCourseProgress() {
  const queryClient = useQueryClient();
  return useMutation(removeCourseProgress, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: successToastTitle({
          name: 'Progress',
          isUpdated: true,
        }),
      });
      queryClient.invalidateQueries(keys.getUserProgress);
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
