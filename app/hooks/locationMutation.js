import { useMutation, useQueryClient } from 'react-query';
import { Toast, errorToastTitle, successToastTitle } from '../utils/helper';
import { createLocation } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';

export function useCreateLocation() {
  const queryClient = useQueryClient();
  return useMutation(createLocation, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: successToastTitle({
          name: 'Location',
          isUpdated: false,
        }),
      });
      queryClient.invalidateQueries(keys.location);
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
