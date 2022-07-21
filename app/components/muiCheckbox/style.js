import { makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';
import { colors } from '../../theme/colors';

export const useStyles = makeStyles(() => ({
  root: {
    '& .MuiCheckbox-root': {
      color: ({ color }) => get(colors, color),
    },
  },
}));
