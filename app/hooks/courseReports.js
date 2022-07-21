import { useQuery } from 'react-query';
import { getCourseReports } from '../state/queryFunctions';
import { keys } from '../state/queryKeys';
import { FEATURES, PERMISSIONS } from '../utils/constants';
import { usePermission } from './permission';

export function useListCourseReports({
  pageNumber,
  pageSize,
  sortOrder,
  sortColumn,
  query,
  filters,
  selected,
}) {
  const isReadAllowed = usePermission(
    `${FEATURES.REPORTS}-${PERMISSIONS.READ}`
  );
  return useQuery(
    keys.getCourseReports({
      pageNumber,
      pageSize,
      sortOrder,
      sortColumn,
      query,
      filters,
    }),
    getCourseReports,
    {
      keepPreviousData: true,
      enabled: isReadAllowed && selected === 0,
    }
  );
}
