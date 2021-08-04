import React, { useState, useEffect } from "react";
import {
  Header,
  HeaderName,
} from "carbon-components-react/lib/components/UIShell";
import { Link } from "react-router-dom";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }
  });
  return (
    <Header aria-label="Build Link">
      <Link to="/">
        <HeaderName prefix="">Build Link</HeaderName>
      </Link>
      {isAuthenticated ? (
        <Link to="/logout" style={{ marginLeft: "auto" }}>
          <HeaderName prefix="">Logout</HeaderName>
        </Link>
      ) : (
        <Link to="/login" style={{ marginLeft: "auto" }}>
          <HeaderName prefix="">Login</HeaderName>
        </Link>
      )}
    </Header>
  );
}

export default Navbar;
