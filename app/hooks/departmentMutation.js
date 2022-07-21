import { useMutation, useQueryClient } from 'react-query';
import { Toast, errorToastTitle, successToastTitle } from '../utils/helper';
import { createDepartment } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';

export function useCreateDepartment() {
  const queryClient = useQueryClient();
  return useMutation(createDepartment, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: successToastTitle({
          name: 'Department',
          isUpdated: false,
        }),
      });
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
