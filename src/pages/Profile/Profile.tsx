import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Profile.css";
import getHearts from "../../utils/getHearts";
import { getFromState } from "../../utils/state";

function Profile() {
  const [happinessHearts, sethappinessHearts] = useState<JSX.Element[]>([]);
  const [hungryHearts, setHungryHearts] = useState<JSX.Element[]>([]);

  const initializeData = async () => {
    const gotchi = await getFromState("gotchi");
    sethappinessHearts(getHearts(gotchi?.happiness));
    setHungryHearts(getHearts(gotchi?.hunger));
  };

  useEffect(() => {
    initializeData();
  }, []);

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
        <div className="heart-container">{happinessHearts}</div>
      </div>
      <div className="hungry-container container">
        <p>Hunger</p>
        <div className="heart-container">{hungryHearts}</div>
      </div>
    </div>
  );
}

export default Profile;