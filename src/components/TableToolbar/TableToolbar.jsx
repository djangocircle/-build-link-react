import React from "react";
import {
  TableToolbar as CarbonTableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarContent,
  TableToolbarSearch,
} from "carbon-components-react";
import {
  TrashCan32,
  PauseOutlineFilled32,
  CheckmarkFilled32,
} from "@carbon/icons-react";

function TableToolbar({
  getToolbarProps,
  getBatchActionProps,
  onInputChange,
  onDeleteBatchActionClick,
  selectedRows,
  onActivateBatchActionClick,
  onDeactivateBatchActionClick,
}) {
  return (
    <CarbonTableToolbar {...getToolbarProps()}>
      <TableBatchActions {...getBatchActionProps()}>
        <TableBatchAction
          tabIndex={1}
          renderIcon={TrashCan32}
          onClick={() => {
            onDeleteBatchActionClick(selectedRows);
          }}
        >
          Delete
        </TableBatchAction>
        <TableBatchAction
          tabIndex={2}
          renderIcon={CheckmarkFilled32}
          onClick={() => {
            onActivateBatchActionClick(selectedRows);
          }}
        >
          Activate
        </TableBatchAction>
        <TableBatchAction
          tabIndex={3}
          renderIcon={PauseOutlineFilled32}
          onClick={() => {
            onDeactivateBatchActionClick(selectedRows);
          }}
        >
          Deactivate
        </TableBatchAction>
      </TableBatchActions>
      <TableToolbarContent>
        <TableToolbarSearch
          persistent="true"
          tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
          onChange={onInputChange}
        />
      </TableToolbarContent>
    </CarbonTableToolbar>
  );
}

export default TableToolbar;
