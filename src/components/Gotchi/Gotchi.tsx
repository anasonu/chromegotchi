import { useEffect, useState } from "react";
import { getFromState, saveInState } from "../../utils/state";
import { Chromegotchi, defaultChromegotchis } from "../../types/Chromegotchi";
import "./Gotchi.css";
import { addMinutes } from "../../utils/dates";
import { useLocation } from "react-router-dom";

function Gotchi() {
  const location = useLocation()
  const [gotchiStatus, setGotchiStatus] = useState<Chromegotchi>();
  const [timerFinished, setTimerFinished] = useState<boolean>(true);
  const [isEating, setIsEating] = useState<boolean>(false)

  const initializeData = async () => {
    const gotchiData = await getFromState("gotchi");
    const timerData = await getFromState("timerFinished");
    setGotchiStatus(gotchiData);
    setTimerFinished(timerData);
  };

  useEffect(() => {
    initializeData();

    const handleStorageChange = (changes: any, areaName: string) => {
      if (areaName === "local") {
        if (changes.gotchi) {
          setGotchiStatus(changes.gotchi.newValue);
        }
        if (changes.timerFinished) {
          setTimerFinished(changes.timerFinished.newValue);
        }
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (location.state === "eating") {
      setIsEating(true);
    }
  }, [location.state]);

  const handleAnimationEnd = async () => {
    const gotchi = await getFromState('gotchi')

    if(gotchi.id == 0) {
      const updatedGotchi = defaultChromegotchis[1];
      await saveInState("gotchi", updatedGotchi);
      chrome.alarms.create("decreaseHunger", {
        periodInMinutes: updatedGotchi.hh_timer,
      });
    }

    if(location.state === 'eating') {
      setIsEating(false)
      chrome.alarms.create("decreaseHunger", {
        periodInMinutes: gotchi.hh_timer,
      });
    }
  };

  const shouldShowCracking =
    timerFinished &&
    gotchiStatus?.id === 0 &&
    Date.now() <= Date.parse(addMinutes(new Date(gotchiStatus?.evolves), 2));

  useEffect(() => {
    if (
      gotchiStatus &&
      gotchiStatus.id <= 0 &&
      Date.now() >= Date.parse(addMinutes(new Date(gotchiStatus?.evolves), 2))
    ) {
      handleAnimationEnd();
    }
  }, [gotchiStatus]);

  return (
    <div
      className={`gotchi gotchi-${gotchiStatus?.id} ${
        shouldShowCracking ? "cracking" : ""
      } ${isEating && "eating"}`}
      onAnimationEnd={handleAnimationEnd}
    />
  );
}

export default Gotchi;
