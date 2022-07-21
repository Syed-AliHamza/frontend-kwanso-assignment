import { useMutation, useQuery, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import {
  deleteCourse,
  getCourses,
  markProgressCompletion,
} from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import {
  Toast,
  isFunction,
  errorToastTitle,
  successToastTitle,
} from '../utils/helper';
import { FEATURES, PERMISSIONS } from '../utils/constants';
import { usePermission } from './permission';

export function useDeleteCourse({ callbackFn } = {}) {
  const queryClient = useQueryClient();

  return useMutation(deleteCourse, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      queryClient.invalidateQueries(keys.courses({}));
      Swal.fire('Deleted!', `${count} course(s) deleted.`, 'success');
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

export function useListCourse({
  query,
  filters,
  pageNumber,
  currentPage,
  gridView,
}) {
  const isReadAllowed = usePermission(
    `${FEATURES.EDUCATION}-${PERMISSIONS.READ}`
  );
  return useQuery(
    keys.courses({
      query,
      filters,
      pageNumber,
      currentPage,
      gridView,
    }),
    getCourses,
    {
      keepPreviousData: true,
      enabled: isReadAllowed,
    }
  );
}

export function useMarkProgressComplete({ isResult }) {
  const queryClient = useQueryClient();
  return useMutation(markProgressCompletion, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: successToastTitle({
          name: 'Mark As Complete',
          isUpdated: true,
        }),
      });
      if (isResult) {
        queryClient.invalidateQueries(keys.getTestResult({}));
      } else {
        queryClient.invalidateQueries(keys.getTopic({}));
        queryClient.invalidateQueries(keys.getTopicProgress({}));
      }
      queryClient.removeQueries(keys.getProgress({}));
      queryClient.invalidateQueries(keys.courses({}));
      queryClient.invalidateQueries(keys.getCourse({}));
    },
  });
}
