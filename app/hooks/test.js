import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { isFunction } from 'lodash';
import {
  deleteTest,
  createTest,
  updateTest,
  getTestById,
} from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast, errorToastTitle, successToastTitle } from '../utils/helper';

export function useDeleteTest() {
  const queryClient = useQueryClient();
  return useMutation(deleteTest, {
    onSuccess: ({
      data: {
        data: { counts },
      },
    }) => {
      queryClient.invalidateQueries(keys.courses({}));
      queryClient.invalidateQueries(keys.getCourse({}));
      queryClient.invalidateQueries(keys.getTopic({}));
      queryClient.invalidateQueries(keys.getProgress({}));
      Swal.fire('Deleted!', `${counts} test(s) deleted.`, 'success');
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

export function useCreateTest() {
  const queryClient = useQueryClient();

  return useMutation(createTest, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: successToastTitle({ name: 'Test', isUpdated: false }),
      });
      queryClient.invalidateQueries(keys.courses({}));
      queryClient.invalidateQueries(keys.getCourse({}));
      queryClient.invalidateQueries(keys.getProgress({}));
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

export function useUpdateTest({ callbackFn }) {
  const queryClient = useQueryClient();
  return useMutation(updateTest, {
    onSuccess: () => {
      if (isFunction(callbackFn)) {
        callbackFn();
      }
      Toast({
        icon: 'success',
        title: successToastTitle({ name: 'Test', isUpdated: false }),
      });
      queryClient.removeQueries(keys.getTest({}));
      queryClient.invalidateQueries(keys.courses({}));
      queryClient.invalidateQueries(keys.getCourse({}));
    },
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      if (isFunction(callbackFn)) {
        callbackFn();
      }
      Toast({
        icon: 'error',
        title: errorToastTitle({ message }),
      });
    },
  });
}

export function useGetByIdTest({ id, view }) {
  return useQuery(
    keys.getTest({
      id,
      view,
    }),
    getTestById,
    {
      enabled: !!id,
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
