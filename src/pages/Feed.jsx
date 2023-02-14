/*global chrome*/
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Feed({ hunger, setHunger, setLastFeeded, happiness, setHappiness, isLightOn }) {
  const navigate = useNavigate();

  const handleMeal = () => {
    if (hunger < 5) {
      hunger++;
      setHunger(hunger);
      const justFeeded = Date.parse(new Date());
      setLastFeeded(justFeeded);

      chrome.storage.local.set({ hunger, lastFeeded: justFeeded }).then(() => {
        navigate("/eating-meal");
      });
    } else if (hunger >= 5) {
      navigate("/deny");
    }
  };

  const handleCandy = () => {
    if (hunger < 5 && happiness < 5) {
      hunger++;
      happiness < 4 ? (happiness += 2) : happiness++;
      setHunger(hunger);
      setHappiness(happiness);
      const justFeeded = Date.parse(new Date());
      setLastFeeded(justFeeded);

      chrome.storage.local
        .set({ hunger, happiness, lastFeeded: justFeeded })
        .then(() => {
          navigate("/candy");
        });
    } else if (hunger >= 5 || happiness >= 5) {
      navigate("/deny");
    }
  };

  return (
    <div className="feed-window window">
      <div className="feed-options">
        <button className={isLightOn ? "opacity-hover" : "opacity-hover light-color"} onClick={handleMeal}>
          MEAL
        </button>
        <button className={isLightOn ? "opacity-hover" : "opacity-hover light-color"} onClick={handleCandy}>
          CANDY
        </button>
      </div>
      <div className="close-window">
        <NavLink className={isLightOn ? "opacity-hover" : "opacity-hover light-color"} to="/">
          X
        </NavLink>
      </div>
    </div>
  );
}

export default Feed;
