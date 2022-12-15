import React from "react";
import { NavLink } from "react-router-dom";

function Feed() {
  return (
    <div className="feed-window">
      <div className="feed-options">
        <button className="opacity-hover">MEAL</button>
        <button className="opacity-hover">CANDY</button>
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
