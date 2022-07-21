import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { deleteJob } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast, isFunction, errorToastTitle } from '../utils/helper';

export function useDeleteJob({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  return useMutation(deleteJob, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${count} job(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.getJobs({}));
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
