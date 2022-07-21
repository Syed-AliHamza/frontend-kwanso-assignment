import { useMutation, useQuery, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { deleteUser, fetchUsers } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { Toast, isFunction, errorToastTitle } from '../utils/helper';
import { usePermission } from './permission';
import { FEATURES, PERMISSIONS } from '../utils/constants';

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
  const isReadAllowed = usePermission(
    `${FEATURES.DIRECTORY}-${PERMISSIONS.READ}`
  );

  return useQuery(
    keys.getUsers({
      ...params,
    }),
    fetchUsers,
    {
      keepPreviousData: true,
      enabled: isReadAllowed,
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
