import React from "react";
import { NavLink } from "react-router-dom";
import "./Profile.css";
import getHearts from "../../utils/getHearts";

function Profile() {
  let happinessHearts = getHearts(4); 
  let hungryHearts = getHearts(2); 
  return (

      <div className="profile-container">
        <div className="happiness-container container">
          <div className="flex-center">
            <p>Happiness</p>
            <div className="close-window">
              <NavLink className="opacity-hover" to="/">
                X
              </NavLink>
            </div>
          </div>
          {happinessHearts}
        </div>
        <div className="hungry-container container">
          <p>Hunger</p>
          {hungryHearts}
        </div>
      </div>

  );
}

export default Profile;
