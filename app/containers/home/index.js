import { Box } from '@material-ui/core';
import React, { memo, useState } from 'react';

import { Helmet } from 'react-helmet';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Button, DataGrid } from '../../components';
import { keys } from '../../state/queryKeys';
import { getTasks } from '../../state/queryFunctions';
import Show from '../../components/show';
import { Loading } from '../../components/loading';
import { Modal, navigateTo } from '../../utils/helper';
import { useDeleteTask } from '../../hooks/user';

function HomeContainer() {
  const [selected, setSelected] = useState([]);
  const [sortOrder] = useState('asc');
  const [sortColumn] = useState('name');
  const [page, setPage] = useState(0);
  const { data, isLoading } = useQuery(keys.tasks, getTasks, {
    keepPreviousData: true,
  });
  const mutation = useDeleteTask({ callbackFn: () => setSelected([]) });
  const history = useHistory();
  const onHandleDelete = () => {
    if (!selected.length) {
      return;
    }
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(selected);
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <Show IF={isLoading}>
        <Loading />
      </Show>
      <Show IF={!isLoading}>
        <Box m={20} my={20}>
          <Box display="flex">
            <Button
              color="secondary"
              variant="contained"
              fullWidth={false}
              startIcon={<AddIcon />}
              onClick={() => navigateTo(history, '/createTask')}
              loading={false}
            >
              Create Task
            </Button>
            <Button
              color="secondary"
              variant="contained"
              fullWidth={false}
              startIcon={<DeleteIcon />}
              onClick={onHandleDelete}
              loading={false}
              disabled={selected.length <= 0}
            >
              Delete
            </Button>
          </Box>
          <DataGrid
            name="task"
            rows={data?.data?.data?.rows || []}
            columns={[
              {
                field: 'name',
                type: 'string',
                headerName: 'Name',
                description: 'Name',
                sortable: true,
                flex: 1,
              },
            ]}
            checkboxSelection
            isWriteAllowed
            setSelected={setSelected}
            selected={selected}
            page={page}
            setPage={setPage}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
          />
        </Box>
      </Show>
    </>
  );
}

export default memo(HomeContainer);
