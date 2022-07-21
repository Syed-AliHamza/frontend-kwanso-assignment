import { useMutation, useQuery, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { deleteLocation, getLocations } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { FEATURES, PERMISSIONS } from '../utils/constants';
import { Toast, isFunction, errorToastTitle } from '../utils/helper';
import { usePermission } from './permission';

export function useDeleteLocation({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  return useMutation(deleteLocation, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${count} location(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.locations);
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

export function useListLocations() {
  const isReadAllowed = usePermission(
    `${FEATURES.LOCATION}-${PERMISSIONS.READ}`
  );
  return useQuery(keys.locations, getLocations, {
    keepPreviousData: true,
    enabled: isReadAllowed,
  });
}
