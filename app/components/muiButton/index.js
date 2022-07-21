import {
  Box,
  Button,
  CircularProgress,
  useMediaQuery,
} from '@material-ui/core';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/styles';
import Show from '../show';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: 'primary',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8,
    marginLeft: -8,
  },
}));

function MuiButton({ disabled, loading, size, children, ...props }) {
  const classes = useStyles();
  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box>
      <Box className={classes.wrapper}>
        <Button
          disabled={disabled}
          size={isExtraSmall ? 'small' : size}
          {...props}
        >
          {children}
        </Button>
        <Show IF={disabled && loading}>
          <CircularProgress size={18} className={classes.buttonProgress} />
        </Show>
      </Box>
    </Box>
  );
}
MuiButton.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};
MuiButton.defaultProps = {
  loading: true,
  disabled: false,
};
export default memo(MuiButton);

// This component is used to disable buttons on submit and also it'll show circular progress within the button on submit until API response
