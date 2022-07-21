import { useMutation, useQuery, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { deleteUser, fetchUsers } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast, isFunction, errorToastTitle } from '../utils/helper';

export function useDeleteUser({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${count} user(s) deleted.`, 'success');
      queryClient.removeQueries(keys.users);
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

export function useFetchUser({ params, callbackFn, isFilter = false } = {}) {
  return useQuery(
    keys.getUsers({
      ...params,
    }),
    fetchUsers,
    {
      keepPreviousData: true,
      onSuccess: ({
        data: {
          data: { rows },
        },
      }) => {
        if (isFunction(callbackFn) && isFilter) {
          callbackFn(rows);
        }
      },
    }
  );
}
