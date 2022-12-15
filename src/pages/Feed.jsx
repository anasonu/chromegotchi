import React from "react";
import { NavLink } from "react-router-dom";

function Feed() {
  return (
    <div className="feed-window window">
      <div className="feed-options">
        <NavLink className="opacity-hover" to="/eating-meal">MEAL</NavLink>
        <NavLink className="opacity-hover" to="/candy">CANDY</NavLink>
      </div>
      <div className="close-window">
        <NavLink className="opacity-hover" to="/">
          X
        </NavLink>
      </div>
    </div>
  );
}

export default Feed;
