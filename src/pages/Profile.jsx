import React from "react";
import { NavLink } from "react-router-dom";

function Profile() {
  return (
    <div className="profile-window window">
      <div className="profile-container">
        <div className="happiness-container container">
          <p>Happiness</p>
          <p>♥♥♥♥♥</p>
        </div>
        <div className="hungy-container container">
          <p>Hungry</p>
          <p>♥♥♥♥♥</p>
        </div>
      </div>
      <div className="close-window">
        <NavLink className="opacity-hover" to="/">
          X
        </NavLink>
      </div>
    </div>
  );
}

export default Profile;
