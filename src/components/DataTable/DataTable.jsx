import React from "react";
import "carbon-components/css/carbon-components.min.css";
import {
  DataTable as CarbonDataTable,
  TableContainer,
  Table,
} from "carbon-components-react";

import TableToolbar from "../../components/TableToolbar/TableToolbar";
import TableHead from "../../components/TableHead/TableHead";
import TableBody from "../../components/TableBody/TableBody";
import TableHeader from "../../components/TableHeader/TableHeader";

const DataTable = ({ rowData, headerData,onDeleteBatchActionClick , onActivateBatchActionClick, onDeactivateBatchActionClick}) => {
  const onInputChangeHandler = (textToFilter) => {
    rowData = rowData.filter((row) => row.name.contains(textToFilter));
  };
  if (!rowData) {
    return "";
  }
  return (
    <CarbonDataTable
      rows={rowData}
      headers={headerData}
      isSortable
      onInputChange={onInputChangeHandler}
    >
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getSelectionProps,
        getToolbarProps,
        getBatchActionProps,
        onInputChange,
        selectedRows,
        getTableProps,
        getTableContainerProps,
      }) => (
        <TableContainer
        {...getTableContainerProps()}>
          <TableHeader />
          <TableToolbar
            getToolbarProps={getToolbarProps}
            getBatchActionProps={getBatchActionProps}
            onInputChange={onInputChange}
            onDeleteBatchActionClick={onDeleteBatchActionClick}
            onActivateBatchActionClick={onActivateBatchActionClick}
            onDeactivateBatchActionClick={onDeactivateBatchActionClick}
            selectedRows={selectedRows}
          />
          <Table {...getTableProps()}>
            <TableHead
              headers={headers}
              getSelectionProps={getSelectionProps}
              getHeaderProps={getHeaderProps}
            />
            <TableBody rows={rows} getSelectionProps={getSelectionProps} />
          </Table>
        </TableContainer>
      )}
    </CarbonDataTable>
  );
};

export default DataTable;
