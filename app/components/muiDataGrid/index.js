import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import Alert from '@material-ui/lab/Alert';
import { capitalize } from 'lodash';
import { TABLE_PAGE_SIZE } from '../../utils/constants';
import { useStyles } from './styles';
import { useAuthContext } from '../../context/authContext';
import { isArrayEqual } from '../../utils/functions';
import Show from '../show';

function CustomNoRowsOverlay() {
  const classes = useStyles();
  return (
    <GridOverlay className={classes.gridOverlay}>
      <Alert severity="error" className={classes.label}>
        No data found
      </Alert>
    </GridOverlay>
  );
}
export function MuiDataGrid({
  rows,
  columns,
  selected,
  setSelected,
  onChangeSort,
  sortColumn,
  sortOrder,
  count,
  isServerSide,
  tableRowsPerPage,
  handleServerPageSize,
  handleServerPageNumber,
  matchUserIdWithIDS,
  disableSelectionOnClick,
  page,
  setPage,
  isWriteAllowed,
  checkboxSelection,
  headerColor,
  isTableBorderZero,
  density,
  name,
  isLoading,
  ...props
}) {
  const {
    user: {
      data: { id: currentUserID },
    },
  } = useAuthContext();
  const classes = useStyles({ headerColor, isTableBorderZero });
  const initialSortValue =
    (sortColumn && [{ field: sortColumn || '', sort: sortOrder || 'asc' }]) ||
    [];
  const [sortingModel, setSortingModel] = useState(initialSortValue);

  const [rowsPerPage, setRowsPerPage] = useState(tableRowsPerPage);

  function currentlySelected({ selectionModel }) {
    if (!isArrayEqual(selected, selectionModel)) {
      setSelected(selectionModel);
    }
  }
  const handleSortModelChange = ({ sortModel }) => {
    if (sortModel !== sortingModel) {
      if (isServerSide) {
        setSortingModel(sortModel);
        onChangeSort(sortModel[0].sort, sortModel[0].field);
      }
      setSortingModel(sortModel);
    }
  };
  const handleChangeRowsPerPage = ({ pageSize }) => {
    setRowsPerPage(pageSize);
    setPage(0);
    const currentPage = 1;
    if (isServerSide) {
      handleServerPageNumber({
        currentPage,
      });
      const rowPerPage = pageSize;
      handleServerPageSize({ rowPerPage });
    }
  };
  const handleChangePage = ({ page: newPage }) => {
    setPage(newPage);
    if (isServerSide) {
      const currentPage = newPage + 1;
      handleServerPageNumber({
        currentPage,
      });
    }
  };
  const addScorllClass = (val, selector) => {
    for (let i = 0; i < val; i += 1) {
      const loopdata = document.getElementsByClassName(selector)[i];
      const getActoin = loopdata.getAttribute('data-field');
      if (getActoin === 'actions') {
        loopdata.classList.add('enableScrollAction');
      }
    }
  };

  const responisveScroll = (xScroll) => {
    const columnsCount = document.getElementsByClassName('MuiDataGrid-cell')
      .length;
    const columnName = 'MuiDataGrid-cell';
    addScorllClass(columnsCount, columnName);
    const columnsCountHeader = document.getElementsByClassName(
      'MuiDataGrid-columnHeader'
    ).length;
    const columnNameHeader = 'MuiDataGrid-columnHeader';
    addScorllClass(columnsCountHeader, columnNameHeader);
    const tableIndex = xScroll.currentTarget.index;
    const scroll = document.getElementsByClassName('MuiDataGrid-window')[
      tableIndex
    ].scrollLeft;
    const scrollAbleTable = document
      .getElementsByClassName('MuiDataGrid-window')
      [tableIndex].getElementsByClassName('enableScrollAction');
    for (let i = 0; i < scrollAbleTable.length; i += 1) {
      scrollAbleTable[i].style.right = `-${scroll}px`;
    }
    const scrollAbleTableHeader = document
      .getElementsByClassName('scroll')
      [tableIndex].getElementsByClassName('enableScrollAction');
    for (let i = 0; i < scrollAbleTableHeader.length; i += 1) {
      scrollAbleTableHeader[i].style.right = `-${scroll}px`;
    }
  };

  const enableScrollOnAction = () => {
    setTimeout(() => {
      const tableLength = document.getElementsByClassName('MuiDataGrid-window')
        .length;
      for (let i = 0; i < tableLength; i += 1) {
        const tableObj = document.getElementsByClassName('MuiDataGrid-window')[
          i
        ];
        const tableCotainer = document.getElementsByClassName(
          'MuiDataGrid-window'
        )[i].clientWidth;
        const tableChild =
          document.getElementsByClassName('MuiDataGrid-dataContainer')[i]
            .clientWidth - 30;
        const scorllObj = tableCotainer <= tableChild;

        if (scorllObj) {
          tableObj.parentElement.classList.add('enableScroll');
          tableObj?.addEventListener('scroll', responisveScroll);
          tableObj.index = i;
        }
      }
    }, 1);
  };
  useEffect(() => {
    enableScrollOnAction();
  }, []);
  return (
    <Box className={classes.root}>
      <Show IF={selected?.length > 0}>
        <Box my={4}>
          <Alert severity="info" className={classes.alertPadding}>
            <strong>{selected.length}</strong> {capitalize(name)}(s) Selected
          </Alert>
        </Box>
      </Show>
      <DataGrid
        rowHeight={rows?.length ? 75 : 35}
        autoHeight
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        onSelectionModelChange={currentlySelected}
        selectionModel={[...selected]}
        columns={columns}
        rows={rows}
        disableSelectionOnClick={disableSelectionOnClick}
        loading={isLoading}
        {...props}
        checkboxSelection={isWriteAllowed && checkboxSelection}
        disableColumnMenu
        isRowSelectable={(params) =>
          !(
            (matchUserIdWithIDS && params?.row?.id === currentUserID) ||
            (matchUserIdWithIDS && params?.row?.isAdmin)
          )
        }
        sortModel={sortingModel}
        sortingMode={isServerSide ? 'server' : 'client'}
        onSortModelChange={handleSortModelChange}
        sortingOrder={['asc', 'desc']}
        pageSize={rowsPerPage}
        paginationMode={isServerSide ? 'server' : 'client'}
        onPageSizeChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
        page={page}
        rowCount={count}
        rowsPerPageOptions={[5, 10, 20]}
        density={density}
        hideFooterSelectedRowCount
        pagination
        onRowsScrollEnd
        getRowClassName={(params) => {
          if (
            (matchUserIdWithIDS && params?.row?.id === currentUserID) ||
            (matchUserIdWithIDS && params?.row?.isAdmin)
          ) {
            return `row-disabled`;
          }
          return '';
        }}
      />
    </Box>
  );
}

MuiDataGrid.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  tableRowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  onChangeSort: PropTypes.func,
  sortOrder: PropTypes.string,
  sortColumn: PropTypes.string.isRequired,
  isServerSide: PropTypes.bool,
  disableSelectionOnClick: PropTypes.bool,
  matchUserIdWithIDS: PropTypes.bool,
  count: PropTypes.number.isRequired,
  page: PropTypes.number,
  setPage: PropTypes.func,
  checkboxSelection: PropTypes.bool,
  headerColor: PropTypes.shape({
    text: PropTypes.string,
    background: PropTypes.string,
  }),
  isTableBorderZero: PropTypes.bool,
  density: PropTypes.string,
};
MuiDataGrid.defaultProps = {
  tableRowsPerPage: TABLE_PAGE_SIZE,
  selected: [],
  matchUserIdWithIDS: false,
  isServerSide: false,
  disableSelectionOnClick: true,
  checkboxSelection: true,
  page: 0,
  density: 'standard',
};

export default MuiDataGrid;
