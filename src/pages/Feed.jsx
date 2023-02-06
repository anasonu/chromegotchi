/*global chrome*/
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Feed({ hunger, setHunger, setLastFeeded }) {
  const navigate = useNavigate();

  const handleMeal = () => {
    if (hunger < 5) {
      hunger++;
      setHunger(hunger);
      const justFeeded = Date.parse(new Date());
      setLastFeeded(justFeeded);

      chrome.storage.local.set({ hunger, lastFeeded: justFeeded }).then(() => {
        navigate("/eating-meal");
      })

    } else if (hunger >= 5) {
      navigate("/deny");
    }
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
