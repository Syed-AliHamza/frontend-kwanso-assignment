import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../theme/colors';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '8px',
      height: '6px',
      borderRadius: '13px',
      backgroundClip: 'padding-box',
      border: `10px solid ${colors.ashGrey}`,
    },
    '*::-webkit-scrollbar-thumb': {
      boxShadow: `inset 0 0 0 10px ${theme.palette.secondary.main}`,
      width: '10px',
      borderRadius: '13px',
      backgroundClip: 'padding-box',
      border: `10px solid ${theme.palette.secondary.main}`,
    },
    '.toastTitleColor': {
      color: '#fff',
    },
  },
}));

export { useStyles };
