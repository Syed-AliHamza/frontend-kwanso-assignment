import { Box } from '@material-ui/core';
import React, { memo } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Formik } from 'formik';
import { string, object } from 'yup';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { Input, Button } from '../../index';
import { H5 } from '../../typography';

const taskSchema = object().shape({
  name: string().required('*Name Required'),
});

export function CreateTaskPage({ onHandleSubmit, initialValues, loading }) {
  const history = useHistory();
  return (
    <Box m={15} my={15}>
      <Box mb={5}>
        <H5> Create Task</H5>
      </Box>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={taskSchema}
        onSubmit={(values) => {
          onHandleSubmit(values);
        }}
      >
        {() => (
          <Form>
            <Box>
              <Box display="flex" flexDirection="column" pb={8}>
                <Box width={[1, 1, 1 / 2, 1 / 3]}>
                  <Input
                    variant="outlined"
                    OutlinedInputPlaceholder="Name*"
                    name="name"
                    appendIcon
                    Icon={FolderOpenOutlinedIcon}
                  />
                </Box>
              </Box>
              <Box display="flex">
                <Box>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={loading}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                </Box>
                <Box ml={2}>
                  <Button
                    startIcon={<ClearIcon />}
                    onClick={() => history.goBack()}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

CreateTaskPage.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};
CreateTaskPage.defaultProps = {
  initialValues: {
    name: '',
  },
};

export default memo(CreateTaskPage);
