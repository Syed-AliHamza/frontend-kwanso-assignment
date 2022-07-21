import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import { CreateTaskPage } from '../../components/pages/createLinkCategory';
import { createTask } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import {
  navigateTo,
  Toast,
  errorToastTitle,
  successToastTitle,
} from '../../utils/helper';

function CreateTask() {
  const history = useHistory();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createTask, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: successToastTitle({ name: 'Task', isUpdated: false }),
      });
      navigateTo(history, '/home');
      queryClient.invalidateQueries(keys.linkCategory);
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

  const handleSubmit = (values) => {
    mutate(values);
  };
  return (
    <>
      <Helmet>
        <title> Create Link Category</title>
      </Helmet>

      <CreateTaskPage onHandleSubmit={handleSubmit} loading={isLoading} />
    </>
  );
}

export default memo(CreateTask);
