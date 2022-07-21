import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { deleteLink } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast, isFunction, errorToastTitle } from '../utils/helper';

export function useDeleteLink({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  const { categoryId } = useParams();
  return useMutation(deleteLink, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${count} link(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.links(categoryId));
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
