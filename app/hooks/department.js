import { useMutation, useQuery, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { deleteDepartment, getDepartments } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { FEATURES, PERMISSIONS } from '../utils/constants';
import { Toast, isFunction, errorToastTitle } from '../utils/helper';
import { usePermission } from './permission';

export function useDeleteDepartment({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  return useMutation(deleteDepartment, {
    onSuccess: ({ data: { data } }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${data} department(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.departments);
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

export function useListDepartment() {
  const isReadAllowed = usePermission(
    `${FEATURES.DEPARTMENT}-${PERMISSIONS.READ}`
  );

  return useQuery(keys.departments, getDepartments, {
    keepPreviousData: true,
    enabled: isReadAllowed,
  });
}
