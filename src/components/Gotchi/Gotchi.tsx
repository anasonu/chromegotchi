import { useEffect, useState } from "react";
import { getFromState, saveInState } from "../../utils/state";
import { Chromegotchi, defaultChromegotchis } from "../../types/Chromegotchi";
import "./Gotchi.css";
import { addMinutes } from "../../utils/dates";

function Gotchi() {
  const [gotchiStatus, setGotchiStatus] = useState<Chromegotchi>();
  const [timerFinished, setTimerFinished] = useState<boolean>(true);

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

  const eggCracked = async () => {
    if (gotchiStatus) {
      const updatedGotchi = defaultChromegotchis[gotchiStatus.id + 1];
      await saveInState("gotchi", updatedGotchi);
      chrome.alarms.create("decreaseHunger", { periodInMinutes: updatedGotchi.hh_timer })
    }
  };

  const shouldShowCracking =
    timerFinished &&
    gotchiStatus?.id === 0 &&
    Date.now() <= Date.parse(addMinutes(new Date(gotchiStatus?.evolves), 2));

  useEffect(() => {
    if (
      gotchiStatus &&
      Date.now() >= Date.parse(addMinutes(new Date(gotchiStatus?.evolves), 2))
    ) {
      eggCracked();
    }
  }, [gotchiStatus]);

  return (
      <div
        className={`gotchi gotchi-${gotchiStatus?.id} ${
          shouldShowCracking ? "cracking" : ""
        }`}
        onAnimationEnd={eggCracked}
      />
  );
}

export default Gotchi;
