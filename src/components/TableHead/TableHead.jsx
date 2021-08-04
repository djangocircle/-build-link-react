import React from "react";
import "carbon-components/css/carbon-components.min.css";
import {
  TableHead as CarbonTableHead,
  TableRow,
  TableHeader,
  TableSelectAll,
} from "carbon-components-react";

const TableHead = ({ headers, getSelectionProps, getHeaderProps }) => {
  return (
    <CarbonTableHead>
      <TableRow>
        <TableSelectAll {...getSelectionProps()} />
        {headers?.map((header) => (
          <TableHeader {...getHeaderProps({ header })} key={header.header}>
            {header.header}
          </TableHeader>
        ))}
         <TableHeader></TableHeader>
      </TableRow>
    </CarbonTableHead>
  );
};
export default TableHead;
