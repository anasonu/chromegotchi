import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import getHearts from "../utils/getHearts";


function Profile({happiness, hunger}) {
  // const [hunger, setHunger] = useState([]);
  // const [happiness, setHappiness] = useState([]);
  
  // const currentHungry = 0;
  // const currentHappiness = 2;

  // let happinessHearts = getHearts(currentHappiness); 
  // let hungryHearts = getHearts(currentHungry); 

  let happinessHearts = getHearts(happiness); 
  let hungryHearts = getHearts(hunger); 

  return (
    <div className="profile-window window">
      <div className="profile-container">
        <div className="happiness-container container">
          <p>Happiness</p>
          { happinessHearts }
        </div>
        <div className="hungy-container container">
          <p>Hungry</p>
          { hungryHearts }
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
