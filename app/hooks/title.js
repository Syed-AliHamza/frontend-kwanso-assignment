import { useMutation, useQuery, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { useHistory, useParams } from 'react-router-dom';
import { FEATURES, PERMISSIONS } from '../utils/constants';
import { usePermission } from './permission';
import {
  Toast,
  errorToastTitle,
  successToastTitle,
  isFunction,
  navigateTo,
} from '../utils/helper';
import {
  createTitle,
  getTitles,
  deleteTitle,
  updateTitle,
  getTitletById,
} from '../state/queryFunctions';
import { keys } from '../state/queryKeys';

export function useDeleteTitle({ callbackFn } = {}) {
  const queryClient = useQueryClient();
  return useMutation(deleteTitle, {
    onSuccess: ({ data: { data } }) => {
      if (isFunction(callbackFn)) callbackFn();
      Swal.fire('Deleted!', `${data.counts} titles(s) deleted.`, 'success');
      queryClient.invalidateQueries(keys.titles);
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

export function useGetTitleById({ id }) {
  return useQuery(keys.getTitle(id), getTitletById, {
    enabled: !!id,
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

export function useUpdateTitle() {
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  return useMutation(id ? updateTitle : createTitle, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: successToastTitle({ name: 'Title', isUpdated: id }),
      });
      queryClient.invalidateQueries(keys.getTitle);
      navigateTo(history, '/titles');
    },
    onError: ({
      response: {
        data: { message },
      },
    }) =>
      Toast({
        icon: 'error',
        title: errorToastTitle({ message }),
      }),
  });
}

export function useCreateTitle() {
  const queryClient = useQueryClient();
  return useMutation(createTitle, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: successToastTitle({
          name: 'Title',
          isUpdated: false,
        }),
      });
      queryClient.invalidateQueries(keys.titles);
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

export function useListTitles() {
  const isReadAllowed = usePermission(`${FEATURES.TITLE}-${PERMISSIONS.READ}`);
  return useQuery(keys.titles, getTitles, {
    keepPreviousData: true,
    enabled: isReadAllowed,
  });
}
