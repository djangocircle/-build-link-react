import React from "react";
import { Button } from "carbon-components-react";
import { Link } from "react-router-dom";

function TableHeader() {
  return (
    <div className="flex">
      <h2>Users</h2>
      {/* <Button
        style={{ marginLeft: "auto" }}
        isExpressive
        renderIcon={Download16}
        hasIconOnly
        iconDescription="Icon description"
      /> */}
      <Link to="/create" style={{ marginLeft: "auto" }}>
      <Button isExpressive size="default">
        Add new
      </Button>
      </Link>
    </div>
  );
}

export default TableHeader;
