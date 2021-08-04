import React from "react";
import {
  TableRow,
  TableBody as CarbonTableBody,
  TableCell,
  TableSelectRow,
} from "carbon-components-react";
import { Link } from "react-router-dom";

import { CheckmarkFilled32, CloseFilled32 } from "@carbon/icons-react";

function TableBody({ rows, getSelectionProps }) {
  return (
    <CarbonTableBody>
      {rows?.map((row) => (
        <TableRow key={row.id}>
          <TableSelectRow {...getSelectionProps({ row })} />
          {row.cells.map((cell) => (
            <>
              {cell.info.header === "is_active" ? (
                <TableCell key={cell.id}>
                  {cell.value ? (
                    <CheckmarkFilled32 style={{ fill: "#50c878" }} />
                  ) : (
                    <CloseFilled32 style={{ fill: "rgb(128,70,27)" }} />
                  )}
                </TableCell>
              ) : (
                <TableCell key={cell.id}>{cell.value}</TableCell>
              )}
            </>
          ))}
          <TableCell>
            <Link
              to={`/edit/${row.id}`}
              key={row.id}
              className="bx--btn bx--btn--primary"
            >
              Edit
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </CarbonTableBody>
  );
}

export default TableBody;
