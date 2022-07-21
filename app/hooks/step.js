import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import {
  Toast,
  successToastTitle,
  errorToastTitle,
  isFunction,
} from '../utils/helper';
import { createStep, deleteStep } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';

export function useCreateStep({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  return useMutation(createStep, {
    onSuccess: ({ data: { data } }) => {
      Toast({
        icon: 'success',
        title: successToastTitle({ name: 'Step', isUpdated: false }),
      });
      if (isFunction(callbackFn)) callbackFn({ data });
      queryClient.invalidateQueries(keys.courses({}));
      queryClient.invalidateQueries(keys.getTopic({}));
      queryClient.invalidateQueries(keys.getCourse({}));
      queryClient.invalidateQueries(keys.getTopicProgress({}));
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

export function useDeleteStep({ callbackFn } = {}) {
  const queryClient = useQueryClient();

  return useMutation(deleteStep, {
    onSuccess: ({
      data: {
        data: { counts },
      },
    }) => {
      queryClient.invalidateQueries(keys.courses({}));
      queryClient.invalidateQueries(keys.getCourse({}));
      queryClient.invalidateQueries(keys.getTopicProgress({}));
      queryClient.invalidateQueries(keys.getTopic({}));
      queryClient.invalidateQueries(keys.getProgress({}));
      Swal.fire('Deleted!', `${counts} step(s) deleted.`, 'success');
      if (isFunction(callbackFn)) callbackFn();
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
