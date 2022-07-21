import { useQuery } from 'react-query';
import { Toast, errorToastTitle } from '../utils/helper';
import { getCourseStatsById } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { FEATURES, PERMISSIONS } from '../utils/constants';
import { usePermission } from './permission';

export function useGetCourseStatsById({ id }) {
  const isReadAllowed = usePermission(
    `${FEATURES.DASHBOARD}-${PERMISSIONS.READ}`
  );
  return useQuery(keys.getCourseStats(id), getCourseStatsById, {
    enabled: isReadAllowed,
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
