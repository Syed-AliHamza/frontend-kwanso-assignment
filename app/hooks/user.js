import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { deleteTask } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast, isFunction, errorToastTitle } from '../utils/helper';

export function useDeleteTask({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  return useMutation(deleteTask, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${count} task(s) deleted.`, 'success');
      queryClient.removeQueries(keys.tasks);
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
