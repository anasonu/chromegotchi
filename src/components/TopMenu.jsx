import React from "react";
import { NavLink } from "react-router-dom";
import Bath from "./svg/Bath";
import Feed from "./svg/Feed";
import Light from "./svg/Light";
import Medicine from "./svg/Medicine";

function TopMenu({ setHasPoop }) {
  const handlePoop = () => {
    setHasPoop(false);
  }

  return (
    <nav className="menu top-menu">
      <NavLink to="/feed">
        <Feed />
      </NavLink>
      <button onClick={handlePoop}>
        <Bath />
      </button>
      <button>
        <Light />
      </button>
      <button>
        <Medicine />
      </button>

      
    </nav>
  );
}

export default TopMenu;
