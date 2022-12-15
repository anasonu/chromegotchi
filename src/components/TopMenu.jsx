import React from "react";
import { NavLink } from "react-router-dom";
import Bath from "./svg/Bath";
import Feed from "./svg/Feed";
import Light from "./svg/Light";
import Medicine from "./svg/Medicine";

function TopMenu() {
  return (
    <nav className="menu top-menu">
      <NavLink to="/feed">
        <Feed />
      </NavLink>
      <button>
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
