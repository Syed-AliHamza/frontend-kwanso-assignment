import React from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox } from '@material-ui/core';
import { useStyles } from './style';

const MuiCheckbox = ({
  disabled,
  onHandleChange,
  checked,
  indeterminate,
  color,
  ...props
}) => {
  const classes = useStyles({ color });
  return (
    <Box className={classes.root}>
      <Checkbox
        disabled={disabled}
        onChange={onHandleChange}
        checked={checked}
        indeterminate={indeterminate}
        {...props}
      />
    </Box>
  );
};
MuiCheckbox.propTypes = {
  onHandleChange: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.string,
};

export default MuiCheckbox;
