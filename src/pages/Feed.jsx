/*global chrome*/
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Feed({ hunger, setHunger, happiness, setHappiness }) {
  const navigate = useNavigate();

  const handleMeal = () => {
    hunger++;
    setHunger(hunger)
    localStorage.setItem('hunger', JSON.stringify(hunger));
    navigate("/eating-meal");
  };

  return (
    <div className="feed-window window">
      <div className="feed-options">
        <button className="opacity-hover" onClick={handleMeal}>
          MEAL
        </button>
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
