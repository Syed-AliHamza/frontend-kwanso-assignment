import { useQuery } from 'react-query';
import { getUserReports } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { FEATURES, PERMISSIONS } from '../utils/constants';
import { usePermission } from './permission';

export function useListUserReports({
  userPageNumber,
  userPageSize,
  userSortOrder,
  userSortColumn,
  query,
  filters,
  selected,
}) {
  const isReadAllowed = usePermission(
    `${FEATURES.REPORTS}-${PERMISSIONS.READ}`
  );
  return useQuery(
    keys.getUserReports({
      userPageNumber,
      userPageSize,
      userSortOrder,
      userSortColumn,
      query,
      filters,
    }),
    getUserReports,
    {
      enabled: isReadAllowed && selected === 1,
      keepPreviousData: true,
    }
  );
}
