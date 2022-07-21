import { useMutation, useQuery, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import {
  deleteTopic,
  updateTopic,
  createTopic,
  getTopicProgressById,
} from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { FEATURES, PERMISSIONS } from '../utils/constants';
import {
  Toast,
  isFunction,
  errorToastTitle,
  successToastTitle,
} from '../utils/helper';
import { usePermission } from './permission';

export function useCreateTopic() {
  const queryClient = useQueryClient();
  return useMutation(createTopic, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: successToastTitle({ name: 'Topic', isUpdated: false }),
      });
      queryClient.invalidateQueries(keys.courses({}));
      queryClient.invalidateQueries(keys.getCourse({}));
      queryClient.invalidateQueries(keys.getTopic({}));
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

export function useDeleteTopic({ callbackFn } = {}) {
  const queryClient = useQueryClient();

  return useMutation(deleteTopic, {
    onSuccess: ({
      data: {
        data: { counts },
      },
    }) => {
      if (isFunction(callbackFn)) callbackFn();
      queryClient.invalidateQueries(keys.courses({}));
      queryClient.invalidateQueries(keys.getCourse({}));
      queryClient.invalidateQueries(keys.getTopic({}));
      queryClient.invalidateQueries(keys.getProgress({}));
      Swal.fire('Deleted!', `${counts} topic(s) deleted.`, 'success');
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

export function useUpdateTopic() {
  const queryClient = useQueryClient();

  return useMutation(updateTopic, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: successToastTitle({ name: 'Topic ', isUpdated: true }),
      });
      queryClient.invalidateQueries(keys.courses({}));
      queryClient.invalidateQueries(keys.getCourse({}));
      queryClient.invalidateQueries(keys.getTopic({}));
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

export function useGetTopicProgressById({ enabled, topicId }) {
  const isReadAllowed = usePermission(`${FEATURES.TOPIC}-${PERMISSIONS.READ}`);
  return useQuery(
    keys.getTopicProgress({
      id: topicId,
    }),
    getTopicProgressById,
    {
      keepPreviousData: true,
      enabled: !!isReadAllowed && !!enabled,
    }
  );
}
