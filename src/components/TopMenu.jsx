/*global chrome*/
import React from "react";
import { NavLink } from "react-router-dom";
import Bath from "./svg/Bath";
import Feed from "./svg/Feed";
import Light from "./svg/Light";
import Medicine from "./svg/Medicine";

function TopMenu({ hasPoop, setHasPoop, lastPoop, setLastPoop }) {
  const handlePoop = () => {
    hasPoop = false;
    lastPoop = Date.parse(new Date());
    chrome.storage.local.set({ hasPoop, lastPoop }).then(() => {
      setHasPoop(false);
      setLastPoop(lastPoop);
    });
  };

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
