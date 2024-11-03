import { NavLink, useNavigate } from "react-router-dom";
import "./Feed.css";
import { getFromState, saveInState } from "../../utils/state";
import { useEffect, useState } from "react";
import { Chromegotchi, MAX_HEARTS } from "../../types/Chromegotchi";

function Feed() {
  // let gotchi: Chromegotchi;
  const navigate = useNavigate()
  const [gotchiStatus, setGotchiStatus] = useState<Chromegotchi>();
  const [hunger, setHunger] = useState<number>(0);
  const [happiness, setHappiness] = useState<number>(0);

  const handleMeal = () => {
    const fetchData = async () => {
      const gotchi = await getFromState("gotchi");
      if (gotchi && gotchi.hunger >= MAX_HEARTS) {
        return;
      }
      saveInState("gotchi", {...gotchi, hunger: gotchi.hunger + 1});
      chrome.alarms.create("decreaseHunger", { periodInMinutes: gotchi.hh_timer })
      navigate('/', {state: 'eating'})
    };
    fetchData()
  };

  const handleCandy = () => {};

  return (
    <div className="feed-window window">
      <div className="feed-options">
        <button className={"opacity-hover"} onClick={handleMeal}>
          MEAL
        </button>
        <button className={"opacity-hover"} onClick={handleCandy}>
          CANDY
        </button>
      </div>
      <div className="close-window">
        <NavLink className={"opacity-hover"} to="/">
          X
        </NavLink>
      </div>
    </div>
  );
}

export default Feed;
